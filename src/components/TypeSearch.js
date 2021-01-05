import React, { useEffect } from 'react';
import useActive from '../hooks/useActive';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import hybrid from '../images/hybrid.png';
import indica from '../images/indica.png';
import sativa from '../images/sativa.png';
import styled from 'styled-components';

const TypeSearch = ({ setStrains, setIsLoading, type, setType }) => {
  const [active, handleActive, handleDeactive] = useActive(false);
  //  animations
  const springWidth = useSpring({
    width: active ? '300px' : '250px',
  });

  const springText = useSpring({
    opacity: active ? 1 : 0,
    display: active ? 'block' : 'none',
    transform: active ? 'translateY(0px)' : 'translateY(10px)',
  });
  // fetch data based on race type
  useEffect(() => {
    async function fetchData() {
      setIsLoading(false);
      const data = await axios(
        `https://strain-api-proxy.herokuapp.com/api/v1/strain-${type}`
      );
      const res = data;
      setIsLoading(true);
      setStrains(res.data);
    }
    fetchData();
  }, [type, setStrains, setIsLoading]);

  //  change type
  const changeTypeHandler = e => {
    setType(e.currentTarget.value);
  };

  return (
    <SelectType
      style={springWidth}
      onMouseOver={handleActive}
      onMouseLeave={handleDeactive}
    >
      <button value='sativa' onClick={changeTypeHandler}>
        <img src={sativa} alt='sativa' />
        <animated.span style={springText}>Sativa</animated.span>
      </button>
      <button value='hybrid' onClick={changeTypeHandler}>
        <img src={hybrid} alt='hybrid' />
        <animated.span style={springText}>Hybrid</animated.span>
      </button>
      <button value='indica' onClick={changeTypeHandler}>
        <img src={indica} alt='indica' />
        <animated.span style={springText}>Indica</animated.span>
      </button>
    </SelectType>
  );
};

const SelectType = styled(animated.div)`
  display: flex;
  justify-content: center;
  background: #e2f0e8;

  height: 80px;
  padding: 10px;
  border-radius: 10px;
  img {
    width: 50px;
    transition: transform 200ms ease-in;
  }
  button {
    background: none;
    border: none;
    padding: 5px 15px;
    cursor: pointer;
    &:hover,
    &:focus {
      outline: none;
      img {
        transform: rotate(20deg);
      }
    }
  }

  span {
    font-size: 1rem;
    color: #707070;
  }
  @media only screen and (max-width: 992px) {
    width: 90%;
  }
`;

export default TypeSearch;
