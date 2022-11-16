import { Router } from 'express';
import verifyLogin from '../middlewares/VerifyLogin';
import UserController from '../controllers/UserController';

const usersRoute = Router();

const userController = new UserController();

usersRoute.post('/register', verifyLogin, userController.registerUser);
usersRoute.post('/login', verifyLogin, userController.loginUser);

export default usersRoute;