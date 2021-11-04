import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { searchRecommendation } from '../services';
import '../styles/Recommendations.css';
import RecommendationCard from './RecommendationCard';

export default function Recommendations() {
  const START_POSITION = 0;
  const CHANGER = 295;
  const MULTIPLIER = 2;
  const SIX = 6;

  const { pathname } = useLocation();
  const [recommendation, setRecommendations] = useState([]);
  const [number, setNumber] = useState(START_POSITION);
  const [item, setItem] = useState(0);
  const type = pathname.includes('comidas') ? 'drinks' : 'meals';

  useEffect(() => {
    const getRecommendation = async () => {
      const location = pathname.includes('bebidas') ? 'bebidas' : 'comidas';
      const list = await searchRecommendation(location);
      setRecommendations(list);
    };
    getRecommendation();
  }, []);

  useEffect(() => {
    if (item < SIX) {
      setItem(number/147.5*-1);
    }
    const changeRecommendation = () => {
      const carroussel = document.querySelector('.carroussel-content');
      const firstItem = document.querySelector(`.carroussel-item-${item}`);
      const secItem = document.querySelector(`.carroussel-item-${item + 1}`);

      if (firstItem !== null) {
        firstItem.style.display = 'block';
        secItem.style.display = 'block';
      }

      carroussel.style.transform = `translateX(${number}px)`;
    };

    changeRecommendation();
  }, [number, item]);

  return (
    <div className="recommendation-container">
      <h3 className="recommendation-title">Recomendadas</h3>
      <div className="recommendation-carroussel">
        <label htmlFor="right">
          <input
            type="button"
            className="arrow-r"
            id="right"
            onClick={ () => {
              if (number < 0) setNumber(number + CHANGER);
            } }
          />
        </label>
        <div className="carroussel-content">
          {recommendation && recommendation.slice(0, SIX).map((rec, index) => (
            <div
              key={ index }
              className={ `carroussel-item carroussel-item-${index}` }
              data-testid={ `${index}-recomendation-card` }
            >
              <RecommendationCard
                type={ type }
                recipe={ rec }
                index={ index }
              />
            </div>
          ))}
        </div>
        <label htmlFor="left">
          <input
            type="button"
            id="left"
            className="arrow-l"
            onClick={ () => {
              // click();

              if (number > -CHANGER * MULTIPLIER) setNumber(number - CHANGER);
              // if (item < FIVE) setItem(item + 2);
            } }
          />
        </label>
      </div>
    </div>
  );
}
