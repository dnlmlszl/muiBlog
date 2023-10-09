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
import Create from './pages/Create_v2';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing />} />
          <Route path="about" element={<About />} />
          <Route path="post/:id" element={<Detail />} />
          <Route path="create" element={<Create />} />
          <Route path="update/:id" element={<AddEditBlog />} />
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
