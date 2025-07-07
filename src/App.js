import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Commments from './Comments';
import Profile from './Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Commments} />
        <Route exact path='/profile' Component={Profile} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
