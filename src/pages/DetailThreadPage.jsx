import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateDetailThread, clearDetailThread, asyncUpVoteThreadDetail, asyncDownVoteThreadDetail, asyncNeutralVoteThreadDetail } from '../store/threadDetailSlice';
import { postedAt } from '../utils/date';
import CommentItem from '../components/CommentItem';
import CommentInput from '../components/CommentInput';
import parse from 'html-react-parser';

function DetailThreadPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailThread, isLoading } = useSelector((states) => states.threadDetail);
  const { user: authUser } = useSelector((states) => states.auth);

  useEffect(() => {
    dispatch(asyncPopulateDetailThread(id));
    return () => {
      dispatch(clearDetailThread());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!detailThread) {
    return null;
  }

  const { title, body, category, createdAt, owner, upVotesBy, downVotesBy, comments } = detailThread;

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const handleUpVote = () => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }
    if (isUpVoted) {
      dispatch(asyncNeutralVoteThreadDetail({ threadId: id, userId: authUser.id }));
    } else {
      dispatch(asyncUpVoteThreadDetail({ threadId: id, userId: authUser.id }));
    }
  };

  const handleDownVote = () => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu');
      return;
    }
    if (isDownVoted) {
      dispatch(asyncNeutralVoteThreadDetail({ threadId: id, userId: authUser.id }));
    } else {
      dispatch(asyncDownVoteThreadDetail({ threadId: id, userId: authUser.id }));
    }
  };

  return (
    <div>
      <div className="detail-thread">
        <div className="category-tag" style={{ marginBottom: '12px' }}>#{category}</div>
        <h2 className="thread-title">{title}</h2>
        <div className="user-info" style={{ marginBottom: '16px' }}>
          <img src={owner.avatar} alt={owner.name} className="user-avatar" />
          <span className="user-name">{owner.name}</span>
          <span style={{ color: '#6b7280' }}>• {postedAt(createdAt)}</span>
        </div>
        <div className="thread-body">{parse(body)}</div>
        <div className="vote-buttons" style={{ marginTop: '20px' }}>
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
      <div className="comments-section">
        <h3>Komentar ({comments.length})</h3>
        {authUser && <CommentInput threadId={id} />}
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} threadId={id} />
        ))}
      </div>
    </div>
  );
}

export default DetailThreadPage;
