import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { createStore } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import rootReducers from '../reducers';

const renderWithReduxAndRouter = (component, {
  initialState = {},
  store = createStore(rootReducers, initialState),
  initialEntries = ['/'],
  history = createMemoryHistory({ initialEntries }),
} = {}) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),
  store,
  history,
});

describe('testa componente Footer', () => {
  it('deve renderizar o componente Footer', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />);
    const footerElement = getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
  it('deve conter os links para drinks, explore e food', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />);
    const drinksLink = getByTestId('drinks-bottom-btn');
    const exploreLink = getByTestId('explore-bottom-btn');
    const foodLink = getByTestId('food-bottom-btn');
    expect(drinksLink).toBeInTheDocument();
    expect(exploreLink).toBeInTheDocument();
    expect(foodLink).toBeInTheDocument();
  });
  it('ao clicar em drink direciona para a pagina correta', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />);
    const drinksLink = getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksLink);
    expect(window.location.pathname).toBe('/bebidas');
  });
  it('ao clicar em explore direciona para a pagina correta', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />);
    const exploreLink = getByTestId('explore-bottom-btn');
    fireEvent.click(exploreLink);
    expect(window.location.pathname).toBe('/explorar');
  });
  it('ao clicar em food direciona para a pagina correta', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />);
    const foodLink = getByTestId('food-bottom-btn');
    fireEvent.click(foodLink);
    expect(window.location.pathname).toBe('/comidas');
  });
});
