import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import { searchById } from '../services';
import DetailsRecipe from '../components/DetailsRecipe';
// import Loading from '../components/Loading';
import trybeCook from '../images/trybe_cook.svg';
import '../styles/Detalhes.css';

function Detalhes(props) {
  const { match } = props;
  const { params: { id } } = match;
  const [loading, setLoading] = useState(true);
  const [recipeData, setRecipeData] = useState([]);

  const handleFetchRequest = async () => {
    let response = [];
    if (match.path.includes('bebidas')) {
      response = await searchById(id, 'bebidas');
    }
    if (match.path.includes('comidas')) {
      response = await searchById(id, 'comidas');
    }
    setLoading(false);
    return response;
  };

  useEffect(() => {
    async function effectFetch() {
      const fetchRequest = await handleFetchRequest();
      setRecipeData(fetchRequest);
    }
    effectFetch();
  }, []);

  return (
    <div className="detalhes-container">
      { loading
        ? <img className="details-loading" src={ trybeCook } alt="trybe_cook" />
        : <DetailsRecipe recipeData={ recipeData } />}
    </div>
  );
}

export default Detalhes;

Detalhes.propTypes = {
  match: PropTypes.objectOf(object.PropTypes).isRequired,
};
