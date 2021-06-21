import React, { useState } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        history.push("/admin");
      })
      .catch((error) => console.log(error));
  };

  const handleonclick = (e) => {
    e.preventDefault();
    handlesubmit();
  };

  // if (context.user?.uid) {
  //     return <Redirect to="/adminpanel"/>
  // }
  return (
    <div>
      <h1>Log in page</h1>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleonclick}>submit</button>
    </div>
  );
};

export default Login;
