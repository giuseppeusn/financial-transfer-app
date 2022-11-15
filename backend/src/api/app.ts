import * as express from 'express';
import * as cors from 'cors';
import { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/coffee', (_req: Request, res: Response) => res.status(418).end());

export default app;