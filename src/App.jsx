import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="about" element={<About />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="create" element={<EditLayout />}>
            <Route index element={<Create />} />
            <Route path="update/:id" element={<AddEditBlog />} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
