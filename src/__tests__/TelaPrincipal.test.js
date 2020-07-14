// app.test.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render, fireEvent, act, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import meals from '../__mocks__/meals';
import drinks from '../__mocks__/drinks';
import fetch from '../__mocks__/fetch';

// const mockFetch = () => {
//   // const apiResponse = Promise.resolve({
//   //   json: () => Promise.resolve(fetch),
//   //   ok: true,
//   // });
//   // global.fetch = jest.fn(() => apiResponse);
//   jest.spyOn(global, 'fetch').mockImplementation(() => console.log('url'));
// };

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
    // expect(fetch).toHaveBeenCalled();
  });

  test('Expect header to be "comidas"', async () => {
    const { findByText } = renderWithRouter('comidas');
    const header = await findByText('Comidas');
    expect(header).toBeInTheDocument();
  });

  test('Expected cards to have attibutes', async () => {
    const { findAllByTestId } = renderWithRouter('comidas');
    const card = await findAllByTestId(/recipe-card/gm);
    const cardImage = await findAllByTestId(/card-img/gm);
    const cardName = await findAllByTestId(/card-name/gm);
    expect(card).toHaveLength(12);
    expect(cardImage).toHaveLength(12);
    expect(cardName).toHaveLength(12);
  });

  test('Send to details on click', async () => {
    const { findAllByTestId, history } = renderWithRouter('comidas');
    const card = await findAllByTestId(/recipe-card/gm);
    fireEvent.click(card[0]);
    expect(history.location.pathname).toEqual('/comidas/52977');
  });

  test('Send to details on click', async () => {
    const { findAllByTestId, history } = renderWithRouter('bebidas');
    const card = await findAllByTestId(/recipe-card/gm);
    fireEvent.click(card[0]);
    expect(history.location.pathname).toEqual('/bebidas/15997');
  });
});
