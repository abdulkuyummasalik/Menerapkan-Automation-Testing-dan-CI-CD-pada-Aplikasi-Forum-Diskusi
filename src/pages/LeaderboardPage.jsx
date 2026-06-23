import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateLeaderboards } from '../store/leaderboardsSlice';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboards, isLoading } = useSelector((states) => states.leaderboards);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <div>
      <div className="page-header">
        <h2>Papan Peringkat</h2>
      </div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        leaderboards.map((item, index) => (
          <div key={item.user.id} className="leaderboard-card">
            <div className="leaderboard-rank">{index + 1}</div>
            <div className="leaderboard-user">
              <img src={item.user.avatar} alt={item.user.name} className="user-avatar" />
              <div>
                <div className="user-name">{item.user.name}</div>
                <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{item.user.email}</div>
              </div>
            </div>
            <div className="leaderboard-score">{item.score}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default LeaderboardPage;
