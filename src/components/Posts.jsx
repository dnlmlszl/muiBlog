import { useEffect, useState } from 'react';
import { readPosts } from '../utils/crudUtils';
import { Grid, Typography } from '@mui/material';
import SinglePost from './SinglePost';
import { useGlobalCatContext } from '../context/CategoryContext';

const Posts = ({ truncateDescription, selectedCategories }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { categories } = useGlobalCatContext();

  const filteredPosts =
    posts && categories
      ? posts.filter(
          (post) =>
            selectedCategories.length === 0 ||
            selectedCategories.includes(post.category)
        )
      : [];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await readPosts(setPosts);
        return () => fetchedPosts;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Grid container spacing={3} sx={{ padding: '1rem 3rem' }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ margin: '2rem 0', textAlign: 'center', color: '#4c6375' }}
      >
        Most Wanted Posts
      </Typography>
      {filteredPosts.map((post) => {
        return (
          <SinglePost
            post={post}
            key={post.id}
            truncateDescription={truncateDescription}
          />
        );
      })}
    </Grid>
  );
};

export default Posts;
