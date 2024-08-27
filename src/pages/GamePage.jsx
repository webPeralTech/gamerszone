import React from 'react';
import GameDetails from '../components/GameDetails';

const GamePage = ({ games }) => {
  return (
    <main>
      <GameDetails games={games} />
    </main>
  );
};

export default GamePage;
