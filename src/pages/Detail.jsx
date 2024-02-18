import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePost, getPostById } from '../utils/crudUtils';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
  Typography,
  Avatar,
  Button,
} from '@mui/material';
import { useGlobalContext } from '../context/UserContext';

const Detail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const mdParser = new MarkdownIt();

  const { user } = useGlobalContext();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePost(db, id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post: ', error);
      }
    };

    fetchPost();
  }, [id]);

  function formatDate(timestamp) {
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  }

  if (!post) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Post not found
        </Typography>
      </Container>
    );
  }

  const {
    author,
    title,
    category,
    description,
    photoUrl,
    profilePic,
    timestamp,
  } = post;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Card sx={{ maxWidth: 1000, width: '100%', mb: 3 }}>
        <CardMedia
          component="img"
          sx={{
            height: '40rem',
            width: '100%',
            objectFit: 'cover',
          }}
          image={photoUrl}
          alt={author}
        />
        <CardContent>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{ color: '#4c6375' }}
          >
            {title}
          </Typography>
          <Typography
            variant="span"
            color="text.secondary"
            sx={{
              background: 'goldenrod',
              fontSize: '1.25rem',
              padding: '0.25rem 0.45rem',
              borderRadius: '0.25rem 0.45rem',
              color: '#fff',
            }}
            gutterBottom
          >
            {category}
          </Typography>
          <Typography
            variant="div"
            color="text.secondary"
            sx={{ marginTop: '1rem' }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: mdParser.render(description),
              }}
            />
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to={`/update/${post.id}`}>
                <Button
                  sx={{
                    background: '#4c6375',
                    color: '#fff',
                    margin: '1rem 0',
                    ':hover': { background: '#7d99af' },
                  }}
                >
                  Edit post
                </Button>
              </Link>
              <Button
                onClick={handleDelete}
                variant="outlined"
                color="error"
                sx={{ margin: '1rem 0' }}
              >
                Delete post
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={profilePic} alt={author} sx={{ mr: 2 }} />
        <Box>
          <Typography variant="subtitle1" component="div">
            Written by {author}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Published on {formatDate(timestamp)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Detail;
