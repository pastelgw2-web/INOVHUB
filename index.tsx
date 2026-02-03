import React from 'react';
import ReactDOM from 'react-dom/client';
// Tambahkan .tsx secara eksplisit untuk memastikan file terbaca
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
