import React, { useEffect, useState } from 'react';
import Movie from '../Movie/Movie';
import Profile from '../Profile/Profile';
import jsonFile from '../Data/data.json';
import { makeStyles } from '@material-ui/core/styles';

  const useStyles = makeStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '16px',
      '@media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '@media (min-width: 1200px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
    },
    select: {
      marginBottom: '16px',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
  });
  
  const HomePage = () => {
    const classes = useStyles();

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
                <label className={classes.label}>
                  Filter by:
                  <select 
                    className={classes.select} 
                    value={filter} 
                    onChange={handleFilterChange}
                  >
                    <option value="all">All</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                  </select>
                </label>
              </div>
              <div>
                <label className={classes.label}>
                  Sort by:
                  <select 
                    className={classes.select} 
                    value={sortOption} 
                    onChange={handleSortOptionChange}
                  >
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                  </select>
                </label>
              </div>
            </section>
            <span>
              Total: {sortedMovies.length}
            </span>
            <div className={classes.container}>
              {sortedMovies.map(movie => <Movie key={movie?.title} movie={movie} />)}
            </div>
          </div>
        )}
      </div>
    );
  }

export default HomePage;
