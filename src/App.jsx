import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unsetAuthUser } from './store/authSlice';
import { asyncPreloadProcess } from './store/isPreloadSlice';
import LoadingBar from 'react-redux-loading-bar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailThreadPage from './pages/DetailThreadPage';
import AddThreadPage from './pages/AddThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((states) => states.auth);
  const { isPreload } = useSelector((states) => states.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(unsetAuthUser());
  };

  if (isPreload) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <LoadingBar style={{ backgroundColor: '#2196f3', height: '4px', zIndex: 9999, position: 'fixed', top: 0 }} />
      <header className="header">
        <div className="header-content">
          <Link to="/">Dicoding Forum</Link>
          <nav className="nav-links">
            <Link to="/">Threads</Link>
            <Link to="/leaderboards">Leaderboard</Link>
            {user ? (
              <>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={user.avatar} alt={user.name} className="user-avatar" />
                  {user.name}
                </span>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">Keluar</button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">Masuk</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/threads/:id" element={<DetailThreadPage />} />
          <Route path="/threads/new" element={<AddThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
