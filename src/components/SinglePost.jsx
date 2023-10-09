import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { useGlobalContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import MarkdownIt from 'markdown-it';

const SinglePost = ({ post, truncateDescription }) => {
  const { user } = useGlobalContext();
  const mdParser = new MarkdownIt();

  function formatDate(timestamp) {
    const date = timestamp.toDate(); // Konvertálás JavaScript Date objektummá
    return date.toLocaleDateString(); // Formázás olvasható stringgé
  }

  return (
    <Grid item xs={12} md={12} key={post.id} sx={{ marginBottom: '2rem' }}>
      <Card sx={{ display: 'flex', maxHeight: '40rem' }}>
        <CardMedia
          component="img"
          sx={{ width: '40%', objectFit: 'cover' }}
          height="450"
          image={post.photoUrl}
          alt={post.title}
        />
        <CardContent
          sx={{
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Link to={`/post/${post.id}`}>
            <Typography
              variant="a"
              component="div"
              sx={{
                color: '#4c6375',
                marginBottom: '1rem',
                fontSize: '2.75rem',
                textAlign: 'center',
              }}
            >
              {post.title}
            </Typography>
          </Link>
          <Typography
            variant="span"
            color="text.secondary"
            sx={{
              background: 'goldenrod',
              fontSize: '1.25rem',
              padding: '0.25rem 0.45rem',
              borderRadius: '0.25rem 0.45rem',
              color: '#fff',
              width: 'fit-content',
              marginLeft: '1rem',
            }}
            gutterBottom
          >
            {post.category}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: '1rem',
            }}
          >
            A post written by{' '}
            <span style={{ fontWeight: 'bold' }}>{post.author}</span> on{' '}
            {formatDate(post.timestamp)}
          </Typography>
          <Typography
            variant="div"
            color="text.secondary"
            sx={{ marginBottom: '1rem' }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: mdParser.render(
                  truncateDescription(post.description, 300)
                ),
              }}
            />
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '3rem',
            }}
          >
            {/* <Typography variant="span" color="text.secondary">
              {post.author}
            </Typography>
            <Typography variant="span" color="text.secondary">
              {post.category}
            </Typography> */}
          </Box>
          <Link to={`/post/${post.id}`}>
            <Button
              sx={{
                background: '#4c6375',
                color: '#fff',
                margin: '1rem 0',
                ':hover': { background: '#7d99af' },
              }}
            >
              Read more
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SinglePost;
