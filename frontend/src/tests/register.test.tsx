import React from 'react';
import { screen } from "@testing-library/dom";
import App from "../App";
import renderWithRouter from "./utils/renderWithRouter";
import userEvent from '@testing-library/user-event'
import { setupRegisterError, setupRegisterSucess } from './mocks/handlers';

describe('Register page test', () => {
  it('renders register form successfully', () => {
    renderWithRouter(<App />, { route: '/register' });
    const registerTitle = screen.getByText(/crie uma conta/i);
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');
    const registerButton = screen.getByTestId('main-form-button');
    const loginButton = screen.getByTestId('secondary-form-button');

    expect(registerTitle).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    expect(registerButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    expect(registerButton).toHaveTextContent(/criar conta/i);
    expect(loginButton).toHaveTextContent(/já tenho uma conta/i);
  });

  it('secondary button redirects to login', () => {
    renderWithRouter(<App />, { route: '/register' });
    const loginButton = screen.getByTestId('secondary-form-button');

    loginButton.click();

    expect(window.location.pathname).toBe('/');
  });

  it('show error if has empty fields', async () => {
    renderWithRouter(<App />, { route: '/register' });

    const registerButton = screen.getByTestId('main-form-button');
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');

    await userEvent.type(username, 'example');

    registerButton.click();

    const errorPassword = await screen.findByText(/campo senha é obrigatório/i);

    expect(errorPassword).toBeInTheDocument();

    await userEvent.clear(username);
    await userEvent.type(password, 'Example123');

    registerButton.click();

    const errorUsername = await screen.findByText(/campo usuário é obrigatório/i);

    expect(errorUsername).toBeInTheDocument();
  });

  it('show error if username is less than 3 characters', async () => {
    renderWithRouter(<App />, { route: '/register' });
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');
    const registerButton = screen.getByTestId('main-form-button');

    await userEvent.type(username, 'ex');
    await userEvent.type(password, 'Example123');

    registerButton.click();

    const error = await screen.findByText(/usuário deve ter no mínimo 3 caracteres/i);

    expect(error).toBeInTheDocument();
  });

  it('show error if password is less than 8 characters', async () => {
    renderWithRouter(<App />, { route: '/register' });
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');
    const registerButton = screen.getByTestId('main-form-button');

    await userEvent.type(username, 'example');
    await userEvent.type(password, '12345');

    registerButton.click();

    const error = await screen.findByText(/senha deve ter no mínimo 8 caracteres/i);

    expect(error).toBeInTheDocument();
  });

  it('show error if if the password does not have an uppercase letter and a number', async () => {
    renderWithRouter(<App />, { route: '/register' });
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');
    const registerButton = screen.getByTestId('main-form-button');

    await userEvent.type(username, 'example');
    await userEvent.type(password, 'Example_x');

    const ERRO_MSG = /senha deve ter pelo menos uma letra maiúscula e um número/i;

    registerButton.click();

    const error = await screen.findByText(ERRO_MSG);

    expect(error).toBeInTheDocument();

    await userEvent.type(password, 'example123');

    registerButton.click();

    const error2 = await screen.findByText(ERRO_MSG);

    expect(error2).toBeInTheDocument();
  });

  it('show error if username already exists', async () => {
    setupRegisterError.listen();
    renderWithRouter(<App />, { route: '/register' });
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');
    const registerButton = screen.getByTestId('main-form-button');

    await userEvent.type(username, 'exist_example');
    await userEvent.type(password, 'Example123');

    registerButton.click();

    const error = await screen.findByText(/nome de usuário já cadastrado/i);

    expect(error).toBeInTheDocument();
    setupRegisterError.close();
    setupRegisterError.resetHandlers();
  });

  it('redirects to panel if register is successful', async () => {
    setupRegisterSucess.listen();

    renderWithRouter(<App />, { route: '/register' });
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');

    await userEvent.type(username, 'example_user');
    await userEvent.type(password, 'Example123');    

    const registerButton = screen.getByTestId('main-form-button');

    registerButton.click();

    const panelUsername = await screen.findByText(/example_user/i);
    const panelBalance = await screen.findByText(/saldo: R\$ 100,00/i);

    expect(panelUsername).toBeInTheDocument();
    expect(panelBalance).toBeInTheDocument();
    expect(window.location.pathname).toBe('/panel');

    setupRegisterSucess.close();
  });
});