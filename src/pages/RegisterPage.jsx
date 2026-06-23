import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((states) => states.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password })).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="auth-card">
      <h2>Daftar</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama kamu"
            required
          />
        </div>
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
            minLength={6}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Daftar'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '16px' }}>
        Sudah punya akun? <Link to="/login">Masuk</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
