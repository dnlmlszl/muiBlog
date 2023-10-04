import { useEffect, useState } from 'react';
import { readPosts } from '../utils/crudUtils';
import { Grid } from '@mui/material';
import SinglePost from './SinglePost';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      readPosts(setPosts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(posts);
  return (
    <Grid container spacing={3} sx={{ margin: '2rem 0' }}>
      {posts.map((post) => (
        <SinglePost key={post.id} {...post} />
      ))}
    </Grid>
  );
};

export default Posts;
