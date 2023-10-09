import { useGlobalCatContext } from '../context/CategoryContext';
import { SingleGenre } from './SingleGenre';

import Box from '@mui/material/Box';

const Categories = ({ selectedCategories, setSelectedCategories }) => {
  const { categories } = useGlobalCatContext();

  if (!categories || categories.length === 0) {
    return <p>Loading categories...</p>;
  }

  return (
    <>
      <h3 className="cat-title">Categories</h3>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center center',
          gridTemplateColumns: '1fr 1fr',
          padding: '1rem 0',
          gap: '0.25rem',
          marginLeft: '-1rem',
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
      </Box>
    </>
  );
};

export default Categories;
