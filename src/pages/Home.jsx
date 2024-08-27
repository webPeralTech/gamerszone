import React from 'react';
import GameList from '../components/GameList';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';

const Home = ({ games }) => {
  return (
    <main>
      <Carousel />
      <div>
        <h1 className='text-center p-2 text-success'>Our Trending Games</h1>
        <GameList games={games} />
      </div>
    </main>
  );
};

export default Home;
