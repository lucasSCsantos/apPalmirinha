import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import '../styles/ExplorarPorIngredientes.css';
import Header from '../components/Header';
import { fetchIngredientsList } from '../services';
import IngredientCard from '../components/IngredientCard';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

export default function ExplorarPorIngredientes() {
  const NUMBER_OF_CARDS = 12;
  const [listIngredients, setListIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchIngredients = async () => {
      setIsLoading(true);
      const { pathname } = location;
      const response = await fetchIngredientsList(pathname);
      setListIngredients(response);
      setIsLoading(false);
      return listIngredients;
    };
    fetchIngredients();
  }, []);

  return (
    <div className="container-page-ingredients">
      <Header title="Explorar Ingredientes" />
      <div className="container-card-ingredients">
        { isLoading ? <Loading />
          : listIngredients.slice(0, NUMBER_OF_CARDS).map((ingredient, index) => (
            <IngredientCard
              key={ index }
              ingredient={ ingredient }
              index={ index }
              location={ location }
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}
