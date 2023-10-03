import { Form, FormGroup, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../context/UserContext';
import { createTheme, ThemeProvider } from '@mui/material';
import Error from './Error';
import { uploadFile } from '../utils/uploadFile';
import { useState } from 'react';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(83, 109, 254)', // például egy friss, modern zöld szín
    },
    secondary: {
      main: '#ff9800', // például egy friss, modern narancssárga szín
    },
  },
});

const BlogContainer = styled('section')(({ theme }) => ({
  padding: '3.5rem',
  [theme.breakpoints.up('sm')]: {
    padding: '0 2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 3rem',
  },
}));

const Create = () => {
  const { user, loading, setLoading } = useGlobalContext();
  const [photo, setPhoto] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const categories = ['Running', 'Coding', 'Travelling', 'Economy'];

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
      console.log(photoUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
              <img src={photo} alt="thumbnail" className="img-thumbnail" />
            )}
          </Form>
        </section>
      </BlogContainer>
    </ThemeProvider>
  );
};

export default Create;
