import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

