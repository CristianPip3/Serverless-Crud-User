const fileType = require('file-type')
const S3 = require('aws-sdk/clients/s3')
const { v4: uuidv4 } = require('uuid')
const s3 = new S3()
const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg']

module.exports = () => {
  const uploadImage = body => {
    if (!body || !body.image) {
      throw new Error('Incorrect body on request')
    }
    let imageData = body.image
    if (body.image.substr(0, 7) === 'base64,') {
      imageData = body.image.substr(7, body.image.length)
    }
    const buffer = Buffer.from(imageData, 'base64')
    return fileType.fromBuffer(buffer)
      .then(file => detectImage(file, buffer)).catch(error => {
        console.log(error)
      })
  }
  const detectImage = (fileInfo, buffer) => {
    const detectedExt = fileInfo.ext || 'jpg'
    const detectedMime = fileInfo.mime
    if (!allowedMimes.includes(detectedMime)) {
      throw new Error('Mime is not Allowed')
    }
    const name = uuidv4()
    const key = `${name}.${detectedExt}`
    console.log(`writing image to bucket called ${key}`)
    const params = {
      Body: buffer,
      Key: key,
      ContentType: detectedMime,
      Bucket: process.env.IMAGEUPLOADBUCKET,
      ACL: 'public-read'
    }
    return s3.putObject(params).promise().then(data => {
      console.log('Upload image Ok', data)
      return `https://${process.env.IMAGEUPLOADBUCKET}.s3-${process.env.REGION}.amazonaws.com/${key}`
    })
  }
  return {
    uploadImage
  }
}
