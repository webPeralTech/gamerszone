import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import logo from "./../assets/games_zone.png"

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <nav className="header navbar navbar-expand-lg px-5 sticky-top">
          <div className="container">
            <a className="navbar-brand text-white mt-3" onClick={() => navigate("/")}> <img src={logo} alt="Gamers Zone" width={'150px'} height={'150px'} /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="d-flex menu justify-content-end collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" style={{cursor : "pointer"}} aria-current="page" onClick={() => navigate("/")}>Home</a>
                </li>
                <li className="nav-item" style={{cursor : "pointer"}}>
                  <a className="nav-link" aria-current="page" onClick={() => navigate("/aboutus")}
                  >About Us</a>
                </li>
                <li className="nav-item" style={{cursor : "pointer"}}>
                  <a className="nav-link" aria-current="page"  onClick={() => navigate("/contactus")}>Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
