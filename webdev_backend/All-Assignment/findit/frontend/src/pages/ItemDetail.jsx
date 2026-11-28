import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';

export default function ItemDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [claims, setClaims] = useState([]);
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    try {
      const data = await api(`/items/${id}`);
      setItem(data);
      setMatches(data.type === 'lost' ? await api(`/items/${id}/matches`) : []);
      const isOwner = data.postedBy?._id === user.id;
      setClaims(isOwner && data.type === 'found' ? await api(`/claims/item/${id}`) : []);
    } catch (e) { setNotice(e.message); }
  }, [id, user.id]);

  useEffect(() => { setItem(null); setNotice(''); load(); }, [load]);

  const run = async (action, success) => {
    try { await action(); setNotice(success); await load(); } catch (e) { setNotice(e.message); }
  };

  const claim = (e) => {
    e.preventDefault();
    run(async () => { await api(`/claims/item/${id}`, { method: 'POST', body: { message } }); setMessage(''); }, 'Claim sent to the finder');
  };

  const decide = (claimId, status) =>
    run(() => api(`/claims/${claimId}`, { method: 'PATCH', body: { status } }), `Claim ${status}`);

  const remove = async (path) => {
    if (!window.confirm('Delete this post?')) return;
    try { await api(path, { method: 'DELETE' }); navigate('/'); } catch (e) { setNotice(e.message); }
  };

  if (!item) return <p>{notice || 'Loading...'}</p>;
  const isOwner = item.postedBy?._id === user.id;

  return (
    <>
      <div className="box wide">
        {item.photoUrl && <img src={item.photoUrl} alt={item.title} />}
        <span className={`badge ${item.type}`}>{item.type}</span> <span className="badge">{item.status}</span>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p><b>Category:</b> {item.category}</p>
        <p><b>Place:</b> {item.place}</p>
        <p><b>Date:</b> {new Date(item.date).toLocaleDateString('en-IN')}</p>
        <p><b>Posted by:</b> {item.postedBy?.name} ({item.postedBy?.email})</p>
        {isOwner && <><Link to={`/items/${id}/edit`}>Edit</Link> <button onClick={() => remove(`/items/${id}`)}>Delete</button></>}
        {user.role === 'admin' && <button className="danger" onClick={() => remove(`/admin/items/${id}`)}>Remove fake post</button>}
      </div>
      {notice && <p className="notice">{notice}</p>}

      {!isOwner && item.type === 'found' && item.status === 'open' && (
        <form onSubmit={claim} className="box wide">
          <h3>Claim this item</h3>
          <textarea placeholder="Describe a detail that proves it is yours" value={message} onChange={(e) => setMessage(e.target.value)} required minLength={5} />
          <button>Send claim</button>
        </form>
      )}

      {isOwner && item.type === 'found' && (
        <div className="box wide">
          <h3>Claims</h3>
          {!claims.length && <p>No claims yet.</p>}
          {claims.map((c) => (
            <div key={c._id} className="row">
              <p><b>{c.claimant?.name}</b> ({c.claimant?.email}): {c.message} [{c.status}]</p>
              {c.status === 'pending' && <><button onClick={() => decide(c._id, 'approved')}>Approve</button> <button onClick={() => decide(c._id, 'rejected')}>Reject</button></>}
            </div>
          ))}
        </div>
      )}

      {item.type === 'lost' && (
        <>
          <h3>Possible matches</h3>
          {!matches.length && <p>No possible matches yet.</p>}
          <div className="grid">{matches.map((m) => <ItemCard key={m._id} item={m} />)}</div>
        </>
      )}
    </>
  );
}
