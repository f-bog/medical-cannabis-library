import React, { useState, useEffect } from 'react';
import TypeSearch from '../components/TypeSearch';
import StrainListItem from '../components/StrainListItem';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import Spinner from '../components/Spinner';
import WordSearch from '../components/WordSearch';

import strainIcon from '../util/strainIcon';

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

  const icon = strainIcon(type);
  return (
    <MainContainer>
      <header>
        <div className='control'>
          <h1>Medical Cannabis Library</h1>
          <div>
            <TypeSearch
              setType={setType}
              type={type}
              setStrains={setStrains}
              setIsLoading={setIsLoading}
            />
            <WordSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          </div>
          <div>
            <p style={{ fontSize: '1.3rem' }}>
              <strong>Strain Type:</strong>{' '}
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <img width='35px' src={icon} alt={type} />
            </p>
            {isLoading ? (
              <p style={{ color: '#a5d0b7' }}>
                Results: {searchResults.length} out of {strains.length}
              </p>
            ) : (
              <p style={{ color: '#a5d0b7' }}>Loading...</p>
            )}
          </div>
        </div>
      </header>

      {isLoading ? (
        <List
          className='List'
          height={300}
          itemCount={searchResults.length}
          itemSize={130}
          itemData={searchResults}
        >
          {StrainListItem}
        </List>
      ) : (
        <Spinner icon={icon} />
      )}
    </MainContainer>
  );
};

const MainContainer = styled.main`
  margin: 0 auto;
  overflow: hidden;
  header {
    width: 100%;
  }
  .control {
    margin: 0 auto;
    width: 650px;
    ${'' /* width: 100%; */}
  }
  color: #707070;
  @media only screen and (max-width: 716px) {
    .control {
      width: 90%;
    }
  }

  .List {
    max-width: 700px !important;
    margin: 30px auto;
    padding: 30px 0px;
  }
`;

// -ms-overflow-style: none; /* Internet Explorer 10+ */
// scrollbar-width: none; /* Firefox */
// &::-webkit-scrollbar {
//   /* WebKit */
//   display: none;
// }

export default MainScreen;
