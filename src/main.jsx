import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-markdown-editor-lite/lib/index.css';
import './index.css';
import { UserProvider } from './context/UserContext.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </UserProvider>
  </React.StrictMode>
);
