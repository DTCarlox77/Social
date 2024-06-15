import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Social from './pages/Social';
import Login from './pages/Login';
import Close from './components/Close';
import Register from './pages/Register';
import Network from './pages/Network';
import NotFound from './pages/NotFound';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' Component={Network} />
        <Route path='/posts' Component={Social} />
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
        <Route path='/close' Component={Close} />
        <Route path='*' Component={NotFound} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
