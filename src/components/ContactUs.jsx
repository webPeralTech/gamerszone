import React, { useEffect } from 'react'

function Contact() {
  useEffect(() => {
    document.title = "Gamerz Area | Contact Us"
  }, [])
  return (
    <>
      <div>
        <div className="bgContent">
          <div className="main-container py-4 text-white fs-20">
            <div className="my-4 pb-3">
              <h4 className="descHeading"> Contact US </h4>
              <p> contact@gamerzarea.com</p>
              <p>Your satisfaction is our priority, and we are always listening to your needs to improve our services. We look forward to receiving your feedback and working with you to make your experience with "gamerzarea.com" even better. Thank you for your trust and loyalty.</p>
              <p>Whether you want to share a suggestion, express a concern or simply chat, we’re here for you. Our dedicated customer support team is ready to help you with any questions or problems you may encounter.</p>
            </div>
            <div className="mt-4">
              <h4 className="descHeading"> Copy Right Issue </h4>
              <p> At Gamerz Area, we are committed to respecting intellectual property rights and have made efforts to conform with them on our platform. Some of these games were developed by us while others are licensed from known copyright holders. In some cases, there is lack of copyright information due to general internet use and thus we make sure that they comply with certain prerequisites.</p>
              <p> No change is made in the source code of the games thereby preserving credits, brand names and website links unaltered.If you believe that your copyright or other IPR has been violated on Gamerz Area’ sites, please contact contact@gamerzarea.com with:</p>
              <ul>
                <li>Either your electronic or physical signature or that of your authorized agent.</li>
                <li>An explanation of the infringed IP Right and the infringing activity.</li>
                <li>The specific location of the unauthorized material (e.g., URL).</li>
                <li>A copy of the license permitting its use (where applicable).</li>
                <li>Identify where precisely you think this breach occurred.</li>
                <li>Your name, contact details, and good faith belief that no permission was granted for such purposes.</li>
              </ul>
              <p>Send above details at contact@multigamezone.com. We promise to examine any issues raised within seven days after they are reported.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact