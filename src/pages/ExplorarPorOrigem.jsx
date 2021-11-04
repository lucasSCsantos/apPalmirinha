import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { listAllAreas, searchByArea } from '../services';
import '../styles/ExplorarPorOrigem.css';

export default function ExplorarPorOrigem() {
  const [areasList, setAreasList] = useState([]);
  const [query, setQuery] = useState('all');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const NUMBER_OF_CARDS = 12;

  useEffect(() => {
    const getAllAreas = async () => {
      const areas = await listAllAreas();
      setAreasList(areas.meals);
    };

    getAllAreas();
  }, []);

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      const { meals } = await searchByArea(query);
      setLoading(false);
      setRecipes(meals);
    };

    getRecipes();
  }, [query]);

  return (
    <div className="origem-container">
      <Header title="Explorar Origem" showSearchIcon />
      <div className="origem-content">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => setQuery(target.value) }
        >
          <option
            data-testid="All-option"
            value="all"
          >
            All
          </option>
          { areasList && areasList.map((area, index) => (
            <option
              key={ index }
              data-testid={ `${area.strArea}-option` }
              value={ area.strArea }
            >
              { area.strArea }
            </option>
          ))}
        </select>
        <div className="origem-foods-container">
          { loading ? <Loading />
            : recipes.slice(0, NUMBER_OF_CARDS).map((recipe, index) => (
              <FoodCard
                key={ index }
                recipe={ recipe }
                index={ index }
              />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
