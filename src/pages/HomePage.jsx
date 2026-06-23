import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateThreads } from '../store/threadsSlice';
import { asyncPopulateUsers } from '../store/usersSlice';
import { setCategoryFilter } from '../store/categoryFilterSlice';
import ThreadItem from '../components/ThreadItem';
import { Link } from 'react-router-dom';

function HomePage() {
  const dispatch = useDispatch();
  const { threads, isLoading } = useSelector((states) => states.threads);
  const { users } = useSelector((states) => states.users);
  const { category } = useSelector((states) => states.categoryFilter);
  const { user: authUser } = useSelector((states) => states.auth);

  useEffect(() => {
    dispatch(asyncPopulateThreads());
    dispatch(asyncPopulateUsers());
  }, [dispatch]);

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const filteredThreads = category
    ? threads.filter((thread) => thread.category === category)
    : threads;

  return (
    <div>
      <div className="page-header">
        <h2>Daftar Thread</h2>
        {authUser && (
          <Link to="/threads/new" className="btn btn-primary">Buat Thread</Link>
        )}
      </div>
      {threads.length > 0 && (
        <div className="filter-section">
          <button
            className={`filter-btn ${!category ? 'active' : ''}`}
            onClick={() => dispatch(setCategoryFilter(null))}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => dispatch(setCategoryFilter(cat))}
            >
              #{cat}
            </button>
          ))}
        </div>
      )}
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        filteredThreads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} users={users} />
        ))
      )}
    </div>
  );
}

export default HomePage;
