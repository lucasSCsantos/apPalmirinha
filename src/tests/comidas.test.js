import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

// ===============> DATA TEST ID's: <================
// const ALL = 'All-category-filter';
// const BEEF = 'Beef-category-filter';
// const BREAKFAST = 'Breakfast-category-filter';
// const CHICKEN = 'Chicken-category-filter';
// const DESSERT = 'Dessert-category-filter';
// const GOAT = 'Goat-category-filter';

describe('testa pagina de login', () => {
  it('Verifica se renderiza o botão de filtro -> All', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');
    console.log(window.location.pathname);
  });
});
