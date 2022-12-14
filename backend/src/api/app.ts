import * as express from 'express';
import * as cors from 'cors';
import 'express-async-errors';
import { usersRoute, transactionsRoute, accountRoute } from '../routes';
import errorHandler from '../middlewares/Error';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', usersRoute);
app.use('/transaction', transactionsRoute);
app.use('/account', accountRoute);
app.use(errorHandler);

export default app;