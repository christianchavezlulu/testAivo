import React from 'react'

const Movie = ({ title, images }) => {
  return (
    <li>
        <h2>{title}</h2>
        <img src={images['Poster Art'].url} alt={title} />
    </li>
  )
}

export default Movie;
