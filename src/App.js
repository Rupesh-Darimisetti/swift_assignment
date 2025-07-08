import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Commments from './components/Comments';
import Header from './components/Header';
import Profile from './components/Profile';
import useFetch from './hooks/useFetch';

function App() {
  const { data: user } = useFetch("https://jsonplaceholder.typicode.com/users/1")

  return (
    <BrowserRouter>
      <Header name={user?.name} />
      < Routes >
        <Route exact path='/' Component={Commments} />
        <Route exact path='/profile' Component={Profile} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
