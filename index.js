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
  console.log(req.params)
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
    }
    if (result.Item) {
      res.json({ result });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
})

// Create User endpoint
app.post('/new', function (req, res) {
  const { versionData } = req.body;
  console.log('Data is: ', versionData)
  if (typeof versionData !== 'string') {
    res.status(400).json({ error: '"data" must be a string' });
  }
  let version
  const tableParams = {
    TableName: CANVAS_VERSIONS_TABLE,
  }

  dynamoDb.describeTable(tableParams).promise()
    .catch(err => {
      res.status(400).json({ error: err })
    })
    .then(data => {
      versionCount = data.Table.ItemCount
      console.log('Version count is: ', versionCount)
      const params = {
        TableName: CANVAS_VERSIONS_TABLE,
        Item: {
          version: { N: versionCount.toString() },
          data: { S: versionData.toString() },
          timestamp: { N: new Date().getTime().toString() }
        }
      };
      return dynamoDb.putItem(params).promise()
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
    .then(data => {
      console.log(data)
      res.json({ data })
    })


  // pify(dynamoDb.describeTable)(tableParams).then((err, data) => {
  //   if (err) {
  //     console.log('Error')
  //     console.log(err)
  //   } else {
  //     res.json({ data })
  //   }
  // })

  // const params = {
  //   TableName: CANVAS_VERSIONS_TABLE,
  //   Item: {
  //     version: 0,
  //     data: data,
  //     timestamp: new Date().getTime()
  //   },
  // };

  // dynamoDb.put(params, (error) => {
  //   if (error) {
  //     console.log(error);
  //     res.status(400).json({ error: 'Could not create version' });
  //   }
  //   res.json({ data });
  // });
})

module.exports.handler = serverless(app);