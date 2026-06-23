import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateThread } from '../store/threadsSlice';
import { useNavigate } from 'react-router-dom';

function AddThreadPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((states) => states.threads);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncCreateThread({ title, body, category })).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <div className="page-header">
        <h2>Buat Thread Baru</h2>
      </div>
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Judul</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul thread"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Kategori</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Kategori (opsional)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Isi</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tulis isi thread..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Buat Thread'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddThreadPage;
