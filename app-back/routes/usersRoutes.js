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
      client.db(DB).collection(COLLECTION).find({}).toArray((error, data) => {
          res.send(data);
      });
  });
});

/* GET user por userName */
router.get('/:user', function(req, res, next) {
  conn.then(client => {
      client.db(DB).collection(COLLECTION).find({
        userName: req.params.user
      }).toArray((error, data) => {
          res.send(data);
      });
  });
});

module.exports = router;
