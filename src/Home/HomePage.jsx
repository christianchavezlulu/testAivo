import React, { useEffect, useState } from 'react';
import Movie from '../Movie/Movie';
import Profile from '../Profile/Profile';
  
  const HomePage = () => {
  const [movies, setMovies] = useState>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All the Movies</h1>
      <Profile />
      <span>
        Total: {movies.length}
      </span>
      <ul>
        {movies.map(movie => (
          <Movie key={movie.title} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
