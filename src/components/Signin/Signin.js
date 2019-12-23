import React, { useState } from "react";
import axios from "../../axios";

const Signin = ({ loadUser, onRouteChange }) => {
  const [signedInEmail, setSignedInEmail] = useState("");
  const [signedInPassword, setSignedInPassword] = useState("");

  const onEmailChange = event => {
    setSignedInEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setSignedInPassword(event.target.value);
  };

  const onSubmiteSignIn = () => {
    axios
      .post("/signIn", { email: signedInEmail, password: signedInPassword })
      .then(res => {
        if (res.data.id) {
          loadUser(res.data);
          onRouteChange("home");
        }
      })
      .catch(err => console.log(err.response.status));
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={onSubmiteSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Signin;
