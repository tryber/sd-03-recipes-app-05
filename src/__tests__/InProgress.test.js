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
  wait,
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

describe('Check Components', () => {
  beforeEach(setUp);
  afterEach(cleanup);
  test('Have All the attibutes', async () => {
    await act(() => renderWithRouter('comidas/52771/in-progress'));
    const loading = screen.getByAltText('Loading');
    expect(loading).toBeDefined();
    const checkBoxes = await screen.findAllByTestId(/ingredient-step/gm);
    expect(checkBoxes[0]).toBeInTheDocument();
    const button = screen.getByTestId('finish-recipe-btn');
    expect(button).toHaveTextContent('Finalizar Receita');
    expect(button).toHaveAttribute('disabled');
  });

  test('Have All the attibutes', async () => {
    await act(() => renderWithRouter('bebidas/15997/in-progress'));
    const loading = screen.getByAltText('Loading');
    expect(loading).toBeDefined();
    const checkBoxes = await screen.findAllByTestId(/ingredient-step/gm);
    expect(checkBoxes[0]).toBeInTheDocument();
    const button = screen.getByTestId('finish-recipe-btn');
    expect(button).toHaveTextContent('Finalizar Receita');
    expect(button).toHaveAttribute('disabled');
  });

  test('Button Enabled', async () => {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ meals: { 52771: [1, 2, 3, 4, 5, 6, 7] }, cocktails: { 15997: [] } }));
    act(() => renderWithRouter('comidas/52771/in-progress'));

    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes[0]).not.toHaveAttribute('checked');
    expect(checkboxes[1]).toHaveAttribute('checked');

    act(() => fireEvent(checkboxes[0], new MouseEvent('click', { bubbles: true })));
    const checkBoxesChecked = await screen.findAllByRole('checkbox');
    expect(checkBoxesChecked[0]).toHaveAttribute('checked');
    expect(checkBoxesChecked[1]).toHaveAttribute('checked');

    const button = await screen.findByTestId('finish-recipe-btn');
    expect(button).toHaveTextContent('Finalizar Receita');
    await wait(() => expect(button).not.toHaveAttribute('disabled'));

    act(() => fireEvent(button, new MouseEvent('click', { bubbles: true })));
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');
  });
});
