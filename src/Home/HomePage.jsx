import React, { useEffect, useState } from 'react';
import Movie from '../Movie/Movie';
import Profile from '../Profile/Profile';
import jsonFile from '../Data/data.json'
  
  const HomePage = () => {
  const [movies, setMovies] = useState([jsonFile]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(jsonFile);
      const json = await response.json();
      setMovies(json?.entries || []);
    } catch (error) {
      console.log('Error fetching data:');
    }
    setIsLoading(false);
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

  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sortOption === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'age') {
      return a.releaseYear - b.releaseYear;
    }
    return 0;
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };


  return (
    <div>
      { isLoading ? (
        <p>Loading...</p>
        ) : (
        <div>
          <h1>The Movies</h1>
          <Profile />
          <section>
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
            <div>
              <label>
                Sort by:
                <select value={sortOption} onChange={handleSortOptionChange}>
                  <option value="name">Name</option>
                  <option value="age">Age</option>
                </select>
              </label>
            </div>
          </section>
          <span>
            Total: {sortedMovies.length}
          </span>
          <ul>
            {sortedMovies.map(movie => (
              <Movie key={movie.title} movie={movie} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomePage;
