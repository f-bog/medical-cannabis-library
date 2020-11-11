import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import hybrid from '../images/hybrid.png';
import indica from '../images/indica.png';
import sativa from '../images/sativa.png';
import styled from 'styled-components';

const SelectType = styled(animated.div)`
  display: flex;
  justify-content: center;
  background: #e2f0e8;
  width: 100px;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  img {
    width: 30px;
    transition: transform 200ms ease-in;
  }
  button {
    background: none;
    border: none;
    padding: 5px 15px;
    cursor: pointer;
    &:hover {
      img {
        transform: rotate(20deg);
      }
    }
  }

  span {
  }
`;

const TypeSearch = ({ setStrains, setIsLoading }) => {
  const [type, setType] = useState('hybrid');
  const [active, setActive] = useState(false);
  const springWidth = useSpring({
    width: active ? '200px' : '150px',
    transform: active ? 'scale(1.1)' : 'scale(1.0)',
  });
  const springText = useSpring({
    opacity: active ? 1 : 0,
    display: active ? 'block' : 'none',
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(false);
      const data = await axios(
        `http://strainapi.evanbusse.com/Snkt69a/strains/search/race/${type}`
      );
      const res = data;
      console.log(res.data);
      setIsLoading(true);
      setStrains(res.data);
    }
    fetchData();
  }, [type, setStrains, setIsLoading]);

  const changeTypeHandler = e => {
    setType(e.currentTarget.value);
  };

  return (
    <>
      <SelectType
        style={springWidth}
        onMouseOver={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <button value='sativa' onClick={changeTypeHandler}>
          <img src={sativa} alt='sativa' />
          <animated.span style={springText}>sativa</animated.span>
        </button>
        <button value='hybrid' onClick={changeTypeHandler}>
          <img src={hybrid} alt='hybrid' />
          <animated.span style={springText}>hybrid</animated.span>
        </button>
        <button value='indica' onClick={changeTypeHandler}>
          <img src={indica} alt='indica' />
          <animated.span style={springText}>indica</animated.span>
        </button>
      </SelectType>
    </>
  );
};

export default TypeSearch;
