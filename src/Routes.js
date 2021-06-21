import { BrowserRouter, Switch, Route } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./utils/firebaseConfig";

// components
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import AdminPanel from "./admin/AdminPanel";
import HomePage from "./forms/Homepage";
import Pagenotfound from "./Pagenotfound";

import "bootstrap/dist/css/bootstrap.min.css";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(firebaseConfig);
}

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={AdminPanel} />
        <Route exact path="*" component={Pagenotfound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
