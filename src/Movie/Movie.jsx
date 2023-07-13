import React from 'react'
import PropTypes from 'prop-types';

const Movie = ({ title, images }) => {
  return (
    <li>
        <h2>{title}</h2>
        <img src={images['Poster Art'].url} alt={title} />
    </li>
  )
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.shape({
    'Poster Art': PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


export default Movie;
