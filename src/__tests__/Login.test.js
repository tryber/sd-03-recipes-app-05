import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  fireEvent,
  act,
  screen,
  cleanup,
  wait,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetch from '../__mocks__/fetch';
import App from '../App';
import localStorageMock from '../utilTests/setupLocalStorage';
import done from '../utilTests/donerecipe';

const history = createMemoryHistory();
const renderWithRouter = (path) => {
  history.push(`/${path}`);
  return {
    ...render(
      <Router history={history}>
        <App />
      </Router>,
    ),
    history,
  };
};
const setUp = () => {
  fetch();
  localStorageMock();
};

describe('Name of the group', () => {
  beforeEach(setUp);
  afterEach(cleanup);

  test('Test if login works', async () => {
    await act(() => renderWithRouter(''));

    const loginInput = await screen.findByTestId('email-input');
    expect(loginInput).toBeInTheDocument();

    fireEvent.change(loginInput, { target: { value: 'dreadpool38@gmail.com' } });

    const password = await screen.findByTestId('password-input');
    expect(password).toBeInTheDocument();

    fireEvent.change(password, { target: { value: '1234567890' } });

    const btn = await screen.findByTestId('login-submit-btn');
    fireEvent.click(btn);

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');
  });
});
