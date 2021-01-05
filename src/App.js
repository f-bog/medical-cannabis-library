import React from 'react';
import MainScreen from './screens/MainScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StrainScreen from './screens/StrainScreen';
import './App.css';
function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact>
            <MainScreen />
          </Route>
          <Route
            basename='/'
            path='/strains/:race/:name/:id'
            component={StrainScreen}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
