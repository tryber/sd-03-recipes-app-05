// app.test.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render, fireEvent, act, cleanup, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import fetch from '../__mocks__/fetch';

const renderWithRouter = (path) => {
  const history = createMemoryHistory();
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
describe('1-Mock', () => {
  beforeEach(fetch);
  afterEach(cleanup);
  test('Expect fetch to have been called', async () => {
    renderWithRouter('comidas');
  });

  test('Expect header to be "comidas"', async () => {
    const { findByText } = renderWithRouter('comidas');
    const header = await findByText('Comidas');
    expect(header).toBeInTheDocument();
  });

  test('Send to details on click', async () => {
    const { findAllByTestId, history } = renderWithRouter('comidas');
    const card = await findAllByTestId(/recipe-card/gm);
    fireEvent.click(card[0]);
    expect(history.location.pathname).toEqual('/comidas/52977');
  });

  test('Send to details on click-bebidas', async () => {
    const { findAllByTestId, history } = renderWithRouter('bebidas');
    const cards = await findAllByTestId(/recipe-card/gm);
    fireEvent.click(cards[0]);
    expect(history.location.pathname).toEqual('/bebidas/15997');
  });

  test('Search by ingredient-comidas', async () => {
    await act(async () => {
      renderWithRouter('comidas');
    });
    const searchBtn = await screen.findByTestId('search-top-btn');
    fireEvent.click(searchBtn);

    const searchBar = await screen.findByTestId('search-input');
    fireEvent.change(searchBar, { target: { value: 'chicken' } });
    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    fireEvent.click(ingredientRadio);
    const btn = await screen.findByTestId('exec-search-btn');
    fireEvent.click(btn);
    const card = await screen.findByTestId('0-recipe-card');
    expect(card).toHaveTextContent('Corba');
  });

  test('Search by ingredient-bebidas', async () => {
    await act(async () => {
      renderWithRouter('bebidas');
    });
    const searchBtn = await screen.findByTestId('search-top-btn');
    fireEvent.click(searchBtn);

    const searchBar = await screen.findByTestId('search-input');
    fireEvent.change(searchBar, { target: { value: 'chicken' } });
    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    fireEvent.click(ingredientRadio);
    const btn = await screen.findByTestId('exec-search-btn');
    fireEvent.click(btn);
    const card = await screen.findByTestId('0-recipe-card');
    expect(card).toHaveTextContent('GG');
  });

  test('Search by first letter-comidas', async () => {
    await act(async () => {
      renderWithRouter('comidas');
    });
    const searchBtn = await screen.findByTestId('search-top-btn');
    fireEvent.click(searchBtn);

    const searchBar = await screen.findByTestId('search-input');
    fireEvent.change(searchBar, { target: { value: 'gabriel' } });
    const firstLetter = await screen.findByTestId('name-search-radio');
    fireEvent.click(firstLetter);
    const btn = await screen.findByTestId('exec-search-btn');
    fireEvent.click(btn);
    const card = await screen.findByTestId('0-recipe-card');
    expect(card).toHaveTextContent('Corba');
  });

  test('Search by first letter-bebidas', async () => {
    await act(async () => {
      renderWithRouter('bebidas');
    });
    const searchBtn = await screen.findByTestId('search-top-btn');
    fireEvent.click(searchBtn);

    const searchBar = await screen.findByTestId('search-input');
    fireEvent.change(searchBar, { target: { value: 'gabriel' } });
    const firstLetter = await screen.findByTestId('name-search-radio');
    fireEvent.click(firstLetter);
    const btn = await screen.findByTestId('exec-search-btn');
    fireEvent.click(btn);
    const card = await screen.findByTestId('0-recipe-card');
    expect(card).toHaveTextContent('GG');
  });

  test('Search by first letter', async () => {
    await act(async () => {
      renderWithRouter('comidas');
    });
    const searchBtn = await screen.findByTestId('search-top-btn');
    fireEvent.click(searchBtn);

    const searchBar = await screen.findByTestId('search-input');
    fireEvent.change(searchBar, { target: { value: 'a' } });
    const firstLetter = await screen.findByTestId('first-letter-search-radio');
    fireEvent.click(firstLetter);
    const btn = await screen.findByTestId('exec-search-btn');
    fireEvent.click(btn);
    const card = await screen.findByTestId('0-recipe-card');
    expect(card).toHaveTextContent('Corba');
  });

  test('filters', async () => {
    await act(async () => {
      renderWithRouter('comidas');
    });

    let filterbtn = await screen.findByTestId('Beef-category-filter');
    fireEvent.click(filterbtn);

    filterbtn = await screen.findByTestId('All-category-filter');
    fireEvent.click(filterbtn);
  });
});
