// app.test.js
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
describe('Product Details', () => {
  beforeEach(fetch);
  afterEach(cleanup);

  test('Expect fetch to be called', async () => {
    await act(async () => {
      renderWithRouter('comidas/52771');
    });

    expect(global.fetch).toHaveBeenCalled();
  });

  test('Name Test', async () => {
    await act(async () => {
      renderWithRouter('comidas/52771');
    });
    const name = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');
    expect(name).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(name.innerHTML).toBe('Spicy Arrabiata Penne');
  });
});

describe("Button's test", () => {
  beforeEach(fetch);
  afterEach(cleanup);

  test('Button Change', async () => {
    await act(async () => {
      renderWithRouter('comidas/52771');
    });

    const button = await screen.getByTestId('start-recipe-btn');
    expect(button).toHaveTextContent('Iniciar Receita');
  });

  test('Button has continuar receita', async () => {
    window.localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        meals: { 52771: [], 52785: [], 53013: [] },
        cocktails: { 15997: [] },
      }),
    );

    await act(async () => {
      renderWithRouter('comidas/52771');
    });

    const buttonReloaded = await screen.getByTestId('start-recipe-btn');
    expect(buttonReloaded).toHaveTextContent('Continuar Receita');
  });

  test('Button Click Works', async () => {
    await act(async () => {
      renderWithRouter('comidas/52771');
    });

    const button = await screen.getByTestId('start-recipe-btn');
    act(() => fireEvent.click(button));
    expect(history.location.pathname).toEqual('/comidas/52771/in-progress');
  });
});

describe('fav container', () => {
  beforeEach(fetch);
  afterEach(cleanup);

  test('copy', async () => {
    await act(async () => {
      renderWithRouter('comidas/52771');
    });
    const shareBtn = await screen.findByTestId('share-btn');
    fireEvent.click(shareBtn);
  });
  test('favorite', async () => {
    await act(async () => {
      renderWithRouter('comidas/52771');
    });
    const favbtn = await screen.findByTestId('favorite-btn');
    fireEvent.click(favbtn);
    fireEvent.click(favbtn);
  });
});
