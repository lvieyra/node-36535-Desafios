require("dotenv").config();

module.exports = {
  app: {
    persistence: process.env.PERSISTENCE ? process.env.PERSISTENCE : 'MONGO'
  },
};