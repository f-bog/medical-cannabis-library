import React from 'react';
import styled from 'styled-components';
const WordSearch = ({ searchTerm, setSearchTerm }) => {
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  return (
    <StyledInput
      type='search'
      name='search'
      value={searchTerm}
      id='search'
      onChange={handleChange}
      placeholder='search for a strain'
    />
  );
};

const StyledInput = styled.input`
  background: #e2f0e8;
  margin-top: 10px;
  border: none;
  height: 50px;
  padding: 10px;
  width: 270px;
  border-radius: 10px;
  font-size: 1.5rem;
  color: #707070;
`;
export default WordSearch;
