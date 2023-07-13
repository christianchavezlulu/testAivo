import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders loading state initially', () => {
    render(<HomePage />);
    
    const loadingElement = screen.getByText(/loading/i);
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

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => fakeMovieData
    });

    render(<HomePage />);

    // Wait for the loading state to resolve
    const movieElements = await screen.findAllByRole('listitem');

    expect(movieElements).toHaveLength(fakeMovieData.entries.length);
    expect(screen.getByText(/total: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/movie 1/i)).toBeInTheDocument();
    expect(screen.getByText(/movie 2/i)).toBeInTheDocument();

    // Restore the original `fetch` function
    global.fetch.mockRestore();
  });
});
