// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import logo from "./../assets/games_zone.png"

// const Header = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className="">
//         <nav className="header navbar navbar-expand-lg px-5 sticky-top">
//           <div className="container">
//             <a className="navbar-brand text-white mt-3" onClick={() => navigate("/")}> <img src={logo} alt="Game of joys" width={'150px'} height={'150px'} /></a>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="d-flex menu justify-content-end collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <a className="nav-link active" style={{cursor : "pointer"}} aria-current="page" onClick={() => navigate("/")}>Home</a>
//                 </li>
//                 <li className="nav-item" style={{cursor : "pointer"}}>
//                   <a className="nav-link" aria-current="page" onClick={() => navigate("/aboutus")}
//                   >About Us</a>
//                 </li>
//                 <li className="nav-item" style={{cursor : "pointer"}}>
//                   <a className="nav-link" aria-current="page"  onClick={() => navigate("/contactus")}>Contact Us</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Header;

import React, { useState } from "react";
import "./../Header.css";
import logo from "./../assets/games_zone.png"
import { Link, NavLink } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
// import { useCookies } from "react-cookie";
import { useEffect } from "react";

function Header(props) {
  const [show, setShow] = useState(false);
  // const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    removeCookie('user')
  }
  useEffect(() => {
    if (props.name) {
      window.gtag("event", "page", {
        event_category: "page",
        event_label: props.name
      });
    }
  }, [])


  return (
    <>
      <div className="header">
        <div className="main-container">
          <div className="row m-0">
            <div className="col-lg-4 col-10">
              <a href="/">
                <div className="d-flex">
                  <img src={logo} alt="" height={80} />
                  <h6 className="text-center d-flex align-items-center text-white fs-4 mb-3">Game Of Joys</h6>
                </div>

              </a>
            </div>
            <div className="col-lg-7 col-2 d-flex justify-content-end align-items-center ">
              <div className="mb-3 menu justify-content-end align-items-center d-md-flex d-none">

               
                  <>  
                  <NavLink to="/">HOME</NavLink>
                    <span onClick={() => window.location.reload()} ><NavLink to="/aboutus">ABOUT US</NavLink></span>
                    <span onClick={() => window.location.reload()} ><NavLink to="/contactus">CONTACT US</NavLink></span>
                    </>
                

              </div>
              {/* {
                cookies.user && <div>
                  <button onClick={logout} style={{ padding: '5px 15px' }}>Logout</button>
                </div>
              } */}
              <div
                className="d-flex d-md-none justify-content-end align-items-center h-100"
                style={{ cursor: "pointer" }}
                onClick={handleShow}
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    fill="#FFFFFF"
                    fillRule="evenodd"
                    d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Offcanvas show={show} onHide={handleClose} className="bg-dark">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="menu justify-content-center align-items-center">
            <NavLink className="d-block mb-2" to="/">
              HOME
            </NavLink>
            <NavLink className="d-block mb-2" to="/aboutus">
              ABOUT
            </NavLink>
            <NavLink className="d-block mb-2" to="/contactus">
              CONTACT
            </NavLink>
            <NavLink className="d-block mb" to="/privacy-policy">
              PRIVACY
            </NavLink>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
