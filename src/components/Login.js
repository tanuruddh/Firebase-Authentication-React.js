import Spinner from "./Spinner";
import { useFirebase } from "../context/firebase.jsx";

// import axios from "axios";


export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { name, email, password, sign, loadings, heading, loginUser, createUser, dispatch, signUpWithGoogle, signUpWithFacebook } = useFirebase();

  return (
    <main className='.login'>
      <div className="container">
        <div className="form-box" >
          <h1 id="title">{heading}</h1>
          <div className="google">
            <div className="google-btn">
              <div className="google-icon-wrapper" onClick={signUpWithGoogle}>
                <i class="fa-brands fa-google"></i>
              </div>
              <div className="google-icon-wrapper" onClick={signUpWithFacebook}>
                <i class="fa-brands fa-facebook-f"></i>
              </div>
            </div>
            <p className="btn-text">
              <b>Or use email address</b>
            </p>
          </div>
          {loadings ? <Spinner /> :
            <form >
              <div className="input-box">
                {sign === "signup" && <div className="input-field" id="nameField">
                  <i className="fa-solid fa-user"></i>
                  <input className="login-input" type="text" placeholder="Name" value={name} onChange={(e) => dispatch({ type: "name", payload: e.target.value })} />
                </div>}

                <div className="input-field">
                  <i className="fa-solid fa-envelope"></i>
                  <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => dispatch({ type: "email", payload: e.target.value })} required />
                </div>

                <div className="input-field">
                  <i className="fa-solid fa-lock"></i>
                  <input className="login-input" type="password" value={password} onChange={(e) => dispatch({ type: "password", payload: e.target.value })} placeholder="Password" required />
                </div>
                <p>Password should be more than 8 words</p>
              </div>
              <div className="btn-box">
                <button type="button" id="login-button" className={sign !== "signin" ? "disable" : ""} onClick={loginUser} >Sign In</button>
                <button type="button" id="signup-button" className={sign !== "signup" ? "disable" : ""} onClick={createUser} >Sign Up</button>
              </div>
            </form>}
        </div>
      </div>
    </main>
  );
}
