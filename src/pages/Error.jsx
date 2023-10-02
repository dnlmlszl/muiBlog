import { Link } from 'react-router-dom';
import img from '../assets/not-found.svg';

const Error = () => {
  return (
    <section className="error-page">
      <img src={img} alt="not found" />
      <h3>Ohh!</h3>
      <p>We can't seem to find page you are looking for</p>
      <Link to="/">back home</Link>
    </section>
  );
};

export default Error;
