import React from 'react'
import PropTypes from 'prop-types';

const Movie = ({ movie: { title='Without title', images={} } }) => {
  // Check if the images object and the 'Poster Art' property are defined
  if (!images || !images['Poster Art']) {
    return null; // If not, return null or a placeholder component
  }

  const { url } = images['Poster Art'];

  return (
    <div>
        <h2>{title}</h2>
        <img src={url} alt={title} />
    </div>
  )
}

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.shape({
      'Poster Art': PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default Movie;
