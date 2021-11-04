import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import rootReducers from '../reducers';

const THREE = 3;

const renderWithReduxAndRouter = (component, {
  initialState = {},
  store = createStore(rootReducers, initialState),
  initialEntries = ['/'],
  history = createMemoryHistory({ initialEntries }),
} = {}) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        { component }
      </Provider>
    </Router>,
  ),
  store,
  history,
});

describe('Testa o component SearchBar', () => {
  const { getByTestId } = renderWithReduxAndRouter(<SearchBar />);
  const inputBar = getByTestId('search-input');
  const nameRadio = getByTestId('name-search-radio');
  const firstLetterRadio = getByTestId('first-letter-search-radio');
  const ingredientRadio = getByTestId('ingredient-search-radio');

  test('Tem os data-testids da barra e dos radio-buttons', () => {
    expect(inputBar).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
  });

  test('Altera corretamente o valor dos inputs', () => {
    expect(inputBar).toHaveValue('');
    fireEvent.change(inputBar, { target: { value: 'chicken' } });
    expect(inputBar).toHaveValue('chicken');

    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);

    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio.checked).toBe(true);

    fireEvent.click(ingredientRadio);
    expect(ingredientRadio.checked).toBe(true);
  });

  test('Verifique se existem 3 radio buttons', () => {
    const { getAllByRole } = renderWithReduxAndRouter(<SearchBar />);
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(THREE);
  });
});
