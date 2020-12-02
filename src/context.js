import React from 'react';
import { API_RESOURCES } from './constants'

export const initialAppState = {
  characters: new Map(),
  houses: new Map(),
  books: new Map(),
  nextUrl: API_RESOURCES.characters
}

const Context = React.createContext({
  state: initialAppState,
  dispatch: null
});

export default Context;
