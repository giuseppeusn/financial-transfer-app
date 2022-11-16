import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import { Request, Response } from 'express';
import usersRoute from '../routes/UserRoute';
import errorHandler from '../middlewares/Error';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', usersRoute);
app.use(errorHandler);

export default app;