var express = require('express');
var router = express.Router();

const conn = require('../lib/conexion');
const DB = 'MyTimeDB';
const COLLECTION = 'proyects';

/* GET Lista proyectos */
router.get('/', function(req, res, next) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.find({})
			.toArray((error, data) => {
				res.send(data);
			});
	});
});

/* GET Proyectos por Usuario */
router.get('/:user', function(req, res, next) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.find({
				AdminProyect: req.params.user
			})
			.toArray((error, data) => {
				res.send(data);
			});
	});
});

/* GET Proyecto por Usuario y por nombre de proyecto*/
router.get('/:user/:proyectName', function(req, res, next) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.find({
				AdminProyect: req.params.user,
				ProyectName: req.params.proyectName
			})
			.toArray((error, data) => {
				res.send(data);
			});
	});
});

/* POST un nuevo proyecto */
router.post('/', function(req, res, next) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.insertOne(req.body, (err, data) => {
				res.send(data);
			});
	});
});

/* DELETE Proyecto por AdminProyect y por ProyectName */
router.delete('/:AdminProyect/:proyectName', function(req, res, next) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.deleteOne(
				{ AdminProyect: req.params.AdminProyect, ProyectName: req.params.proyectName },
				(error, data) => {
					res.send(data);
				}
			);
	});
});

/* PUT Modifica el proyecto añadiendo un nuevo TaskBoard dado el AdminProyect y del ProyectName */
router.put('/:AdminProyect/:proyectName/addTaskBoard', function(
	req,
	res,
	next
) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.find({
				AdminProyect: req.params.AdminProyect,
				ProyectName: req.params.proyectName
			})
			.toArray((error, data) => {
				if (!data) res.send([]);
				if (error) throw error;
				let newTaskBar = req.body;
                let proyect = data[0];
				newTaskBar.index = proyect.TaskBoards.length;
				proyect.TaskBoards.push(newTaskBar);
				let newTaskBoards = {
					$set: {
						TaskBoards: proyect.TaskBoards
					}
				};
				conn.then(client => {
					client
						.db(DB)
						.collection(COLLECTION)
						.updateOne(
							{
								AdminProyect: proyect.AdminProyect,
								ProyectName: proyect.ProyectName
							},
							newTaskBoards,
							(err, data) => {
								if (err) throw err;
								res.send(data);
							}
						);
				});
			});
	});
});

/* PUT Modifica el proyecto añadiendo un nuevo Asociado dado el AdminProyect y del ProyectName */
router.put('/:AdminProyect/:proyectName/addAssociate/:associate', function(req, res, next) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.find({
				AdminProyect: req.params.AdminProyect,
				ProyectName: req.params.proyectName
			})
			.toArray((error, data) => {
				if (!data) res.send([]);
				if (error) throw error;
				console.log('data', data)
				let associates = data[0].Associates;
				associates.push(req.params.associate);
				let newAssociates = {
					$set: {
						Associates: associates
					}
				};
				conn.then(client => {
					client
						.db(DB)
						.collection(COLLECTION)
						.updateOne(
							{
								AdminProyect: req.params.AdminProyect,
								ProyectName: req.params.proyectName
							},
							newAssociates,
							(err, data) => {
								if (err) throw err;
								res.send(data);
							}
						);
				});
			});
	});
});

module.exports = router;
