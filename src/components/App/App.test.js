import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import { fetchMovies } from '../../api/api'; 

jest.mock('../../api/api');

const mockReponse = {
  "Search": [{
    "Title": "Avengers: Infinity War", 
    "Year": "2018", 
    "imdbID": "tt4154756", 
    "Type": "movie", 
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg" 
  }],
  "totalResults": "3964",
  "Response": "True"
};

beforeEach(() => {
  fetchMovies.mockResolvedValueOnce(Promise.resolve(mockReponse));
});

test('renders loading first, then movies', async () => {
  const { getByText } = render(<App />);
  
  expect(getByText(/loading/i)).toBeTruthy();
  expect(fetchMovies).toHaveBeenCalledTimes(1);
  await waitForElementToBeRemoved(() => getByText(/loading/i));
  expect(getByText(/Avengers/i)).toBeTruthy();
});
