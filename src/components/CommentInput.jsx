import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncCreateComment } from '../store/threadDetailSlice';
import PropTypes from 'prop-types';

function CommentInput({ threadId }) {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(asyncCreateComment({ threadId, content }));
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-card" style={{ margin: '0 0 24px 0' }}>
      <div className="form-group">
        <label htmlFor="content">Berikan Komentar</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis komentarmu..."
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Kirim Komentar</button>
    </form>
  );
}

CommentInput.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default CommentInput;
