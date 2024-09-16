import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameList = ({ games }) => {
  const navigate = useNavigate();

  return (
    // <div className="game-list">
    //   {games.map(game => (
    //     <div key={game.id} className="game-item">
    //       <img src={game.thumbnail} alt={game.title} />
    //       <h2>{game.title}</h2>
    //       <p>{game.description}</p>
    //       <a href={`/game/${game.id}`}>Play Now</a>
    //     </div>
    //   ))}
    // </div>

    <div className="bgContent">
      <div className="main-container">
        <div className="row m-0 g-1">
          {games?.map(game => (
            <div key={game._id} className="col-6 col-sm-4 col-lg-3 col-xl-2 p-2">
              <div className="gameCard" onClick={() => navigate(`/game/${game.slug}`)}>
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
  );
};

export default GameList;
