import { useEffect, useState } from 'react';
import { api } from '../api';
import ItemCard from '../components/ItemCard';

export default function MyActivity() {
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api('/items?mine=true'), api('/claims/mine')])
      .then(([i, c]) => { setItems(i); setClaims(c); })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <>
      {error && <p className="error">{error}</p>}
      <h2>My Posts</h2>
      {!items.length && <p>You have not posted anything.</p>}
      <div className="grid">{items.map((i) => <ItemCard key={i._id} item={i} />)}</div>
      <h2>My Claims</h2>
      {!claims.length && <p>No claims yet.</p>}
      <ul>{claims.map((c) => <li key={c._id}>{c.item?.title || 'Removed item'}: <b>{c.status}</b></li>)}</ul>
    </>
  );
}
