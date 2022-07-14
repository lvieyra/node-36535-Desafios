require('dotenv').config()
const mongoose = require('mongoose')
// let admin = require("firebase-admin");

// let serviceAccount = require("../node-f764e-firebase-adminsdk-stk8w-ffb8075b2c");
//   const firestoreConnect = admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://node-f764e-default-rtdb.firebaseio.com/"
//   });

const mongoConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
		console.log('*** CONEXION CORRECTA ***')
    } catch(e){
		console.log('*** ERROR CONEXION ***')
        throw new Error(`Error en DB ${e.message}`);
    }
}

let admin = require("firebase-admin");

let serviceAccount = require("../../node-f764e-firebase-adminsdk-stk8w-ffb8075b2c.json");
  const fireConnect = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-f764e-default-rtdb.firebaseio.com/"
  });

const firestoreConnect = admin.firestore()
module.exports = {
	mongoConnection,
	//FIRESTORE_FILE: process.env.FIRESTORE_FILE || ''
    firestoreConnect
}

