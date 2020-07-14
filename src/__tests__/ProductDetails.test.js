// app.test.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import meals from '../__mocks__/meals';
import drinks from '../__mocks__/drinks';
import fetch from '../__mocks__/fetch';
import Notfound from '../components/NotFound';

const mockFetch = () => {
  const apiResponse = Promise.resolve({
    json: () => Promise.resolve(fetch),
    ok: true,
  });
  global.fetch = jest.fn(() => apiResponse);
};

const renderWithRouter = (path) => {
  const history = createMemoryHistory();
  history.push(`/${path}`);
  return {
    ...render(
      <Router history={history}>
        <Notfound />
      </Router>,
    ),
    history,
  };
};
describe.skip('1-notfound', () => {
  test('Expected not found to exist', async () => {
    const { findByText } = renderWithRouter('explorar/bebidas/area');
    const text = await findByText('Not Found');
    expect(text).toBeInTheDocument();
  });
});
