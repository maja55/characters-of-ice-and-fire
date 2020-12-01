import React from 'react';

export const initialAppState = {
  characters: new Map(),
  houses: new Map(),
  books: new Map()
}

const Context = React.createContext({
  state: initialAppState,
  dispatch: null
});

export default Context;
