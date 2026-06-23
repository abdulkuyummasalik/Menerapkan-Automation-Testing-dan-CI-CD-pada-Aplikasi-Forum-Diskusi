
import { Link } from 'react-router-dom';
import { postedAt } from '../utils/date';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUpVoteThread, asyncDownVoteThread, asyncNeutralVoteThread } from '../store/threadsSlice';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

function ThreadItem({ thread, users }) {
  const { id, title, body, category, createdAt, ownerId, upVotesBy, downVotesBy, totalComments } = thread;
  const user = users.find((u) => u.id === ownerId);
  const { user: authUser } = useSelector((states) => states.auth);
  const dispatch = useDispatch();

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = (e) => {
    e.stopPropagation();
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }
    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread({ threadId: id, userId: authUser.id }));
    } else {
      dispatch(asyncUpVoteThread({ threadId: id, userId: authUser.id }));
    }
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }
    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread({ threadId: id, userId: authUser.id }));
    } else {
      dispatch(asyncDownVoteThread({ threadId: id, userId: authUser.id }));
    }
  };

  return (
    <div className="thread-card">
      <div className="thread-header">
        <div className="category-tag">#{category}</div>
        {user && (
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <span className="user-name">{user.name}</span>
          </div>
        )}
      </div>
      <Link to={`/threads/${id}`} className="thread-title">{title}</Link>
      <div style={{ color: '#6b7280', marginBottom: '12px' }}>{parse(body)}</div>
      <div className="thread-meta">
        <div className="vote-buttons">
          <button
            className={`vote-btn ${isUpVoted ? 'active-up' : ''}`}
            onClick={handleUpVote}
          >
            ↑ {upVotesBy.length}
          </button>
          <button
            className={`vote-btn ${isDownVoted ? 'active-down' : ''}`}
            onClick={handleDownVote}
          >
            ↓ {downVotesBy.length}
          </button>
        </div>
        <span>💬 {totalComments}</span>
        <span>{postedAt(createdAt)}</span>
      </div>
    </div>
  );
}
const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

ThreadItem.propTypes = {
  thread: PropTypes.shape(threadItemShape).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(userShape)).isRequired,
};

export default ThreadItem;
