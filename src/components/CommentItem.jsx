
import { postedAt } from '../utils/date';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUpVoteCommentDetail, asyncDownVoteCommentDetail, asyncNeutralVoteCommentDetail } from '../store/threadDetailSlice';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

function CommentItem({ comment, threadId }) {
  const { id, content, createdAt, owner, upVotesBy, downVotesBy } = comment;
  const { user: authUser } = useSelector((states) => states.auth);
  const dispatch = useDispatch();

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = () => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }
    if (isUpVoted) {
      dispatch(asyncNeutralVoteCommentDetail({ threadId, commentId: id, userId: authUser.id }));
    } else {
      dispatch(asyncUpVoteCommentDetail({ threadId, commentId: id, userId: authUser.id }));
    }
  };

  const handleDownVote = () => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }
    if (isDownVoted) {
      dispatch(asyncNeutralVoteCommentDetail({ threadId, commentId: id, userId: authUser.id }));
    } else {
      dispatch(asyncDownVoteCommentDetail({ threadId, commentId: id, userId: authUser.id }));
    }
  };

  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="user-info">
          <img src={owner.avatar} alt={owner.name} className="user-avatar" />
          <span className="user-name">{owner.name}</span>
        </div>
        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{postedAt(createdAt)}</span>
      </div>
      <div className="comment-content">{parse(content)}</div>
      <div className="vote-buttons" style={{ marginTop: '12px' }}>
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
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  comment: PropTypes.shape(commentItemShape).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;
