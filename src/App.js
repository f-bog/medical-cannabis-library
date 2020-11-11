import React, { useState } from 'react';

import './App.css';
import TypeSearch from './components/TypeSearch';
import StrainListItem from './components/StrainListItem';
import Spinner from './components/Spinner';
function App() {
  const [strains, setStrains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(strains);
  return (
    <div className='App'>
      <h1>Cannabis Doctor</h1>
      <TypeSearch setStrains={setStrains} setIsLoading={setIsLoading} />
      <div>
        {isLoading ? (
          strains.map(strain => <StrainListItem key={strain.id} {...strain} />)
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default App;
