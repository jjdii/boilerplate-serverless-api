module.exports = (status, body) => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*"    
    },
    body: JSON.stringify(body)
  }
}
