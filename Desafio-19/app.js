const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers.js');
const {dbConnections} = require('./db.js')

const app = express();

dbConnections()

async function start () {
    const apolloServer = new ApolloServer({
         typeDefs,
         resolvers
    })

    await apolloServer.start()
    const PORT = process.env.PORT || 3000; 

    apolloServer.applyMiddleware({app})

    app.listen(PORT, ()=> console.log(`Servidor Up! ${PORT}`))

}

start()