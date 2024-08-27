import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "Gamerz Area | About Us"
  }, [])
  return (
    <>
      <div>
        <div className="bgContent">
          <div className="main-container py-4 text-white fs-20">
            <div className="mt-4">
              <h4 className="descHeading"> About Gamerz Area </h4>
              <p>Gamerz Area sounds like an exciting platform! It's great to hear that you're focused on creating a seamless gaming experience for players across various devices. The fact that your games are accessible on desktops, tablets, and mobile phones really emphasizes inclusivity and convenience for gamers everywhere.</p>

              <p>Offering a wide range of games that are free to play is a fantastic way to attract a diverse audience and ensure that everyone can enjoy gaming without any barriers. It's also wonderful that Gamerz Area supports developers from all backgrounds, fostering creativity and innovation within the gaming community.</p>

              <p>The emphasis on instant access directly in web browsers makes gaming hassle-free and accessible on the go, which is perfect for today's fast-paced lifestyle. It sounds like Gamerz Area truly aims to be the ultimate playground for gamers worldwide!</p>

              <p>We are sure our platform will continue to grow and provide endless entertainment for gamers of all ages and preferences. Here's to creating the best browser-based gaming platform in the world!</p>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
