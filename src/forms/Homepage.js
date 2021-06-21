import mainpage from "../assets/mainpage.png";
import signin from "../assets/signin.png";
import measurement from "../assets/measurement.png";
import logo from "../assets/logo-mt.png";
import Button from "@material-ui/core/Button";
import GetApp from "@material-ui/icons/GetApp";
import { Link } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  return (
    <div>
      <div className="container top-cont mr-5">
        <h1 className="text-center">Mobi-Tailor App</h1>
        <div>
          <img src={logo} alt="logo" className="w-25 h-25" />
        </div>
        <h4 className="text-center">
          Ultimate solution for your Tailoring shop. <br />
          Now, don't think too much <br />
          Download & get started...
        </h4>
        <div>
          <a
            href="https://drive.google.com/uc?export=download&id=1_Y89QxaxIIm3GiiVhk8MY2OZpjQVILRz"
            download="Comp_Books"
          >
            <Button variant="contained" color="primary" endIcon={<GetApp />}>
              Download the App
            </Button>
          </a>
        </div>
      </div>

      <div className="card-container">
        <img src={signin} alt="ss5" />
        <img src={mainpage} alt="ss4" />
        <img src={measurement} alt="ss3" />
      </div>
      <div className="container foot">
        <footer>
          <Button variant="contained" color="secondary">
            <Link to="/login">Admin</Link>
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;
