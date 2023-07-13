import React, { useEffect, useState } from 'react';
import Movie from '../Movie/Movie';
import Profile from '../Profile/Profile';
import jsonFile from '../Data/data.json'
  
  const HomePage = () => {
    //Creat states for distint functionalities
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [sortOption, setSortOption] = useState('name');

    useEffect(() => {
      // Set fetching data in useEffect only once; when the component is rendering
      setMovies(jsonFile.entries);
      console.log(jsonFile.entries, 'jsonFile.entries')
      setIsLoading(false);
    }, []);

    // Set the filering functionality
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

    //Set the sorting functionality
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
            <div>
              {sortedMovies.map(movie => <Movie key={movie?.title} movie={movie} />)}
            </div>
          </div>
        )}
      </div>
    );
  }

export default HomePage;
