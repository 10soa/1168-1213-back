var admin = require("firebase-admin");

var serviceAccount = require("./m1-apk-andao-firebase-adminsdk-ms83y-ceaeb7219d.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "firebase-adminsdk-ms83y@m1-apk-andao.iam.gserviceaccount.com"
})

module.exports.admin = admin