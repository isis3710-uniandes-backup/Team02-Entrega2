var express = require('express');
var router = express.Router();

const conn = require('../lib/conexion');
const DB = 'MyTimeDB';
const COLLECTION = 'proyects';

/* GET Lista proyectos */
router.get('/', function(req, res, next) {
    conn.then(client => {
        client.db(DB).collection(COLLECTION).find({}).toArray((error, data) => {
            res.send(data);
        });
    });
});

/* GET Proyectos por Usuario */
router.get('/:user', function(req, res, next) {
    conn.then(client => {
        client.db(DB).collection(COLLECTION).find({
            AdminProyect: req.params.user
        }).toArray((error, data) => {
            res.send(data);
        });
    });
});

/* GET Proyectos por Usuario y por nombre de proyecto*/
router.get('/:user/:proyectName', function(req, res, next) {
    conn.then(client => {
        client.db(DB).collection(COLLECTION).find({
            AdminProyect: req.params.user,
            ProyectName: req.params.proyectName
        }).toArray((error, data) => {
            res.send(data);
        });
    });
});

module.exports = router;