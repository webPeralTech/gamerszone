import React, { useState } from 'react';
import './../../src/Footer.css';
import axios from 'axios';
import logo from "./../assets/games_zone.png"
import { BackendUrl } from '../utils/ApiEnd';

function Footer({ games }) {
  // const games = gameData?.slice(0, 10)
  const [gameData, setGameData] = useState([]);
  // console.log("gameData: ", games);
  // console.log("gameData: ", gameData);

  React.useEffect(() => {
    if (games) {
      setGameData(games)
    }
  }, [games]);

  return (
    <div className='footer'>
      <div className='main-container h-100'>
        <div className='row m-0 h-100 d-flex py-3'>
          <div className='col-12 col-md-2'>
            <img src={logo} alt="Game of joys" width={'200px'} height={'200px'} style={{ maxWidth: '500px' }} />
          </div>

          <div className='col-10 d-flex flex-wrap gap-5 footerLinks '>
            <div className="d-flex flex-column mt-5">
              <h6>Navigate</h6>
              <div className='menuLinks mt-3'>
                <a href="/">Home</a>
                <a href="/aboutus">About Us</a>
                <a href="/contactus">Contact Us</a>
              </div>
            </div>
            <div className="d-flex flex-column mt-5">
              <h6 className='d-block text-start w-100'>Games</h6>
              <div className='menuLinks mt-3 d-flex gap-4'>
                <div>
                  {
                    gameData?.slice(0, 5).map((game) => {
                      return <a title={game.title} href={`/game/${game?._id}`} className='text-nowrap'>{game.title}</a>
                    })
                  }
                </div>
                <div>
                  {
                    gameData?.slice(5, 10).map((game) => {
                      return <a title={game.title} href={`/game/${game?._id}`} className='text-nowrap'>{game.title}</a>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
