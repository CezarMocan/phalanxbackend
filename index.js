const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const pify = require('pify')
const app = express()
const AWS = require('aws-sdk');

const CANVAS_VERSIONS_TABLE = process.env.CANVAS_VERSIONS_TABLE;

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8070'
  })
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB();
};

app.use(bodyParser.json({ strict: false }));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Get User endpoint
app.get('/version/:versionId', function (req, res) {
  const params = {
    TableName: CANVAS_VERSIONS_TABLE,
    Key: {
      version: { N: req.params.versionId },
    },
    AttributesToGet: ['version', 'data', 'timestamp']
  }

  dynamoDb.getItem(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
      return
    }
    if (result.Item && result.Item.data) {
      res.json({ 
        versionData: result.Item.data.S,
        version: result.Item.version.N,
        creationDate: result.Item.timestamp.N
      });
    } else {
      res.status(404).json({ error: "Version not found" });
    }
  });
})

// Create User endpoint
app.post('/new', function (req, res) {
  const versionData = JSON.stringify(req.body.versionData);
  const timestamp = new Date().getTime()
  const tableParams = {
    TableName: CANVAS_VERSIONS_TABLE,
  }

  dynamoDb.describeTable(tableParams).promise()
    .then(data => {
      versionCount = data.Table.ItemCount
      const params = {
        TableName: CANVAS_VERSIONS_TABLE,
        Item: {
          version: { N: versionCount.toString() },
          data: { S: versionData },
          timestamp: { N: timestamp.toString() }
        }
      };
      return dynamoDb.putItem(params).promise()
    })
    .then(data => {
      res.json({ 
        version: versionCount,
        creationDate: timestamp
      })
    })
    .catch(err => {
      console.log('Error: ', err)
      res.status(400).json({ error: err })
    })
})

module.exports.handler = serverless(app);