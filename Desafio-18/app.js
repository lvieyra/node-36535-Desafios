import express from 'express';
import usersRouter from './src/routers/usersRouter.js';
import MongoClient from './src/daos/MongoClient.js';
const PORT = 3000;
const app = express();
app.listen(PORT, () => console.log('Server Up! ' + PORT));
let client = new MongoClient();
client.connect();

app.use(express.json());
app.use('/users', usersRouter);

export default app;
