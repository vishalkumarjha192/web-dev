import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export default function Admin() {
  const [report, setReport] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    Promise.all([api('/admin/report'), api('/items')])
      .then(([r, i]) => { setReport(r); setItems(i); })
      .catch((e) => setError(e.message));
  }, []);

  useEffect(load, [load]);

  const remove = async (id) => {
    if (!window.confirm('Remove this fake post?')) return;
    try { await api(`/admin/items/${id}`, { method: 'DELETE' }); load(); } catch (e) { setError(e.message); }
  };

  return (
    <>
      <h2>Category Report</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead><tr><th>Category</th><th>Total</th><th>Lost</th><th>Found</th><th>Claimed</th></tr></thead>
        <tbody>{report.map((r) => <tr key={r.category}><td>{r.category}</td><td>{r.total}</td><td>{r.lost}</td><td>{r.found}</td><td>{r.claimed}</td></tr>)}</tbody>
      </table>
      <h2>Manage Posts</h2>
      <table>
        <thead><tr><th>Title</th><th>Type</th><th>Posted by</th><th>Action</th></tr></thead>
        <tbody>{items.map((i) => (
          <tr key={i._id}><td><Link to={`/items/${i._id}`}>{i.title}</Link></td><td>{i.type}</td><td>{i.postedBy?.name}</td>
            <td><button className="danger" onClick={() => remove(i._id)}>Remove</button></td></tr>
        ))}</tbody>
      </table>
    </>
  );
}
