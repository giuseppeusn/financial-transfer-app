import { Router } from 'express';
import AccountController from '../controllers/AccountController';

const accountRoute = Router();

const accountController = new AccountController();

accountRoute.get('/', accountController.getAccountById);

export default accountRoute;