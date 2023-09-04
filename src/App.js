import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages 
import LogoPage from './pages/LogoPage';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/LogoPage' element={<LogoPage />}/>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
