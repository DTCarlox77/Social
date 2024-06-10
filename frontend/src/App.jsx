import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Social from './pages/Social';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/posts' Component={ Social } />
        <Route path='/login' Component={ Login } />
        <Route path='/register' Component={ Register } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
