import React, { useEffect } from 'react'

function Contact() {
  useEffect(() => {
    document.title = "Game of joys | Contact Us"
  }, [])
  return (
    <>
      <div>
        <div className="bgContent">
          <div className="main-container py-4 text-white fs-20">
            <div className="my-4 pb-3">
              <section id="contact-us">
                <div class="container">
                  <h1>Contact Us</h1>
                  <p>We'd love to hear from you! Whether you have questions, feedback, or just want to say hi, feel free to reach out to us. At <strong>Game of Joys</strong>, we're always here to assist you with your gaming queries and needs.</p>

                  <h2>How to Reach Us</h2>
                  <ul>
                    <li><strong>Email:</strong> <a href="mailto:getinfo.gameofjoys@gmail.com">getinfo.gameofjoys@gmail.com</a></li>
                    {/* <li><strong>Phone:</strong> +1 (123) 456-7890</li> */}
                    <li><strong>Address:</strong> 1234 Gaming Lane, Suite 567, Game City, XY 12345</li>
                  </ul>

                  <h2>Stay Connected</h2>
                  <p>Follow us on our social media channels to stay updated with the latest news, events, and gaming tips:</p>
                  <ul>
                    <li><strong>Facebook:</strong> <a href="https://www.facebook.com/gameofjoys" target="_blank">facebook.com/gameofjoys</a></li>
                    <li><strong>Twitter:</strong> <a href="https://www.twitter.com/gameofjoys" target="_blank">twitter.com/gameofjoys</a></li>
                    <li><strong>Instagram:</strong> <a href="https://www.instagram.com/gameofjoys" target="_blank">instagram.com/gameofjoys</a></li>
                  </ul>

                  <h2>Business Inquiries</h2>
                  <p>For business-related inquiries, collaborations, or sponsorships, please contact us at <a href="mailto:getinfo.gameofjoys@gmail.com">business@gameofjoys.com</a>.</p>

                  <p>We look forward to hearing from you!</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact