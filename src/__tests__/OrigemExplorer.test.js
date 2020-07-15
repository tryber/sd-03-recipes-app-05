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

  test('comidas', async () => {
    await act(() => renderWithRouter('explorar/comidas/area'));
    const drop = await screen.findByTestId('explore-by-area-dropdown');
    fireEvent.change(drop, { targer: { value: 'American' } });
    const card = await screen.findByTestId('0-card-name');
    expect(card).toHaveTextContent('Corba');
  });
  test('bebidas', async () => {
    await act(() => renderWithRouter('explorar/bebidas/area'));
  });
});
