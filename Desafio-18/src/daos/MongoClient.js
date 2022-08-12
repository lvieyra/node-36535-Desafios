import dotenv from 'dotenv';

dotenv.config();
import mongoose from 'mongoose';

export default class MongoClient {
  constructor() {
    this.connected = true;
    this.client = mongoose;
  }
  connect = async () => {
    try {
      await this.client.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('*** CONEXION CORRECTA ***')
    } catch(e){
		console.log('*** ERROR CONEXION ***')
        throw new Error(`Error en DB ${e.message}`);
    }
  };
}
