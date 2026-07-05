import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ContentProvider } from './context/ContentContext.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContentProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </ContentProvider>
  </BrowserRouter>
);
