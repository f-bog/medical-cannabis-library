import React, { useState, useEffect } from 'react';
import useActive from '../hooks/useActive';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import styled from 'styled-components';
import hybrid from '../images/hybrid.png';
import indica from '../images/indica.png';
import sativa from '../images/sativa.png';
import Spinner from '../components/Spinner';

const GoBack = styled(animated.div)`
  width: 100px;
  height: 50px;

  a {
    height: 100%;
    width: 100%;
    display: block;
    margin-bottom: 20px;
    font-weight: 900;
    font-size: 1.2rem;
    text-decoration: none;
    color: #707070;
    z-index: 1000;
  }
`;
const StrainContainer = styled.main`
  margin: 50px auto;
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  aling-items: center;
`;

const StrainMain = styled.main`
  border-radius: 50px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12), 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  width: 100%;
  margin: 0 auto;

  h1,
  h2 {
    color: black;
  }
  p {
    font-size: 0.9rem;
  }
  .description {
    color: #707070;
  }
  .info-container {
    width: 65%;
    padding: 4rem;
  }
  .image-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 45%;
    background: #e2f0e8;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    img {
      width: 70%;
    }
    .plant-info {
      h1 {
        font-size: 2rem;
        color: #707070;
      }
      p {
        font-size: 1.2rem;
        font-weight: 900;
      }
      position: absolute;
      top: 10px;
      left: 1.5rem;
      color: #707070;
    }
  }
  .info {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  @media only screen and (max-width: 992px) {
    flex-direction: column;
    .image-container {
      width: 100%;
      border-top-right-radius: 50px;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 0px;
      img {
        width: 50%;
      }
      .plant-info {
        h1 {
          font-size: 1.5rem;
          color: #707070;
        }
        p {
          font-size: 1rem;
          font-weight: 900;
        }
        position: static;
        align-self: flex-start;

        padding-left: 1.5rem;
        color: #707070;
      }
    }
    .info-container {
      margin: 0 auto;
      width: 80%;
      padding: 2rem 0;
    }
    .info {
      width: 100%;
      align-items: center;

      justify-content: space-between;
    }
  }
`;

const StrainScreen = ({ match }) => {
  const [strainData, setData] = useState({});
  const [active, handleActive, handleDeactive] = useActive(false);
  const [isLoading, setIsLoading] = useState(true);

  // animations
  const springUp = useSpring({
    config: { duration: 150 },
    transform: active ? 'translateY(-5px)' : 'translateY(5px)',
  });

  useEffect(() => {
    setIsLoading(true);
    // fetch effects, description, and flavors from seperate urls
    async function getStrainData() {
      const [effects, desc, flavors] = await Promise.all([
        axios(
          `//strainapi.evanbusse.com/${process.env.REACT_APP_SECRET_KEY}/strains/data/effects/${match.params.id}`
        ),
        axios(
          `//strainapi.evanbusse.com/${process.env.REACT_APP_SECRET_KEY}/strains/data/desc/${match.params.id}`
        ),
        axios(
          `//strainapi.evanbusse.com/${process.env.REACT_APP_SECRET_KEY}/strains/data/flavors/${match.params.id}`
        ),
      ]);
      // format data into object
      setData({
        effects: {
          medical: effects.data.medical.join(', '),
          positive: effects.data.positive.join(', '),
          negative: effects.data.negative.join(', '),
        },
        ...desc.data,
        flavors: flavors.data.join(', '),
      });

      setIsLoading(false);
    }
    getStrainData();
  }, [match]);

  // check url for race type for image source
  const icon =
    match.params.race === 'hybrid'
      ? hybrid
      : match.params.race === 'sativa'
      ? sativa
      : indica;

  return !isLoading ? (
    <StrainContainer>
      <GoBack
        style={springUp}
        onMouseOver={handleActive}
        onMouseLeave={handleDeactive}
      >
        <Link to='/'>Go Back</Link>
      </GoBack>
      <StrainMain>
        <div className='image-container'>
          <div className='plant-info'>
            <p>#{match.params.id}</p>
            <h1>{match.params.name}</h1>
          </div>

          <img src={icon} alt={match.params.race} />
        </div>
        <div className='info-container'>
          <div className='description'>
            <h2>Description</h2>

            <p>{strainData.desc}</p>
          </div>
          <div className='info'>
            <h3>Type:</h3>
            <p>
              {match.params.race.charAt(0).toUpperCase() +
                match.params.race.slice(1)}
            </p>
          </div>
          <div className='info'>
            <h3>Flavors:</h3>
            <p>{strainData.flavors}</p>
          </div>
          <h2>Effects</h2>
          <div className='info'>
            <h3>Medical:</h3>
            <p>{strainData.effects.medical}</p>
          </div>
          <div className='info'>
            <h3>Positive:</h3>
            <p>{strainData.effects.positive}</p>
          </div>
          <div className='info'>
            <h3>Negative:</h3>
            <p>{strainData.effects.negative}</p>
          </div>
        </div>
      </StrainMain>
    </StrainContainer>
  ) : (
    <Spinner />
  );
};

export default StrainScreen;
