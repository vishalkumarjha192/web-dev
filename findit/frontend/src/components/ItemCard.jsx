import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
  return (
    <Link to={`/items/${item._id}`} className="card">
      {item.photoUrl && <img src={item.photoUrl} alt={item.title} />}
      <span className={`badge ${item.type}`}>{item.type}</span>
      {item.status === 'claimed' && <span className="badge">claimed</span>}
      <h3>{item.title}</h3>
      <p>{item.category} · {item.place}</p>
      <p>{new Date(item.date).toLocaleDateString('en-IN')}</p>
    </Link>
  );
}
