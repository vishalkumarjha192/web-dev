import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav>
      <Link to="/" className="brand">FindIt</Link>
      {user ? (
        <div>
          <Link to="/">Browse</Link>
          <Link to="/post">Post Item</Link>
          <Link to="/my">My Activity</Link>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
          <button onClick={logout}>Logout ({user.name})</button>
        </div>
      ) : (
        <div><Link to="/login">Login</Link><Link to="/register">Register</Link></div>
      )}
    </nav>
  );
}
