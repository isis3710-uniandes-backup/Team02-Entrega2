var express = require('express');
var router = express.Router();

const conn = require('../lib/conexion');
const DB = 'MyTimeDB';
const COLLECTION = 'users';

// ! Do not delete
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET Lista usuarios */
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

/* PUT de un usuario dado el username */
router.put("/:userName",function(req, res, next) {
	conn.then(client => {
		let mod = {
			$set: {
				userName: req.body.userName,
				mail: req.body.mail,
				password: req.body.password
			}
    };
		client
			.db(DB)
			.collection(COLLECTION)
			.updateOne({userName: req.params.userName},mod, (err,data) =>{
        if(err) throw err;
        res.send(data);
      });
	});
});

/* POST de un usuario */
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

/* GET user por userName */
router.get('/:user', function(req, res, next) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.find({
				userName: req.params.user
			})
			.toArray((error, data) => {
				res.send(data);
			});
	});
});

/* GET user por userName y por password */
router.get('/:user/:password', function(req, res, next) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.find({
				userName: req.params.user,
				password: req.params.password
			})
			.toArray((error, data) => {
				res.send(data);
			});
	});
});

/* DELETE user por userName */
router.delete('/:user', function(req, res, next) {
	conn.then(client => {
		client
			.db(DB)
			.collection(COLLECTION)
			.deleteOne({userName: req.params.user}, (error, data) => {
				res.send(data);
			})
	});
});

module.exports = router;
