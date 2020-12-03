import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';
import { API_RESOURCES } from './constants'

const fetchUtils = require('./utils/fetchUtils')


describe('App', () => {
  afterEach(() => {
      jest.clearAllMocks();
  });

  it('fetches all books on mount', () => {
    const fetchAllSpy = jest.spyOn(fetchUtils, 'fetchAll')
  
    act(() => { render(<BrowserRouter><App/></BrowserRouter>) })

    expect(fetchAllSpy).toHaveBeenCalledTimes(1)
    expect(fetchAllSpy).toHaveBeenCalledWith({
      url: API_RESOURCES.books,
      cb: expect.any(Function)
    })
  })

  it('fetches and loads first 20 characters', async () => {
    act(() => { render(<BrowserRouter><App/></BrowserRouter>) })

    await waitFor(() => screen.getByTestId('characters-list'))

    expect(screen.getAllByTestId('character-card')).toHaveLength(20)
  })

  // ...
})
