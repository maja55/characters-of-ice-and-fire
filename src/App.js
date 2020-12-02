import React, { useEffect, useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import { fetchApi, fetchAll } from './utils/fetchUtils';
import { API_RESOURCES } from './constants';
import reducer from './reducer'
import AppStateContext, { initialAppState } from './context'
import CharacterListerPage from './pages/CharacterListerPage';
import CharacterDetails from './pages/CharacterDetailsPage';


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialAppState);

  useEffect(() => {
    // load first page of characters and set next page url to state
    fetchApi({
      url: API_RESOURCES.characters,
      cb: (data, nextUrl) => {
        dispatch({ type: 'ADD_CHARACTERS', payload: data })
        dispatch({ type: 'UPDATE_NEXT_PAGE_URL', payload: nextUrl })
      }
    })

    // progressively load all books to state (page by page)
    fetchAll({
      url: API_RESOURCES.books,
      cb: (data) => dispatch({ type: 'ADD_BOOKS', payload: data })
    })
  }, []);

  return (
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
  );
}


export default App;
