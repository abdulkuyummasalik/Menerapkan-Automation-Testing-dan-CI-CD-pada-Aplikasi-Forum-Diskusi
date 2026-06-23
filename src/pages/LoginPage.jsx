import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAuthUser } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((states) => states.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncSetAuthUser({ email, password })).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="auth-card">
      <h2>Masuk</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Masuk'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px' }}>
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </div>
  );
}

export default LoginPage;
