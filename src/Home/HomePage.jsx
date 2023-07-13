import React, { useEffect, useState } from 'react';
import Movie from '../Movie/Movie';
import Profile from '../Profile/Profile';
import jsonFile from '../Data/data.json'
  
  const HomePage = () => {
    //Creat states for distint functionalities
    const [movies, setMovies] = useState([jsonFile]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [sortOption, setSortOption] = useState('name');

    useEffect(() => {
      // Set fetching(fetchData()) in useEffect only once; when the component is rendering
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
      // Step 1: Fetch the JSON file from the specified URL
        const response = await fetch(jsonFile);
        // Step 2: Parse the response as JSON
        const json = await response.json();
        // Step 3: Update the movies state with the fetched data or an empty array if it is undefined
        setMovies(json?.entries || []);
      } catch (error) {
        console.log('Error fetching data:');
      }
      // Step 4: Set isLoading to false to indicate that data fetching is complete
      setIsLoading(false);
    };

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
