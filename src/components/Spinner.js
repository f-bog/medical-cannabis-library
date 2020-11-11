import React from 'react';

import styled, { keyframes } from 'styled-components';
import sativa from '../images/sativa.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const AnimatedSpinner = styled.img`
  display: block;
  height: 100px;
  margin: 0 auto;
  animation: ${rotate} 2s linear infinite;
`;

const Spinner = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <AnimatedSpinner src={sativa} alt='spinner' />
      <p>Loading...</p>
    </div>
  );
};

export default Spinner;
