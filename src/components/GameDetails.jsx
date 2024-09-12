import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './../../src/Game.css'
import axios from 'axios';
import {BackendUrl} from './../utils/ApiEnd';

const GameDetails = ({ games }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const game = games.find(game => game.id === id);
  const [game, setGames] = useState([]);

  useEffect(() => {
    axios.get(`${BackendUrl}/api/games/${id}`)
      .then(response => setGames(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const handlePlayClick = () => {
    navigate(`/play/${id}`);
  };

  return (
    <div>
      <div className="bgContent">
        <div className="main-container py-4">
          <div className="common-game-bgn-container" style={{ width: "100%", height: "400px", minHeight: "400px", height: "auto" }}>
            <img className="common-game-bg" src={game.image} alt={"Game of joys - " + game?.title} />
            <div className="common-game-bg-overlay-banner">
              <div className='center-content'>
                <img src={game.image} alt={"Game of joys - " + game?.title} />
                <a onClick={handlePlayClick}>
                  <button className='gamebutton mt-3'>PLAY</button>
                </a>
              </div>
            </div>
          </div>
          <div className="fs-18 text-white mt-5 description mb-5">
            {/* {game?.descriptions?.map((desc, index) => (
              <p key={index} className="m-0 mb-3">{desc}</p>
            ))} */}
            <div dangerouslySetInnerHTML={{ __html: game?.descriptions }}></div>
          </div>
        </div>
      </div>
      <div className="bgContent pt-2">
        <h3 className='text-white text-center'>Popular Games</h3>
        <div className="main-container">
          <div className="row m-0 g-1">
            {games?.map(game => (
              <div key={game._id} className="col-6 col-sm-4 col-lg-3 col-xl-2 p-2">
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
    </div>
  );
};

export default GameDetails;
