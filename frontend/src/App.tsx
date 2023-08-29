import './App.css';
import LandingPage from './products/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import routes from './route-config';

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <div className='container'>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} Component={route.component} />
          ))}
        </Routes>
      </div>
      <footer className='bd-footer py-5 mt-5 bg-light'>
        <div className='container'>Simple JSON API {new Date().getFullYear().toString()}</div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
