import { useEffect, useState } from 'react';
import { readPosts } from '../utils/crudUtils';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const LatestPosts = ({ truncateDescription }) => {
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      readPosts((posts) => {
        // Feltételezve, hogy a posztok egy 'timestamp' vagy hasonló property-vel rendelkeznek
        const sortedPosts = posts.sort((a, b) => b.timestamp - a.timestamp);
        // Az első két poszt beállítása az állapotba
        setLatest(sortedPosts.slice(0, 3));
      });
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

  return (
    <div className="card-container">
      <h3 className="cat-title">Latest posts</h3>
      {latest &&
        latest.map((post) => (
          <Card
            key={post.id}
            sx={{ padding: '1rem 1rem 0 1rem', marginBottom: '1rem' }}
          >
            <CardMedia
              component="img"
              height="140"
              image={post.photoUrl}
              alt={post.title}
            />
            <CardContent sx={{ marginLeft: '-1rem' }}>
              <Link to={`/post/${post.id}`}>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ color: '#4c6375' }}
                  component="div"
                >
                  {post.title}
                </Typography>
              </Link>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'left' }}
              >
                {truncateDescription(post.description, 100)}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                style={{ marginTop: '10px' }}
              >
                Author: {post.author}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Category: {post.category}
              </Typography>
              <Link to={`/post/${post.id}`}>
                <Button
                  size="small"
                  style={{ marginTop: '10px', color: '#4c6375' }}
                >
                  Read More
                </Button>{' '}
              </Link>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default LatestPosts;
