import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApiClient, ApiProvider } from 'jsonapi-react';
import { baseURL } from './endpoints';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const client = new ApiClient({
  url: baseURL,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApiProvider client={client}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);

reportWebVitals();
