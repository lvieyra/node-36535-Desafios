import mongoose from 'mongoose';
import usersModel from '../models/user.js';

export default class UsersDaoDB {
  constructor() {
    this.model = mongoose.model(usersModel.collectionName, usersModel.schema);
  }
  getAll = async () => {
    let results = await this.model.find();
    return results;
  };

   getById= async(id) =>{
  
    let result = await this.model.find({_id : id})
    console.log(result)
    return result
  }

  save = async (user) => {
    let result = await this.model.create(user);
    return result;
  };
  async update(id,data) {
    return await this.model.findOneAndUpdate({ _id :id }, data )
  };

 async delete(id){
    return await this.model.findOneAndDelete({ _id :id })
  }
}
