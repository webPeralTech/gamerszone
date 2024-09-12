// src/components/PlayGame.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BackendUrl } from '../utils/ApiEnd';

const PlayGame = ({ games }) => {
  const { id } = useParams();
  const [game, setGame] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`${BackendUrl}/api/games/${id}`)
      .then(response => setGame(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main-container">
        <div className="play-game-container">
          <h1>{game.title}</h1>
          <iframe
            src={game.link} // Assuming 'link' contains the URL to play the game
            title={game.title}
            width="100%"
            height="600px"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="bgContent">
        <div className="main-container">
          <div className="row m-0 g-1">
            {games?.map(game => (
              <div key={game?._id} className="col-6 col-sm-4 col-lg-3 col-xl-2 p-2">
                <div className="gameCard" onClick={() => navigate(`/game/${game._id}`)}>
                  <a >
                    <img src={game.image} alt={`Game of joys - ${game.title}`} />
                    <div className="databg"></div>
                    <p className="text-center m-0 fs-16 king">{game.title}</p>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayGame;
