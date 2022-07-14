const {firestoreConnect} = require('../config/globals.js')

class ContainerFirestore {
    constructor(collection, db=firestoreConnect){
      this.collection = db.collection(collection)
      console.log(`Base conectada con la collection ${collection}`)
    }
  
    async save(document){
      let doc = this.collection.doc()
      let item = await doc.create(document)
      return item
    }
  
    async getAll(){
      let result = await this.collection.get()
      result = result.docs.map(doc => ({ 
        id: doc.id,
        data: doc.data()
      }))
      return result
    }
  
    async getById(id){
      let result = await this.collection.get()
      result = result.docs.map(doc => ({ 
        id: doc.id,
        data: doc.data()
      }))
      let item = result.find(elem => elem.id == id)
      return item
    }
    async update(content, id){

       
        let doc = this.collection.doc(`${id}`)
    
        let item = await doc.update(content)
    
        return item
    
      }

    async delete(id){
      let doc = this.collection.doc(`${id}`)
      let item = await doc.delete()
      return ({ status: 'Deleted' })
    }
  
    async getAllCarritos(){
        let carritos = await this.model.find();
        return carritos
      }
    
  }
  
  module.exports = { ContainerFirestore }
  