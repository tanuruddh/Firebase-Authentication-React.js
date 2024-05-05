import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import { FirebaseProvider } from './context/firebase.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);