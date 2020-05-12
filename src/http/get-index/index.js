let aws = require('aws-sdk')

exports.handler = async function handler() {
  
  let s3 = new aws.S3
  let items = await s3.getObject({
    Bucket: process.env.ARC_STATIC_BUCKET,
    Key: `${process.env.ARC_STATIC_FOLDER}/modules.json`,
  }).promise()

  return {
    headers: {
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      "content-type": "text/html; charset=utf8",
    },
    body: `<!DOCTYPE html>
<html lang=en>
<head>
  <meta charset=UTF-8>
  <meta name=viewport content="width=device-width, initial-scale=1">
  <title></title>
</head>
<body>
modules
${ JSON.stringify(items) }
</body>
</html>`,
  };
};
