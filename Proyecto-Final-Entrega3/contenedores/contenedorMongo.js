
class contenedorMongo {
  constructor(model) {
    this.model = model;
  }

  getById = async (id) => {
    let results = await this.model.findById(id)
    return results;
  }

  getAll = async () => {
    let results = await this.model.find();
    return results;
  };

  save = async (objeto) => {
    let result = await this.model.create(objeto);
    return result;
  };

  update = async (id, objeto) => {
    const actualizado = await this.model.findOneAndUpdate({ _id: id }, objeto, {new: true});
    return actualizado;
  }
  delete = async(id) => {
    const eliminado = await this.model.findOneAndDelete({ _id: id });
    return eliminado;
  }
}

module.exports = contenedorMongo;