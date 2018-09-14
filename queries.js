export const CANVAS_VERSIONS_TABLE = process.env.CANVAS_VERSIONS_TABLE;

export const get_AllVersions = () => {
  return {
    TableName: CANVAS_VERSIONS_TABLE,
    AttributesToGet: ['version', 'timestamp']
  }
}

export const get_Version = (versionId) => {
  return {
    TableName: CANVAS_VERSIONS_TABLE,
    Key: { version: { N: versionId.toString() } },
    AttributesToGet: ['version', 'data', 'timestamp']
  }
}

export const get_VersionCount = () => {
  return {
    TableName: CANVAS_VERSIONS_TABLE
  }
}

export const put_Version = (versionId, versionData, timestamp) => {
  return {
    TableName: CANVAS_VERSIONS_TABLE,
    Item: {
      version: { N: versionId.toString() },
      data: { S: versionData },
      timestamp: { N: timestamp.toString() }
    }
  }
}