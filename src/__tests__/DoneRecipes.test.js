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

  test('filter', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    await act(() => renderWithRouter('receitas-feitas'));
    let cards = await screen.findAllByTestId(/horizontal-image/gm);
    expect(cards).toHaveLength(2);

    let foodFilter = await screen.findByText('Food');
    expect(foodFilter).toBeInTheDocument();
    act(() => fireEvent.click(foodFilter));

    cards = await screen.findAllByTestId(/horizontal-image/gm);
    expect(cards).toHaveLength(1);

    foodFilter = await screen.findByText('Drinks');
    expect(foodFilter).toBeInTheDocument();
    act(() => fireEvent.click(foodFilter));

    cards = await screen.findAllByTestId(/horizontal-image/gm);
    expect(cards).toHaveLength(1);
  });

  test('copy', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    await act(() => renderWithRouter('receitas-feitas'));

    const btn = await screen.findByTestId('0-horizontal-share-btn');
    fireEvent.click(btn);
  });

  test('send using name', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    await act(() => renderWithRouter('receitas-feitas'));

    const btn = await screen.findByTestId('0-horizontal-image');
    fireEvent.click(btn);
  });

  test('send usign button', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    await act(() => renderWithRouter('receitas-feitas'));

    const btn = await screen.findByTestId('0-horizontal-name');
    fireEvent.click(btn);
  });
});
