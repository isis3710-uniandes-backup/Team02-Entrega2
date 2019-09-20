/*
herramienta de modelado
*/
let mongoClient = require('mongodb').MongoClient;

/*
Obtiene el componente de mongo
*/
var conn = mongoClient.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = conn;
