import { Grid } from '@mui/material';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const Landing = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  function truncateDescription(description, length) {
    // Az első 30 karakter kiválasztása
    let truncated = description.substr(0, length);

    // Az utolsó szó végének megtalálása
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    // Ha találtunk szóközt, és nem az egész szöveget választottuk ki
    if (lastSpaceIndex !== -1 && truncated.length !== description.length) {
      truncated = truncated.substr(0, lastSpaceIndex);
    }

    // Ha a szöveg hosszabb, mint a választott részlet, hozzáadjuk a "..." jelet
    if (description.length > 30) {
      truncated += '...';
    }

    return truncated;
  }
  return (
    <Grid container spacing={3} className="main">
      <Grid item xs={12} lg={9}>
        <Posts
          truncateDescription={truncateDescription}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        sx={{ borderLeft: '2px solid rgba(75, 97, 114, 0.25)' }}
      >
        <Sidebar
          truncateDescription={truncateDescription}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </Grid>
    </Grid>
  );
};

export default Landing;
