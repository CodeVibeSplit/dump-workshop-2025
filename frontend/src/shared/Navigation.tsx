import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  const hideNav = location.pathname != '/';
  return !hideNav &&  <nav style={{ display: 'flex', gap: '1rem' }}>
  <Link to="/admin">
    <button>Admin</button>
  </Link>
  <Link to="/player">
    <button>Player</button>
  </Link>
  </nav>
}
