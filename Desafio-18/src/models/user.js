import mongoose from 'mongoose';

const collectionName = 'users';

const schema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  empresa: String,
  puesto: String,
});

export default {
  collectionName,
  schema,
};
