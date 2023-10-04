import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useGlobalContext } from '../context/UserContext';

const useStyles = makeStyles({
  imageContainer: {
    height: '200px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    objectPosition: 'center',
    aspectRatio: 1,
  },
  spans: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const SinglePost = ({ title, photoUrl, timestamp }) => {
  const { user } = useGlobalContext();
  const classes = useStyles();

  function formatDate(timestamp) {
    const date = timestamp.toDate(); // Konvertálás JavaScript Date objektummá
    return date.toLocaleDateString(); // Formázás olvasható stringgé
  }

  console.log(user);
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <img src={photoUrl} alt={title} className={classes.image} />
        <h2>{title}</h2>
        <div className={classes.spans}>
          <span>by {user.displayName}</span>
          <span>on {formatDate(timestamp)}</span>
        </div>
      </Paper>
    </Grid>
  );
};

export default SinglePost;
