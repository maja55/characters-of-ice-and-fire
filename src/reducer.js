const reducer = (state, { type, payload }) => {
  const newState = Object.assign({}, state);

  switch (type) {
    case 'ADD_CHARACTERS':
      const newCharacters = new Map(payload.map(character => [character.url, character]))
      newState.characters = new Map([...state.characters, ...newCharacters])
      break;
    case 'UPDATE_NEXT_PAGE':
      newState.nextPage = payload
      break;
    case 'ADD_BOOKS':
      const newBooks = new Map(payload.map(({ url, name }) => [url, { name }]))
      newState.books = new Map([...state.books, ...newBooks])
      break;
    case 'ADD_HOUSES':
      const newHouses = new Map(payload.map(({ url, name }) => [url, { name }]))
      newState.houses = new Map([...state.houses, ...newHouses])
      break;
    case 'ADD_CHARACTER':
      newState.characters.set(payload.url, payload.data)
      break;
    case 'ADD_HOUSE':
      newState.houses.set(payload.url, payload.data)
      break;
    case 'ADD_BOOK':
      newState.books.set(payload.url, payload.data)
      break;
    case 'SET_FILTER':
      newState.activeFilter = payload
      break;
    case 'RESET_FILTER':
      newState.activeFilter = undefined
      break;
    case 'ADD_CHARACTER_PICTURE':
      const character = newState.characters.get(payload.url)
      character['picture'] = payload.picture
      newState.characters.set(payload.url, character)
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
