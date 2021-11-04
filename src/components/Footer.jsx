import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const { setCurrentCategory, setIngredient } = useContext(RecipesContext);
  const { pathname } = useLocation();
  useEffect(() => {
    const sel = document.querySelector('.selection');
    if (pathname === '/bebidas') {
      sel.style.transform = 'translateX(-120px)';
    } else if (pathname === '/explorar') {
      sel.style.transform = 'translateX(0px)';
    } else if (pathname === '/comidas') {
      sel.style.transform = 'translateX(120px)';
    }
  }, [pathname]);

  const changeStyle = (target) => {
    const { className } = target;
    const sel = document.querySelector('.selection');
    if (className === 'link-bebidas') {
      sel.style.transform = 'translateX(-120px)';
    } else if (className === 'link-explorar') {
      sel.classList.add('seletcion-start');
    } else if (className === 'link-comidas') {
      sel.style.transform = 'translateX(120px)';
    }
  };

  return (
    <footer data-testid="footer" className="footer">
      <div className="selection" />
      <Link
        to="/bebidas"
        className="link-bebidas"
        onClick={ ({ target }) => {
          changeStyle(target);
          setCurrentCategory('All');
          setIngredient(null);
        } }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
          className="link-bebidas"
        />
      </Link>
      <Link
        to="/explorar"
        onClick={ ({ target }) => {
          changeStyle(target);
          setCurrentCategory('All');
        } }
        className="link-explorar"

      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore icon"
          className="link-explorar"
        />
      </Link>
      <Link
        to="/comidas"
        className="link-comidas"
        onClick={ ({ target }) => {
          setCurrentCategory('All');
          changeStyle(target);
          setIngredient(null);
        } }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal-icon"
          className="link-comidas"
        />
      </Link>
    </footer>
  );
}

export default Footer;
