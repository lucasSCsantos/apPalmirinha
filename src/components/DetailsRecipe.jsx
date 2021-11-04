import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Ingredients from './Ingredients';
import Share from '../images/shareIcon.svg';
import handleShareBtn from '../helpers/handleShareBtn';
import LinkCopy from './LinkCopy';
import Arrow from '../images/left-arrow-next-svgrepo-com.svg';
import '../styles/DetailsRecipe.css';
import ButtonStartRecipe from './ButtonStartRecipe';
import ButtonFavoriteRecipe from './ButtonFavoriteRecipe';
import Recommendations from './Recommendations';

function DetailsRecipe(props) {
  const { recipeData } = props;
  const {
    ingredients,
    ingredientsQuantity,
    imgUrl,
    instructions,
    title,
    category,
    strAlcoholic,
    video,
    id,
  } = recipeData;
  const [favorite, setFavorite] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (getFavorite && getFavorite.some((recipe) => recipe.id === id)) {
      setFavorite(true);
    }
  }, [id]);

  const videoParameter = -11;
  const finalUrl = video && video.slice(videoParameter);

  const [linkCopy, setLinkCopy] = useState(false);

  const handleLinkMessage = () => {
    setLinkCopy(true);
  };

  return (
    <div className="details-container">
      <header className="details-header">
        <Link
          to={ pathname.includes('bebidas') ? '/bebidas' : '/comidas' }
          className="arrow-bg"
        >
          <img src={ Arrow } alt="arrow-left" className="arrow" />
        </Link>
        <h1 data-testid="recipe-category">{ !strAlcoholic ? category : strAlcoholic}</h1>
        <ButtonFavoriteRecipe
          setFavorite={ setFavorite }
          favorite={ favorite }
          recipes={ recipeData }
        />
      </header>
      <div className="details-content">
        <img
          src={ imgUrl }
          alt={ title }
          className="recipe-img"
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title" className="recipe-title">{ title }</h2>
        <Ingredients
          ingredients={ ingredients }
          ingredientsQuantity={ ingredientsQuantity }
        />
        <h3 className="instructions-title">Instructions</h3>
        <p data-testid="instructions" className="instructions">{ instructions }</p>
        <button
          type="button"
          data-testid="share-btn"
          className="share-btn"
          onClick={ () => { handleShareBtn(); handleLinkMessage(); } }
        >
          <img src={ Share } alt="share button" />
        </button>
        { linkCopy && <LinkCopy /> }
        { video && <iframe
          width="295"
          height="215"
          src={ `https://www.youtube.com/embed/${finalUrl}` }
          title="YouTube video player"
          frameBorder="0"
          data-testid="video"
          allowFullScreen
          className="video"
        /> }
        <Recommendations />
        <ButtonStartRecipe
          id={ id }
          recipeData={ recipeData }
        />
      </div>
    </div>
  );
}

export default DetailsRecipe;

DetailsRecipe.propTypes = {
  recipeData: PropTypes.objectOf(String),
}.isRequired;
