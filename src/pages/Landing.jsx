import { Grid } from '@mui/material';
import Categories from '../components/Categories';
import Posts from '../components/Posts';

const Landing = () => {
  return (
    <Grid container spacing={3} className="main">
      <Grid item xs={9}>
        <Posts />
      </Grid>
      <Grid item xs={2}>
        <Categories />
      </Grid>
    </Grid>
  );
};

export default Landing;
