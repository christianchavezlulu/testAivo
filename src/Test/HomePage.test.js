import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders loading state initially', () => {
    render(<HomePage />);
    
    // Step 1: Render the HomePage component

    // Step 2: Use the screen object from React Testing Library to get the loading element by its text
    const loadingElement = screen.getByText(/loading/i);

    // Step 3: Assert that the loading element is present in the component
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders movie data after loading', async () => {
    const fakeMovieData = {
      total: 2,
      entries: [
        { title: 'Movie 1', description: 'Description 1', programType: 'movie', releaseYear: 2021 },
        { title: 'Movie 2', description: 'Description 2', programType: 'movie', releaseYear: 2022 }
      ]
    };

    // Step 1: Set up a mock for the fetch function and simulate a successful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => fakeMovieData
    });

    // Step 2: Render the HomePage component
    render(<HomePage />);

    // Step 3: Wait for the loading state to resolve and retrieve the movie elements
    const movieElements = await screen.findAllByRole('listitem');

    // Step 4: Assert that the correct number of movie elements are rendered based on the fake movie data
    expect(movieElements).toHaveLength(fakeMovieData.entries.length);

    // Step 5: Assert that the total count text is present in the component
    expect(screen.getByText(/total: 2/i)).toBeInTheDocument();

    // Step 6: Assert that specific movie titles are present in the component
    expect(screen.getByText(/movie 1/i)).toBeInTheDocument();
    expect(screen.getByText(/movie 2/i)).toBeInTheDocument();

    // Step 7: Restore the original `fetch` function to avoid interference with other tests
    global.fetch.mockRestore();
  });
});
