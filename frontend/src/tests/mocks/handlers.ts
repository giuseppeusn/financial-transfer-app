import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { transactionsMock } from './TransactionsMock';

export const setupLoginError = setupServer(
  rest.post('http://localhost:3001/user/login', (_req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        code: 'invalid_credentials',
        message: 'Mocked message',
      }),
    )
  })
);

export const setupLoginSucess = setupServer(
  rest.post('http://localhost:3001/user/login', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: "example_user",
        token: "mocked_token",
      }),
    )
  }),

  rest.post('http://localhost:3001/user/validate', (_req, res, ctx) => {
    return res(
      ctx.status(204),
    )
  }),
  
  rest.get('http://localhost:3001/account', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        balance: 100,
      }),
    )
  }),

  rest.get('http://localhost:3001/transaction', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(transactionsMock),
    )
  }),
);

export const setupRegisterError = setupServer(
  rest.post('http://localhost:3001/user/register', (_req, res, ctx) => {
    return res(
      ctx.status(409),
      ctx.json({
        code: 'user_exist',
        message: 'Mocked message',
      }),
    )
  })
);

export const setupRegisterSucess = setupServer(
  rest.post('http://localhost:3001/user/register', (_req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        username: "example_user",
        token: "mocked_token",
      }),
    )
  }),

  rest.post('http://localhost:3001/user/validate', (_req, res, ctx) => {
    return res(
      ctx.status(204),
    )
  }),
  
  rest.get('http://localhost:3001/account', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        balance: 100,
      }),
    )
  }),

  rest.get('http://localhost:3001/transaction', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(transactionsMock),
    )
  }),
);