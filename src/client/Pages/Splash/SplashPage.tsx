import { Link } from "react-router-dom";
import "./Splash.css";

const SplashPage = () => {

  return (
    <section className="splash__container">
      <div className="image__container">
        <img
          src="https://wasp-lang.dev/img/wasp-logo-eqpar-circle.png"
          alt="WASP Logo"
        />
      </div>
      <h1>WASP CHAT APP</h1>
      <p>
        A chat app built with WASP and an attempt at a secure P2P connection
        using the built-in WASP server.
      </p>
      <Link to="/chat">
        <button className="button__gotochat" type="button">
          Go to Chat
        </button>
      </Link>
    </section>
  );
};

export default SplashPage;
