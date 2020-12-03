import reducer from './reducer';
import { initialAppState } from './context'
import { books } from './mocks/__data__/books.json'
import { characters } from './mocks/__data__/characters.json'
import { houses } from './mocks/__data__/houses.json'

const mockFilter = { type: 'books', key: 'test' }
const mockPictureUrl = 'https://test_picture_url'


describe('reducer', () => {
  describe('Default state', () => {
    test('should provide a specific default state if action type not found', () => {
      const state = reducer(initialAppState, {
        type: 'UNREGISTERED_ACTION',
        payload: 'random payload'
      });
      expect(state).toEqual(initialAppState);
    });
  });

  describe('ADD_BOOKS', () => {
    test('should map received books and update state', () => {
      const state = reducer(initialAppState, {
        type: 'ADD_BOOKS',
        payload: books
      });
      expect(state.books).toEqual(new Map(books.map(({ url, name }) => [url, { name }])));
    });
  });

  describe('ADD_CHARACTERS', () => {
    test('should map received characters and update state', () => {
      const state = reducer(initialAppState, {
        type: 'ADD_CHARACTERS',
        payload: characters
      });
      expect(state.characters).toEqual(new Map(characters.map((character => [character.url, character]))));
      expect(state.characters.size).toBe(characters.length);
    });
  });

  describe('ADD_CHARACTER', () => {
    test('should add received character to state', () => {
      const state = reducer(initialAppState, {
        type: 'ADD_CHARACTER',
        payload: { url: characters[0].url, data: characters[0] }
      });
      expect(state.characters.size).toBe(1);
      expect(state.characters.get(characters[0].url)).toEqual(characters[0]);

      const newState = reducer(state, {
        type: 'ADD_CHARACTER',
        payload: { url: characters[1].url, data: characters[1] }
      });
      expect(newState.characters.size).toBe(2);
      expect(newState.characters.get(characters[1].url)).toEqual(characters[1]);
    });
  });

  describe('ADD_CHARACTER_PICTURE', () => {
    test('should add picture url property to character object', () => {
      const state = reducer(initialAppState, {
        type: 'ADD_CHARACTER',
        payload: { url: characters[0].url, data: characters[0] }
      });

      expect(state.characters.get(characters[0].url)).not.toHaveProperty('picture');

      const newState = reducer(initialAppState, {
        type: 'ADD_CHARACTER_PICTURE',
        payload: { url: characters[0].url, picture: mockPictureUrl }
      });

      expect(newState.characters.get(characters[0].url)).toHaveProperty('picture');
      expect(newState.characters.get(characters[0].url).picture).toEqual(mockPictureUrl);
    });
  });

  describe('ADD_HOUSE', () => {
    test('should add received house resource to state', () => {
      const state = reducer(initialAppState, {
        type: 'ADD_HOUSE',
        payload: { url: houses[0].url, data: houses[0] }
      });
      expect(state.houses.size).toBe(1);
      expect(state.houses.get(houses[0].url)).toEqual(houses[0]);

      const newState = reducer(state, {
        type: 'ADD_HOUSE',
        payload: { url: houses[1].url, data: houses[1] }
      });
      expect(newState.houses.size).toBe(2);
      expect(newState.houses.get(houses[1].url)).toEqual(houses[1]);
    });
  });

  describe('SET_FILTER', () => {
    test('should set provided filter to state', () => {
      const state = reducer(initialAppState, {
        type: 'SET_FILTER',
        payload: mockFilter
      });
      expect(state.activeFilter).toBe(mockFilter);
    });
  });

  describe('RESET_FILTER', () => {
    test('should remove active filter', () => {
      const state = reducer({
        ...initialAppState,
        activeFilter: mockFilter
      }, {
        type: 'RESET_FILTER',
        payload: mockFilter
      });
      expect(state.activeFilter).toBeUndefined();
    });
  });
});