import { useState } from 'react';
import { useGlobalCatContext } from '../context/CategoryContext';
import { SingleGenre } from './SingleGenre';
import Stack from '@mui/material/Stack';

const Categories = () => {
  const { categories } = useGlobalCatContext();
  const [selectedCategories, setSelectedCategories] = useState([]);

  if (!categories || categories.length === 0) {
    return <p>Loading categories...</p>;
  }

  return (
    <>
      <h4>Categories</h4>
      <Stack
        direction="column"
        spacing={1}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {categories.map((genre, index) => (
          <SingleGenre
            key={index}
            id={index}
            name={genre}
            selectedGenres={selectedCategories}
            setSelectedGenres={setSelectedCategories}
          />
        ))}
      </Stack>
    </>
  );
};

export default Categories;
