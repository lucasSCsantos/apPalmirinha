// import React from 'react';
// import { fireEvent, render } from '@testing-library/react';
// import renderWithRouter from '../helpers/renderWithRouter';

// import Login from '../components/Login';
// import Comidas from '../pages/Comidas';
// import Bebidas from '../components/Bebidas';
// import Explorar from '../components/Explorar';
// import Header from '../components/Header';

// describe('testa componente Header', () => {
//   const profileDataTestId = 'profile-top-btn';
//   const pageTitleDataTestId = 'page-title';
//   const searchButtonDataTestId = 'search-top-btn';

//   it('testa não tem header na tela de login', () => {
//     const { container } = render(<Login />);
//     expect(container.querySelector('.header')).not.toBeInTheDocument();
//   });
//   it(`testa se header tem os ícones corretos
//   na tela de principal de receitas de comidas`, () => {
//     const { getByTestId } = renderWithRouter(<Comidas />);

//     const profileLink = getByTestId(profileDataTestId);
//     expect(profileLink).toBeInTheDocument();
//     const pageTitle = getByTestId(pageTitleDataTestId);
//     expect(pageTitle).toBeInTheDocument();
//     const searchButton = getByTestId(searchButtonDataTestId);
//     expect(searchButton).toBeInTheDocument();
//   });
//   it('testa se o Header renderiza dentro da rota bebidas', () => {
//     const { getByTestId } = renderWithRouter(<Bebidas />);

//     const profileLink = getByTestId(profileDataTestId);
//     expect(profileLink).toBeInTheDocument();
//     const pageTitle = getByTestId(pageTitleDataTestId);
//     expect(pageTitle).toBeInTheDocument();
//     const searchButton = getByTestId(searchButtonDataTestId);
//     expect(searchButton).toBeInTheDocument();
//   });
//   it('testa se o Header renderiza dentro da rota bebidas', () => {
//     const { getByTestId } = renderWithRouter(<Explorar />);

//     const profileLink = getByTestId(profileDataTestId);
//     expect(profileLink).toBeInTheDocument();
//     const pageTitle = getByTestId(pageTitleDataTestId);
//     expect(pageTitle).toBeInTheDocument();
//   });
//   it('ao clicar no botão de perfil direciona para a pagina correta', () => {
//     const { getByTestId } = renderWithRouter(<Header />);

//     const profileLink = getByTestId(profileDataTestId);
//     fireEvent.click(profileLink);
//     expect(window.location.pathname).toBe('/perfil');
//   });
// });
