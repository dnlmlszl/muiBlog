import { Form, FormGroup, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../context/UserContext';
import { useGlobalCatContext } from '../context/CategoryContext';
import { createTheme, ThemeProvider } from '@mui/material';
import Error from './Error';
import { uploadFile } from '../utils/uploadFile';
import { useState } from 'react';
import { styled } from '@mui/system';
import { addPost } from '../utils/crudUtils';
import MyAlert from '../components/MyAlert';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4c6375',
    },
    secondary: {
      main: '#ff9800',
    },
  },
});

const BlogContainer = styled('section')(({ theme }) => ({
  padding: '3.5rem',

  [theme.breakpoints.up('sm')]: {
    padding: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: '3rem',
  },
}));

const Create = () => {
  const { user, loading, setLoading } = useGlobalContext();
  const { categories } = useGlobalCatContext();

  const [photo, setPhoto] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <div className="loading"></div>;
  }

  if (!user) {
    return <Error />;
  }

  async function onSubmit(data, e) {
    e.preventDefault();

    try {
      const file = data.file[0];
      const photoUrl = await uploadFile(file);

      //Órai munka
      const newData = { ...data };
      delete newData.file;
      await addPost({
        ...newData,
        photoUrl,
        author: user.displayName,
        profilePic: user.photoURL,
        userId: user.uid,
      });
      setUploaded(true);
      // Órai munka
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUploaded(false);
      setPhoto(null);
    }
    e.target.reset();
  }

  return (
    <ThemeProvider theme={theme}>
      <BlogContainer>
        <section className="blogContainer">
          <h3>Create your blog</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>Title</Label>
              <input
                type="text"
                {...register('title', { required: true })}
                className="form-control"
              />
              {errors?.title && <p>Please provide a title</p>}
            </FormGroup>

            <FormGroup>
              <Label>Slug</Label>
              <select
                className="form-select"
                {...register('category', {
                  required: true,
                  validate: (value) => {
                    if (value === 0) {
                      return 'You need to choose one category';
                    }
                  },
                })}
              >
                <option>--Select category--</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="errorMessage">{errors?.category?.message}</p>
            </FormGroup>

            <FormGroup>
              <Label>Tell your story...</Label>
              <textarea
                className="form-control"
                type="textarea"
                rows="10"
                cols="100"
                {...register('description', { required: true })}
              ></textarea>
              {errors.description && <p>Please add some text</p>}
            </FormGroup>

            <FormGroup>
              <Label>Picture</Label>
              <input
                type="file"
                {...register('file', {
                  required: true,
                  validate: (value) => {
                    const acceptedFormats = ['jpeg', 'jpg', 'png', 'webp'];
                    const fileExt = value[0]?.name
                      .split('.')
                      .pop()
                      .toLowerCase();
                    if (!acceptedFormats.includes(fileExt)) {
                      return 'Invalid file format';
                    }
                    if (value[0].size > 1024000) {
                      return 'File size cannot be bigger than 1 MegaByte';
                    }

                    return true;
                  },
                })}
                className="form-control"
                onChange={(e) =>
                  setPhoto(URL.createObjectURL(e.target.files[0]))
                }
              />
              <p className="error-msg">{errors?.file?.message}</p>
            </FormGroup>

            <input
              type="submit"
              value="Submit"
              style={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              }}
              className="btn btn-outline-primary"
            />
            {photo && (
              <img
                src={photo}
                alt="thumbnail"
                style={{ margin: '1rem 0' }}
                className="img-thumbnail"
              />
            )}
            {uploaded && <MyAlert text="uploaded" />}
          </Form>
        </section>
      </BlogContainer>
    </ThemeProvider>
  );
};

export default Create;
