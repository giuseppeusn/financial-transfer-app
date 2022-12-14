import { Router } from 'express';
import UserController from '../controllers/UserController';

const usersRoute = Router();

const userController = new UserController();

usersRoute.post('/register', userController.registerUser);
usersRoute.post('/login', userController.loginUser);
usersRoute.post('/validate', userController.validateToken);

export default usersRoute;