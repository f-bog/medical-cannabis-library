import React from 'react';
import styled from 'styled-components';
import hybrid from '../images/hybrid.png';
import indica from '../images/indica.png';
import sativa from '../images/sativa.png';

const ListItem = styled.div`
  display: flex;
  max-width: 500px;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
  padding: 0px 25px;
  margin-top: 25px;
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
const StrainListItem = ({ name, race }) => {
  const icon = race === 'hybrid' ? hybrid : race === 'sativa' ? sativa : indica;
  return (
    <ListItem>
      <h3>{name}</h3>
      <div>
        <img src={icon} alt={race} />
        <span>{race}</span>
      </div>
    </ListItem>
  );
};

export default StrainListItem;
