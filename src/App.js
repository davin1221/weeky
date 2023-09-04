import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages 
import LogoPage from './pages/LogoPage';
import Login from './pages/Login';

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/LogoPage' element={<LogoPage />}/>
        <Route path='/Login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
