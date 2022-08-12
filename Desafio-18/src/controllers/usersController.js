import UsersService from '../services/usersService.js';
import UsersDTO from '../dtos/usersDTO.js';
const usersService = new UsersService();

const getUsers = async(req, res) => {
  let result = await usersService.getUsers();
  let resultsDTO = result.map((user) => new UsersDTO(user));
  res.status(200).json({
    message: 'Usuarios obtenidos con éxito',
    users: resultsDTO
  });
};
const getByIdUser =  async (req,res)=> {
  const {id} = req.params;
  let response;

  try {
         
      response = await usersService.getByIdUser(id);
      if( response.length > 0 ){
        res.send({ Ok: true, response})
      }else{
        res.send({ Ok: false,
        message: 'User ' + id + ' no existe'});
      }
  
      
          
  } catch (error) {
     
     res.send(error.message)
  }
  
  
  
}
const saveUser = async (req, res) => {
  let user = req.body;
 
  let result = await usersService.addUser(user);
  res.status(200).json({
    message: 'Agregar usuario con  éxito',
    users: result
  });
};
const updateUser = async (req, res) => {
    let id  = req.params.id;
    let user = req.body;
     await usersService.updateUser(id,user);
     res.status(200).json({
      message: 'Actualizar usuario con  éxito',
      users: user
     })
};
const deleteUser = async (req, res) => {
 
  let user = req.params.id;
   await usersService.deleteUser(user);
  res.status(200).json({
    messages:`El ${user} ha sido eliminado`
  });
}

export default {
  getUsers,
  getByIdUser,
  saveUser,
  deleteUser,
  updateUser
};
