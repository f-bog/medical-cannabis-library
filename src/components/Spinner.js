import React from 'react';
import styled, { keyframes } from 'styled-components';

const grow = keyframes`
  from {
    transform: scale(0.9);
  }

  to {
    transform: scale(2.5);
  }
`;

const AnimatedSpinner = styled.img`
  display: block;
  height: 100px;
  margin: 10px auto;
  align-self: center;
  animation: ${grow} 2s linear infinite;
`;

const Spinner = ({ icon }) => {
  return (
    <div style={{ display: 'flex', textAlign: 'center', height: '50vh' }}>
      <AnimatedSpinner src={icon} alt='loader' />
    </div>
  );
};

export default Spinner;
