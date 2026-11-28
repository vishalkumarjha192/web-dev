import { useEffect, useState } from 'react';
import { api } from '../api';
import ItemCard from '../components/ItemCard';
import { CATEGORIES } from '../constants';

const EMPTY = { type: '', category: '', place: '', from: '', to: '' };

export default function Home() {
  const [filters, setFilters] = useState(EMPTY);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  useEffect(() => {
    api(`/items?${query}`).then((d) => { setItems(d); setError(''); }).catch((e) => setError(e.message));
  }, [query]);

  const search = (e) => {
    e.preventDefault();
    setQuery(new URLSearchParams(Object.entries(filters).filter(([, v]) => v)).toString());
  };

  return (
    <>
      <h2>Lost and Found Items</h2>
      <form onSubmit={search} className="filters">
        <select name="type" value={filters.type} onChange={change}>
          <option value="">Lost and Found</option><option value="lost">Lost</option><option value="found">Found</option>
        </select>
        <select name="category" value={filters.category} onChange={change}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input name="place" placeholder="Place" value={filters.place} onChange={change} />
        <label>From <input name="from" type="date" value={filters.from} onChange={change} /></label>
        <label>To <input name="to" type="date" value={filters.to} onChange={change} /></label>
        <button>Search</button>
        <button type="button" onClick={() => { setFilters(EMPTY); setQuery(''); }}>Clear</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="grid">{items.map((i) => <ItemCard key={i._id} item={i} />)}</div>
      {!items.length && !error && <p>No items found.</p>}
    </>
  );
}
