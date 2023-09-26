import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages 
import LogoPage from './pages/LogoPage';
import Login from './pages/Login';
import Home from './pages/Home';
import MySubject from './pages/MySubject';
import Editor from './pages/Editor';
import GoalDetail from './pages/WeekDetail';
import WeekDetail from './pages/WeekDetail';

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/logoPage' element={<LogoPage />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/mySubject' element={<MySubject />} />
        <Route path='/weekDetail/:params' element={<WeekDetail />} />
        <Route path='/editor/:writtenDate' element={<Editor />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
