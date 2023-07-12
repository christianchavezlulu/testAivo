import React, { useEffect, useState } from 'react';

interface Entry {
    title: string;
    description: string;
    programType: string;
    images: {
      "Poster Art": {
        url: string;
        width: number;
        height: number;
      };
    };
    releaseYear: number;
  }
  
function App() {
  const [movies, setMovies] = useState<Entry[]>([]);
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
      <span>
        Total: {movies.length}
      </span>
      <ul>
        {movies.map(movie => (
          <li key={movie.title}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Program Type: {movie.programType}</p>
            <p>Release Year: {movie.releaseYear}</p>
            <img src={movie.images['Poster Art'].url} alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
