import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import userEvent from '@testing-library/user-event'
import { setupLoginError, setupLoginSucess } from './mocks/handlers';
import App from '../App';

describe('Login page test', () => {
  it('renders login form successfully', () => {
    renderWithRouter(<App />, { route: '/' });
    const loginTitle = screen.getByText(/faça login/i);
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('main-form-button');
    const registerButton = screen.getByTestId('secondary-form-button');

    expect(loginTitle).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();

    expect(loginButton).toHaveTextContent(/entrar/i);
    expect(registerButton).toHaveTextContent(/crie uma conta/i);
  });

  it('secondary button redirects to register', () => {
    renderWithRouter(<App />, { route: '/' });
    const registerButton = screen.getByTestId('secondary-form-button');

    registerButton.click();

    expect(window.location.pathname).toBe('/register');
  });

  it('show error if has empty fields', async () => {
    renderWithRouter(<App />, { route: '/' });

    const loginButton = screen.getByTestId('main-form-button');

    loginButton.click();

    const error = await screen.findByText(/preencha todos os campos/i);

    expect(error).toBeInTheDocument();
  });

  it('show error if has invalid credentials', async () => {
    setupLoginError.listen();
    renderWithRouter(<App />, { route: '/' });
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');

    await userEvent.type(username, 'invalid');
    await userEvent.type(password, 'invalid');    

    const loginButton = screen.getByTestId('main-form-button');

    loginButton.click();

    const error = await screen.findByText(/usuário ou senha inválidos/i);    

    expect(error).toBeInTheDocument();
    setupLoginError.close();
  });

  it('redirects to panel if has valid credentials', async () => {
    setupLoginSucess.listen();

    renderWithRouter(<App />, { route: '/' });
    const username = screen.getByTestId('username-input');
    const password = screen.getByTestId('password-input');

    await userEvent.type(username, 'example_user');
    await userEvent.type(password, 'example_password');    

    const loginButton = screen.getByTestId('main-form-button');

    loginButton.click();

    const panelUsername = await screen.findByText(/example_user/i);
    const panelBalance = await screen.findByText(/saldo: R\$ 100,00/i);

    expect(panelUsername).toBeInTheDocument();
    expect(panelBalance).toBeInTheDocument();
    expect(window.location.pathname).toBe('/panel');

    setupLoginSucess.close();
  });
});
