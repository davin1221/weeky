import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages 
import Login from './pages/Login';
import Home from './pages/Home';
import MySubject from './pages/MySubject';
import Editor from './pages/Editor';
import GoalDetail from './pages/GoalDetail';

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/mySubject' element={<MySubject />} />
        <Route path='/goalDetail/:params' element={<GoalDetail />} />
        <Route path='/editor/:writtenDate' element={<Editor />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
