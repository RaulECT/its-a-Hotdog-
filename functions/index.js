const functions = require('firebase-functions');
const admin = require('firebase-admin')
const gcs = require('@google-cloud/storage')()
const vision = require('@google-cloud/vision')()

admin.initializeApp(functions.config().firebase)

exports.isHotdog = functions.storage.object().onChange(event => {
  const object = event.data

  if (object.resourceState === 'not_exists') {
    return console.log('this is a deletion event');
  } else if(!object.name) {
    return console.log('This is a deploy event');
  }

  const bucket = gcs.bucket(object.bucket)
  const file = bucket.file(object.name)
  const gcsPath = `gs://${bucket.name}/${file.name}`

  console.log(bucket);
  console.log(file);

  return vision.labelDetection({source: {imageUri: gcsPath}}).then(data => {
    const labels = data[0].labelAnnotations
    const tags = []
    console.log(data[0]);

    labels.map( label => {
      tags.push( label.description )
    } )

    if( tags.includes('hot dog') ){
      console.log('image is a HOT DOG');
      return admin.database().ref('/uploads/photo').update({
        isHotdog: true
      })
    }

    return admin.database().ref('/uploads/photo').update({
      isHotdog: false
    })
  } )
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
