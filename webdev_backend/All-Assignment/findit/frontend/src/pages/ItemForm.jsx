import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { CATEGORIES } from '../constants';

export default function ItemForm() {
  const { id } = useParams(); // present only when editing
  const navigate = useNavigate();
  const [form, setForm] = useState({ type: 'lost', title: '', description: '', category: CATEGORIES[0], place: '', date: '', photoUrl: '' });
  const [error, setError] = useState('');
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Resize the chosen image and keep it as text, so it is stored in MongoDB
  const upload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 800 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setForm((old) => ({ ...old, photoUrl: canvas.toDataURL('image/jpeg', 0.8) }));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => setError('Please choose a valid image file');
    img.src = URL.createObjectURL(file);
  };

  useEffect(() => {
    if (id) api(`/items/${id}`).then((i) => setForm({ ...i, date: i.date.slice(0, 10) })).catch((e) => setError(e.message));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const saved = await api(id ? `/items/${id}` : '/items', { method: id ? 'PUT' : 'POST', body: form });
      navigate(`/items/${saved._id}`);
    } catch (err) { setError(err.message); }
  };

  return (
    <form onSubmit={submit} className="box">
      <h2>{id ? 'Edit Post' : 'Post an Item'}</h2>
      <select name="type" value={form.type} onChange={change} disabled={Boolean(id)}>
        <option value="lost">I lost this</option><option value="found">I found this</option>
      </select>
      <input name="title" placeholder="Title (e.g. Black Dell laptop charger)" value={form.title} onChange={change} required minLength={3} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={change} />
      <select name="category" value={form.category} onChange={change}>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <input name="place" placeholder="Place" value={form.place} onChange={change} required />
      <input name="date" type="date" value={form.date} onChange={change} required />
      <label>Upload photo (optional) <input type="file" accept="image/*" onChange={upload} /></label>
      {form.photoUrl.startsWith('data:') ? (
        <button type="button" className="danger" onClick={() => setForm({ ...form, photoUrl: '' })}>Remove uploaded photo</button>
      ) : (
        <input name="photoUrl" type="url" placeholder="Or paste a photo URL" value={form.photoUrl} onChange={change} />
      )}
      {form.photoUrl && <img src={form.photoUrl} alt="Preview" />}
      {error && <p className="error">{error}</p>}
      <button>Save</button>
    </form>
  );
}
