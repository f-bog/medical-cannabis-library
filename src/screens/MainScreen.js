import React, { useState, useEffect } from 'react';
import TypeSearch from '../components/TypeSearch';
import StrainListItem from '../components/StrainListItem';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import Spinner from '../components/Spinner';
import WordSearch from '../components/WordSearch';

const MainScreen = () => {
  const [strains, setStrains] = useState([]);
  const [type, setType] = useState('sativa');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // update search results
    const results = strains.filter(strain =>
      strain.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, strains]);

  return (
    <MainContainer>
      <div className='control'>
        <h1>Cannabis Doctor 🩺</h1>
        <TypeSearch
          setType={setType}
          type={type}
          setStrains={setStrains}
          setIsLoading={setIsLoading}
        />
        <WordSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        {isLoading ? (
          <>
            <p>
              <strong>results:</strong> {searchResults.length} out of{' '}
              {strains.length}
            </p>
            <p>
              <strong>Strain Type:</strong>{' '}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {isLoading ? (
        <List
          className='List'
          height={400}
          itemCount={searchResults.length}
          itemSize={130}
          itemData={searchResults}
        >
          {StrainListItem}
        </List>
      ) : (
        <Spinner />
      )}
    </MainContainer>
  );
};

const MainContainer = styled.main`
  margin: 0 auto;
  overflow: hidden;
  .control {
    margin: 0 auto;
    width: 75%;
    max-width: 650px;
  }
  color: #707070;
  @media only screen and (max-width: 600px) {
    .control {
      width: 90%;
    }
  }

  .List {
    max-width: 700px !important;
    margin: 30px auto;
    padding: 30px 0px;
    z-index: 10000;
  }
`;

// -ms-overflow-style: none; /* Internet Explorer 10+ */
// scrollbar-width: none; /* Firefox */
// &::-webkit-scrollbar {
//   /* WebKit */
//   display: none;
// }

export default MainScreen;
