import { Router } from 'express';
import UserController from '../controllers/UserController';

const usersRoute = Router();

const userController = new UserController();

usersRoute.post('/register', userController.registerUser);

export default usersRoute;