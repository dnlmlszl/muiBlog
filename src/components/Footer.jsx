const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>
          BEST<span className="navSpan">Blogs</span>
        </h3>
        <p>Providing quality services since 2021.</p>
        <ul className="socials">
          <li>
            <a href="https://meta.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
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
        <p>&copy; 2024 BestBlogs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
