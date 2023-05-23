import "./Footer.css";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        <small>WASP Chat App &copy; {date}</small>
      </p>
    </footer>
  );
};

export default Footer;
