import { get_AllVersions, get_Version, get_VersionCount, put_Version, CANVAS_VERSIONS_TABLE } from './queries'

const AWS = require('aws-sdk');
// Initialize DB
const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8070'
  })
} else {
  dynamoDb = new AWS.DynamoDB();
};


// Expose operations
export const getVersions = async () => {
  const params = get_AllVersions()
  let result

  try {
    result = await dynamoDb.scan(params).promise()
  } catch (e) {
    throw new Error('Could not get versions')
    return
  }

  if (!result.Items) {
    throw new Error('Could not get versions')
    return
  }

  const versions = result.Items.map(i => {
    return {
      version: parseInt(i.version.N),
      timestamp: parseInt(i.timestamp.N)
    }
  }).sort((x, y) => {
    return x.version < y.version ? -1 : 1
  })

  return { versions }
}

export const getVersionCount = async () => {
  const params = get_VersionCount()
  let data

  try {
    data = await dynamoDb.scan(params).promise()
    //await dynamoDb.describeTable(params).promise()
  } catch (e) {
    throw new Error(JSON.stringify(data) + " --- " + JSON.stringify(e))
  }

  return data.Count
}

export const getVersion = async (versionId) => {
  const params = get_Version(versionId)
  let result

  try {
    result = await dynamoDb.getItem(params).promise()
  } catch (e) {
    console.log('getVersion error: ', e)
    throw new Error('Could not get version')
    return
  }

  if (!result.Item || !result.Item.data) {
    throw new Error('Version data is not complete: ', result)
    return
  }

  return {
    versionData: result.Item.data.S,
    version: result.Item.version.N,
    creationDate: result.Item.timestamp.N
  }  
}

export const putVersion = async (versionId, versionData, timestamp) => {
  const params = put_Version(versionId, versionData, timestamp)
  let result

  try {
    result = await dynamoDb.putItem(params).promise()
  } catch (e) {
    console.log('Caught error in putVersion: ', e)
    throw new Error('Could not put version')
    return
  }

  return {
    version: versionId,
    creationDate: timestamp
  }
}
