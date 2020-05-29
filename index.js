const db = require("./app").default;
var app = require('express')();
const bodyParser = require('body-parser');
var http = require('http').createServer(app);
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var data;
  // Connection URL
  const url = 'mongodb://192.168.137.1:27017';

  // Database Name
  const dbName = 'test_embed1';

  // Create a new MongoClient
  const client = new MongoClient(url);

  client.connect(function(err) {
    (async () => {
      try {
  
          await client.connect();
          console.log("Connected successfully to server");
          const db = client.db(dbName);
          var docs = await findDocuments(db);
          data = JSON.stringify(docs);
          // app.post('/index.html', function(request, response){
          //   var data = docs;
          // });
          client.close();
      }
      catch(error)
      {
          console.log(error);
      }
      })();
  
    client.close();
  });

  const findDocuments = async (db) => {
    // Get the documents collection
    const collection = db.collection('LaboOpdrachtMongoDb');
  // Find some documents
  docs = await collection.find().limit(10).toArray();
  return docs;
  }
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/data.json', (req, res) => {
  res.send(data);
});

  app.post('/', function (req, res) {
    console.log(req.body);
    res.sendFile(__dirname + '/index.html');
  });


  http.listen(3000, function(){
    console.log('listening on *:3000');
  });
