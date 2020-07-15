// app.test.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notfound from '../components/NotFound';

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
describe('Not Found Page', () => {
  test('Expected not found to exist', async () => {
    const { findByText } = renderWithRouter('explorar/bebidas/area');
    const text = await findByText('Not Found');
    expect(text).toBeInTheDocument();
  });
});
