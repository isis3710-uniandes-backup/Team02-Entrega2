/*
herramienta de modelado
*/
let mongoClient = require('mongodb').MongoClient;

/*
*Be aware. change local host at the moment of deployment
Obtiene el componente de mongo
*/
var conn = mongoClient.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = conn;
