import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import SinglePageError from './pages/SinglePageError';
import Home from './pages/Home';
import About from './pages/About';
import Detail from './pages/Detail';
import AddEditBlog from './pages/AddEditBlog';
import AuthLayout from './pages/AuthLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import EditLayout from './pages/EditLayout';
import Create from './pages/Create';
import Landing from './pages/Landing';
import { loader as landingLoader } from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(),
        errorElement: <SinglePageError />,
      },
      {
        path: 'about',
        element: <About />,
        errorElement: <SinglePageError />,
      },
      {
        path: 'detail/:id',
        element: <Detail />,
        errorElement: <SinglePageError />,
      },
      {
        path: 'create',
        element: <EditLayout />,
        errorElement: <SinglePageError />,
        children: [
          {
            index: true,
            element: <Create />,
            errorElement: <SinglePageError />,
          },
          {
            path: 'update/:id',
            element: <AddEditBlog />,
            errorElement: <SinglePageError />,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        errorElement: <SinglePageError />,
        children: [
          {
            index: true,
            element: <Login />,
            errorElement: <SinglePageError />,
          },
          {
            path: 'signup',
            element: <Signup />,
            errorElement: <SinglePageError />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
            errorElement: <SinglePageError />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
