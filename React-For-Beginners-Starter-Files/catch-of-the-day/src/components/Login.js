import React from "react";

const Login = props => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store's inventory</p>
    <button className="github" onClick={() => props.authenticate("Google")}>
      Log In With Google
    </button>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Log In With Facebook
    </button>
    <button className="twitter" onClick={() => props.authenticate("Twitter")}>
      Log In With Twitter
    </button>
  </nav>
);
export default Login;
