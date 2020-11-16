import React from 'react';

import styled, { keyframes } from 'styled-components';
import sativa from '../images/sativa.png';

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

const Spinner = () => {
  return (
    <div style={{ textAlign: 'center', alignSelf: 'center' }}>
      <AnimatedSpinner src={sativa} alt='spinner' />
    </div>
  );
};

export default Spinner;
