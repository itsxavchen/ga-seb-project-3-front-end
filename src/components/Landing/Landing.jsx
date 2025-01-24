import React, { useState } from "react";
import VideoComponent from '../VideoComponent/VideoComponent';
import "./Landing.css";
import SignupForm from "../SignupForm/SignupForm";
import SigninForm from "../SigninForm/SigninForm";

const Landing = ({setUser}) => {
  const [modalType, setModalType] = useState(null);
  const openModal = (type) => {
    setModalType(type)
  };
  const closeModal = () => {
    setModalType(null);
  };

  return (
    <main className="home-page-wrapper">
      <nav className="nav-wrapper">
        <div className="logo-wrapper">
          <h3>XKII<sup>™</sup></h3>
        </div>

        <div className="signup-signin-wrapper">
          <button className="cta-button" onClick={() => openModal("signin")}><h3>LOG IN</h3></button>
          <button className="cta-button" onClick={() => openModal("signup")}><h3>SIGN UP</h3></button>
        </div>
      </nav>
      <VideoComponent />
      
      {modalType ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cta-button, close-button" onClick={closeModal}><img src="/images/close_icon.svg" alt="close button" /></button>
            {modalType === "signup" ? (
              <SignupForm setUser={setUser} />
            ) : modalType === "signin" ? (
              <SigninForm setUser={setUser} />
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default Landing;

// return (
//   <main className="home-page-wrapper">
//     <nav className="nav-wrapper">
//       <div className="logo-wrapper">
//         <h3>XKII<sup>™</sup></h3>
//       </div>

//       <div className="signup-signin-wrapper">
//         <Link to="/signin"><h3>SIGN IN</h3></Link>
//         <Link to="/signup"><h3>SIGN UP</h3></Link>
//       </div>
//     </nav>
//     <VideoComponent />
    
//     {modalType ? (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <button className="close-button" onClick={closeModal}>X</button>
//           {modalType === "signup" ? (
//             <SignupForm setUser={setUser} />
//           ) : modalType === "signin" ? (
//             <SigninForm setUser={setUser} />
//           ) : null}
//         </div>
//       </div>
//     ) : null}
//   </main>
// );
// };