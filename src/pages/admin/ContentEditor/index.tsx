import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import api from '../../../config/api';

export function ContentEditor() {
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ page: 'home', key: '', value: '', type: 'text' });

    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        (async () => {
            try {
                await fetchItems();
            } catch (err) {
                console.error('Failed to fetch items', err);
            }
        })();
    }, [token, navigate]);

    const fetchItems = async () => {
        const res = await api.get('/content/all', { headers: { Authorization: `Bearer ${token}` } });
        setItems(res.data);
    };

    const startEdit = (item) => {
        setEditing(item.id);
        setForm({ page: item.page, key: item.key, value: item.value || '', type: item.type || 'text' });
    };

    const cancelEdit = () => {
        setEditing(null);
        setForm({ page: 'home', key: '', value: '', type: 'text' });
    };

    const save = async () => {
        try {
            if (editing) {
                await api.put(`/content/${editing}`, { value: form.value, type: form.type }, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                await api.post('/content', form, { headers: { Authorization: `Bearer ${token}` } });
            }
            fetchItems();
            cancelEdit();
            alert('Salvo com sucesso');
        } catch (err) {
            alert('Erro ao salvar');
        }
    };

    const del = async (id) => {
        if (!confirm('Excluir?')) return;
        await api.delete(`/content/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        fetchItems();
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>Editor de Conteúdo</h1>

            <div style={{ marginBottom: 20 }}>
                <label>Page</label>
                <select value={form.page} onChange={e => setForm({ ...form, page: e.target.value })}>
                    <option value="home">home</option>
                    <option value="sobre">sobre</option>
                    <option value="footer">footer</option>
                </select>

                <label>Key</label>
                <input value={form.key} onChange={e => setForm({ ...form, key: e.target.value })} />

                <label>Value</label>
                <textarea value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />

                <label>Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="text">text</option>
                    <option value="html">html</option>
                    <option value="json">json</option>
                    <option value="image">image</option>
                </select>

                <button onClick={save}>{editing ? 'Atualizar' : 'Criar'}</button>
                {editing && <button onClick={cancelEdit}>Cancelar</button>}
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>id</th><th>page</th><th>key</th><th>value</th><th>type</th><th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(it => (
                        <tr key={it.id}>
                            <td>{it.id}</td>
                            <td>{it.page}</td>
                            <td>{it.key}</td>
                            <td style={{ maxWidth: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.value}</td>
                            <td>{it.type}</td>
                            <td>
                                <button onClick={() => startEdit(it)}>Editar</button>
                                <button onClick={() => del(it.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
