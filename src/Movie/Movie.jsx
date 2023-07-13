import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 200,
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '16px',
    padding: '10px'
  },
  media: {
    height: 150,
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: '8px',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#333'
  },
});

const Movie = ({ movie: { title='Without title', images={} } }) => {
  const classes = useStyles();

  // Check if the images object and the 'Poster Art' property are defined
  if (!images || !images['Poster Art']) {
    return null; // If not, return null or a placeholder component
  }

  const { url } = images['Poster Art'];

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={url} title={title} />
      <Typography className={classes.title} variant="h6">{title}</Typography>
    </Card>
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
