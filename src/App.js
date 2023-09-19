import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages 
import LogoPage from './pages/LogoPage';
import Login from './pages/Login';
import Home from './pages/Home';
import MySubject from './pages/MySubject';
import WeekGoal from './pages/WeekGoal';
import DailyGoal from './pages/DailyGoal';
import Editor from './pages/Editor';

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/logoPage' element={<LogoPage />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/mySubject' element={<MySubject />} />
        <Route path='/weekGoal/:id' element={<WeekGoal />} />
        <Route path='/dailyGoal/:id' element={<DailyGoal />} />
        <Route path='/editor/:id' element={<Editor />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
