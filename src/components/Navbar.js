import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link> |
      <span>&nbsp;</span>
      <Link to="/search">Search</Link>
    </div>
  );
}

export default Navbar;
