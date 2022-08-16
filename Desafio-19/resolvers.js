const Producto = require('./models/productos.js')


const resolvers = {
    Query: {
        getAll: async () => {
            const productos = await Producto.find()
            return productos;
        },
        getById: async (parent, args) => {
            const producto = await Producto.findById(args.id);
            return producto;
        }
    },
    Mutation: {
        create: async (parent, args, context, info) => {
            const { nombre, descripcion, precio } = args
          
            const producto = new Producto({ nombre, descripcion, precio } )
             await producto.save()
              return producto
        },
        update: async (parent, args, context, info) => {
            const { nombre, descripcion, precio } = args
            const data = { nombre, descripcion, precio };
            const id = args.id;
            const product = await Producto.findByIdAndUpdate({_id: id}, data, {new: true});
            return product;
        },
        delete: async (parent, args, context, info) => {
            const { id } = args;
            const product = await Producto.findByIdAndDelete(id);
            return product;
        }
    }
}

module.exports = resolvers