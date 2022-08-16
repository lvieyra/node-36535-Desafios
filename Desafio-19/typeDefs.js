const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type Producto {
        id: ID
        nombre: String
        descripcion: String
        precio: Float
    }
    
    type Query {
        getAll: [Producto]
        getById(id: ID): Producto
    }

    type Mutation {
        create(nombre: String, descripcion: String, precio: Float): Producto
        update(id: ID, nombre: String, descripcion: String, precio: Float): Producto
        delete(id: ID!): Producto
    }
`

module.exports = typeDefs