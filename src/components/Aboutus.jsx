import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "Game of joys | About Us"
  }, [])
  return (
    <>
      <div>
        <div className="bgContent mt-5">
          <div className="main-container py-4 text-white fs-20">
              <section id="about-us">
                <div class="container">
                  <h1>About Us</h1>
                  <p>Welcome to <strong>Game of Joys</strong> — your ultimate destination for all things gaming! At Game of Joys, we’re passionate about bringing joy and excitement to gamers of all levels, from casual players to hardcore enthusiasts. Whether you're here to explore new games, stay updated on the latest trends, or find reviews and tips, we've got you covered.</p>

                  <h2>Our Mission</h2>
                  <p>At Game of Joys, our mission is simple: to create a vibrant community where gaming is more than just a hobby—it's a way of life. We aim to provide insightful content, engaging discussions, and a platform where gamers can connect, learn, and share their experiences.</p>

                  <h2>What We Offer</h2>
                  <ul>
                    <li><strong>Game Reviews</strong>: Honest, in-depth reviews of the latest and greatest games.</li>
                    <li><strong>News & Updates</strong>: Stay informed with the latest news in the gaming world.</li>
                    <li><strong>Tips & Tricks</strong>: Improve your gameplay with expert tips and guides.</li>
                    <li><strong>Community</strong>: Connect with like-minded gamers, share your thoughts, and join the conversation.</li>
                  </ul>

                  <h2>Why Choose Us?</h2>
                  <p><strong>Game of Joys</strong> is built by gamers, for gamers. We believe that gaming is not just entertainment but an experience that unites people. Our goal is to provide a platform where you can discover new joys in gaming, find your next favorite game, and join a community that celebrates the love of gaming.</p>

                  <p>Thank you for visiting <strong>Game of Joys</strong>, where the joy of gaming never ends!</p>
                </div>
              </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
