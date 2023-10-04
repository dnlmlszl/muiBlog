const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>
          ECONO<span className="navSpan">Coder</span>
        </h3>
        <p>Providing quality services since 2021.</p>
        <ul className="socials">
          <li>
            <a href="https://meta.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/dn1el_lszl0"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/l%C3%A1szl%C3%B3-d%C3%A1niel-a39a956b/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 ECONOCoder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
