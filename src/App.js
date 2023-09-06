import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages 
import LogoPage from './pages/LogoPage';
import Login from './pages/Login';
import Home from './pages/Home';
import MySubject from './pages/MySubject';

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/logoPage' element={<LogoPage />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/mySubject' element={<MySubject />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
