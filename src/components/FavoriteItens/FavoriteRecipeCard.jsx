import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareImage from '../../images/shareIcon.svg';

import '../../styles/FavoriteRecipeCard.css';
import LinkCopy from '../LinkCopy';
import ButtonFavoriteRecipe from '../ButtonFavoriteRecipe';

function FavoriteRecipeCard({ recipe, index, setRender }) {
  const history = useHistory();
  const [linkCopy, setLinkCopy] = useState(false);
  const [favorite, setFavorite] = useState(true);
  const { id,
    type,
    area,
    category,
    alcoholicOrNot,
    image,
    name } = recipe;

  useEffect(() => {
    console.log('favorite:', favorite);
    if (!favorite) setRender(true);
  }, [favorite]);

  const HandleRedirect = (recipeId) => {
    if (type === 'comida') history.push(`comidas/${recipeId}`);
    if (type === 'bebida') history.push(`bebidas/${recipeId}`);
  };

  const handleShareBtn = (recipeType, recipeId) => {
    const hostURL = window.location.origin;
    if (recipeType === 'comida') {
      navigator.clipboard.writeText(`${hostURL}/comidas/${recipeId}`);
    }
    if (recipeType === 'bebida') {
      navigator.clipboard.writeText(`${hostURL}/bebidas/${recipeId}`);
    }
    return <LinkCopy />;
  };

  const handleLinkMessage = () => {
    setLinkCopy(true);
  };

  return (
    <div className="FavoriteRecipeCardContainer">
      <img
        className="FavoriteRecipeImage"
        src={ image }
        alt="Recipe"
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => HandleRedirect(id) }
        aria-hidden="true"
      />
      <div className="RecipeFavoriteInfoContainer">
        <div className="RecipeFavoriteNameInfo">
          <span data-testid={ `${index}-horizontal-top-text` }>
            { type === 'comida' ? area : '' }
            { ' - ' }
            { type === 'comida' ? category : alcoholicOrNot }
          </span>
          <p
            className=""
            data-testid={ `${index}-horizontal-name` }
            onClick={ () => HandleRedirect(id) }
            aria-hidden="true"
          >
            { name }
          </p>
        </div>
        <div className="FavoriteRecipeButtonsContainer">
          <button
            className="FavoriteRecipeShareButton"
            type="button"
            onClick={ () => { handleShareBtn(type, id); handleLinkMessage(); } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareImage }
              alt="Compartilhar"
            />
          </button>
          <ButtonFavoriteRecipe
            setFavorite={ setFavorite }
            favorite={ favorite }
            recipes={ recipe }
            index={ index }
          />
        </div>
      </div>
      { linkCopy && <LinkCopy /> }
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(String),
  index: PropTypes.number,
}.isRequired;

export default FavoriteRecipeCard;
