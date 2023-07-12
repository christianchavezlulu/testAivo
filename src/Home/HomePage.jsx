import React, { useEffect, useState } from 'react';
import Movie from '../Movie/Movie';
import Profile from '../Profile/Profile';
  
  const HomePage = () => {
  const [movies, setMovies] = useState>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/Data/Data.json');
      const json = await response.json();
      setMovies(json);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'movie') {
      return movie.programType === 'movie';
    } else if (filter === 'series') {
      return movie.programType === 'series';
    }
    return true;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>The Movies</h1>
      <Profile />
      <div>
        <label>
          Filter by:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </label>
      </div>
      <span>
        Total: {filteredMovies.length}
      </span>
      <ul>
        {filteredMovies.map(movie => (
          <Movie key={movie.title} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
