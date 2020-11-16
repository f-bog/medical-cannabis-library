import React from 'react';
import useActive from '../hooks/useActive';
import { useSpring, animated } from 'react-spring';

import { Link } from 'react-router-dom';
import hybrid from '../images/hybrid.png';
import indica from '../images/indica.png';
import sativa from '../images/sativa.png';
import styled from 'styled-components';

const StrainListItem = ({ index, style, data }) => {
  const [active, handleActive, handleDeactive] = useActive(false);

  // animations
  const springUp = useSpring({
    transform: active ? 'translateY(-5px)' : 'translateY(5px)',
    boxShadow: active
      ? `0px 16px 24px -21px #e2f0e8 , 0px 6px 30px 5px #e2f0e8 , 0px 8px 10px -7px #e2f0e8 `
      : `0px 2px 2px 0px #e2f0e8,
      0px 3px 1px -2px #e2f0e8, 0px 1px 5px 0px #e2f0e8`,
  });
  const springText = useSpring({
    opacity: active ? 1 : 0,
    transform: active ? 'translateY(-5px)' : 'translateY(5px)',
  });

  // check race for proper image source
  const icon =
    data[index].race === 'hybrid'
      ? hybrid
      : data[index].race === 'sativa'
      ? sativa
      : indica;

  return (
    <div style={style}>
      <ListItem
        style={springUp}
        onMouseOver={handleActive}
        onMouseLeave={handleDeactive}
      >
        <Link
          to={`/strains/${data[index].race}/${data[index].name}/${data[index].id}`}
        >
          <h3>{data[index].name}</h3>
          <div>
            <img src={icon} alt={data.race} />

            <animated.span style={springText}>
              {data[index].race.charAt(0).toUpperCase() +
                data[index].race.slice(1)}
            </animated.span>
          </div>
        </Link>
      </ListItem>
    </div>
  );
};

const ListItem = styled(animated.div)`
  position: relative;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  max-width: 570px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 2px 2px 0px #e2f0e8, 0px 3px 1px -2px #e2f0e8,
    0px 1px 5px 0px #e2f0e8;
  padding: 0px 25px;
  margin-top: 25px;
  cursor: pointer;

  a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
  }
  img {
    width: 60px;
  }
  span {
    color: ${props =>
      props.race === 'hybrid'
        ? '#0ECC30'
        : props.race === 'indica'
        ? '#00AD45'
        : '#00CF73'};
  }
`;

export default StrainListItem;
