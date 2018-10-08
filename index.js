import serverless from 'serverless-http'
import bodyParser from 'body-parser'
import express from 'express'
import pify from 'pify'

import { getVersions, getVersion, getVersionCount, putVersion } from './db'

const app = express()

app.use(bodyParser.json({ strict: false }));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Get all site versions
app.get('/versions', async (req, res) => {
  let versions
  try {
    versions = await getVersions()
  } catch (e) {
    res.status(400).json({ e })
    return
  }
  res.json(versions)
})

app.get('/version/latest', async (req, res) => {
  let version, versionId

  try {
    versionId = await getVersionCount()
  } catch (e) {
    console.log('Error getting versionId: ', e)
    res.status(400).json({})
    return
  }

  if (versionId == 0) {
    res.json({})
    return
  }

  try {
    version = await getVersion(versionId - 1)
  } catch (e) {
    console.log('Failed to get latest version: ', versionId - 1, e)
    res.status(400).json({})
    return    
  }
  res.json(version)
})

// Get a certain site version
app.get('/version/:versionId', async (req, res) => {
  let version

  try {
    version = await getVersion(req.params.versionId)
  } catch (e) {
    res.status(400).json({})
    return    
  }
  res.json(version)
})

// Post new site version
app.post('/new', async (req, res) => {
  const versionData = JSON.stringify(req.body.versionData);
  const timestamp = new Date().getTime()
  let versionId, newVersionData

  try {
    versionId = await getVersionCount()    
  } catch (e) {
    console.log('Error getting versionId: ', e)
    res.status(400).json({})
    return
  }

  console.log('Version ID is: ', versionId)

  try {
    newVersionData = await putVersion(versionId, versionData, timestamp)
  } catch (e) {
    res.status(400).json({})
    return
  }

  res.json(newVersionData)
})

export const handler = serverless(app);