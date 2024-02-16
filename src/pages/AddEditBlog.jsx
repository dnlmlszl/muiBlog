import { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../utils/crudUtils';
import { createTheme } from '@mui/material';
import { db } from '../firebase';
import { styled } from '@mui/system';
import { Form, FormGroup } from 'reactstrap';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4c6375', // például egy friss, modern zöld szín
    },
    secondary: {
      main: '#ff9800', // például egy friss, modern narancssárga szín
    },
  },
});

const BlogContainer = styled('section')(({ theme }) => ({
  padding: '3.5rem',
  [theme.breakpoints.up('sm')]: {
    padding: '2 2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: '3 3rem',
  },
}));

const AddEditBlog = () => {
  const [post, setPost] = useState(null);
  const [description, setDescription] = useState('');
  const mdParser = new MarkdownIt();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id);
        setPost(postData);
        setDescription(postData.description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePost(db, id, { description });
      navigate(`/post/${id}`);
      console.log('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post: ', error);
    }
  };

  if (!post) {
    return <div className="loading"></div>;
  }

  return (
    <BlogContainer>
      <section className="blogContainer">
        <h3>Edit Post</h3>
        <Form onSubmit={handleUpdate}>
          <FormGroup>
            <MdEditor
              value={description}
              style={{ height: '500px', margin: '1rem 0 6rem' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={({ text }) => setDescription(text)}
            />
          </FormGroup>

          <input
            type="submit"
            value="Update your post"
            style={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            }}
            className="btn btn-outline-primary"
          />
        </Form>
      </section>
    </BlogContainer>
  );
};

export default AddEditBlog;
