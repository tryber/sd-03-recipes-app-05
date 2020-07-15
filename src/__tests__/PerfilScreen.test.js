import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  fireEvent,
  act,
  screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetch from '../__mocks__/fetch';
import App from '../App';
import localStorageMock from '../utilTests/setupLocalStorage';

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

  test('clear', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'dreadpool38@gmail.com' }));
    await act(() => renderWithRouter('perfil'));
    const user = await screen.findByTestId('profile-email');
    expect(user).toHaveTextContent('dreadpool38@gmail.com');
    const leaveBtn = await screen.findByTestId('profile-logout-btn');
    expect(leaveBtn).toBeInTheDocument();

    fireEvent.click(leaveBtn);
    expect(Object.keys(localStorage)).toHaveLength(1);
  });

  test('user dont exist', async () => {
    await act(() => renderWithRouter('perfil'));
    const user = await screen.findByTestId('profile-email');
    expect(user).toHaveTextContent('');
  });
});
