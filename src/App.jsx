import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import Contact from './components/ContactUs';
import About from './components/Aboutus';
import Header from './components/Header';
import Footer from './components/Footer';
import GameAdmin from './components/GameAdmin';
import axios from 'axios';
import PlayGame from './components/PlayGame';
import {BackendUrl} from '././utils/ApiEnd';

const App = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get(`${BackendUrl}/api/games`)
      .then(response => setGames(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home games={games} />} />
          <Route path="/game/:id" element={<GamePage games={games} />} />
          <Route path="/play/:id" element={<PlayGame games={games}/>} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/admin" element={<GameAdmin />} />
        </Routes>
        <Footer games={games}/>
      </Router>
    </>
  );
};

export default App;
