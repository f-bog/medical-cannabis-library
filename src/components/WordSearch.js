import React from 'react';
import styled from 'styled-components';
import useActive from '../hooks/useActive';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const WordSearch = ({ searchTerm, setSearchTerm }) => {
  const [active, handleActive, handleDeactive] = useActive(false);
  const springWidth = useSpring({
    width: active ? '270px' : '220px',
  });
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  return (
    <InputContainer style={{ display: 'flex' }}>
      <FontAwesomeIcon className='icon' icon={faSearch} size='lg' />

      <Input
        style={springWidth}
        onFocus={handleActive}
        onBlur={handleDeactive}
        // onMouseEnter={handleActive}
        // onMouseLeave={handleDeactive}
        type='search'
        name='search'
        value={searchTerm}
        id='search'
        onChange={handleChange}
        placeholder='Search for a name...'
      />
    </InputContainer>
  );
};

const InputContainer = styled(animated.div)`
  position: relative;
  background: #e2f0e8;
  margin-top: 10px;
  border: none;
  height: 50px;
  width: 70px;
  border-radius: 10px;
  font-size: 1.5rem;

  .icon {
    padding: 10px;
    color: #707070;
  }
`;

const Input = styled(animated.input)`
  position: absolute;
  display: block;
  left: 50px;
  font-size: 1.2rem;
  color: #707070;
  height: 50px;
  border: none;
  background: #e2f0e8;

  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  -webkit-border-top-left-radius: 0px;
  -webkit-border-bottom-left-radius: 0px;
  -webkit-border-top-right-radius: 10px;
  -webkit-border-bottom-right-radius: 10px;
`;

export default WordSearch;
