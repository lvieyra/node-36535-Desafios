import express from 'express';
import usersController from '../controllers/usersController.js';
const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getByIdUser);
router.post('/', usersController.saveUser);
router.delete('/:id', usersController.deleteUser);
router.put('/:id', usersController.updateUser);

export default router;
