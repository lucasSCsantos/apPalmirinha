import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ShareIcon from '../images/shareIcon.svg';
import LinkCopy from './LinkCopy';

function ButtonShare({ recipe, index = 'default' }) {
  const { recipeType, recipeId } = recipe;
  const [linkCopy, setLinkCopy] = useState(false);
  const testId = index === 'default' ? 'share-btn' : `${index}-horizontal-share-btn`;

  const handleShareBtn = (foodType, id) => {
    const hostURL = window.location.origin;
    if (foodType === 'meals') {
      navigator.clipboard.writeText(`${hostURL}/comidas/${id}`);
    }
    if (foodType === 'cocktails') {
      navigator.clipboard.writeText(`${hostURL}/bebidas/${id}`);
    }
    return <LinkCopy />;
  };

  const handleLinkMessage = () => {
    setLinkCopy(true);
  };

  return (
    <div>
      <button
        style={ { width: '50px', height: '50px' } }
        type="button"
        onClick={ () => { handleShareBtn(recipeType, recipeId); handleLinkMessage(); } }
        className="share-btn"
        data-testid="share-btn"
      >
        <img
          aria-hidden="true"
          onClick={ () => { handleShareBtn(recipeType, recipeId); handleLinkMessage(); } }
          style={ { width: '50px', height: '50px' } }
          data-testid={ testId }
          src={ ShareIcon }
          alt="Share"
        />
      </button>
      { linkCopy && <LinkCopy /> }
    </div>
  );
}

ButtonShare.propTypes = {
  recipeId: PropTypes.string,
  recipeType: PropTypes.string,
}.isRequired;

export default ButtonShare;
