import React, { useEffect, useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import { fetchAll } from './utils/fetchUtils';
import { API_RESOURCES } from './constants';
import reducer from './reducer'
import AppStateContext, { initialAppState } from './context'
import CharacterListerPage from './pages/CharacterListerPage';
import CharacterDetails from './pages/CharacterDetailsPage';
import './App.css';


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialAppState);

  useEffect(() => {
    // progressively set characters to state (page by page)
    fetchAll({
      url: API_RESOURCES.charactersDev,
      cb: (data) => dispatch({ type: 'ADD_CHARACTERS', payload: data })
    })

    // progressively set books to state
    fetchAll({
      url: API_RESOURCES.books,
      cb: (data) => dispatch({ type: 'ADD_BOOKS', payload: data })
    })

    // progressively set houses to state
    fetchAll({
      url: API_RESOURCES.houses,
      cb: (data) => dispatch({ type: 'ADD_HOUSES', payload: data })
    })
  }, []);

  return (
    <React.Fragment>
      <header className='app-header'>
      </header>
      <AppStateContext.Provider value={{ ...state, dispatch }}>
        <Switch>
          <Route path='/' exact>
            <CharacterListerPage/>
          </Route>
          <Route path='/:characterId'>
            <CharacterDetails/>
          </Route>
        </Switch>
      </AppStateContext.Provider>
    </React.Fragment>
  );
}


export default App;
