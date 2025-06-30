import React, { useEffect, useState } from 'react';
import { getNews, createNews, updateNews, deleteNews } from '../../utils/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface NewsItem {
  id: number;
  title: string;
  content: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [error, setError] = useState<{ title?: string; content?: string }>({});

  const fetchData = async () => {
    setLoading(true);
    setNews(await getNews());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    if (!title) return setError({ title: 'Título obrigatório' });
    if (!content) return setError({ content: 'Conteúdo obrigatório' });
    try {
      if (editing) {
        await updateNews(editing.id, { title, content });
        setToast({ message: 'Notícia atualizada!', type: 'success' });
      } else {
        await createNews({ title, content });
        setToast({ message: 'Notícia adicionada!', type: 'success' });
      }
      setTitle(''); setContent(''); setEditing(null);
      fetchData();
    } catch {
      setToast({ message: 'Erro ao salvar notícia', type: 'error' });
    }
  };

  const handleEdit = (n: NewsItem) => {
    setEditing(n);
    setTitle(n.title);
    setContent(n.content);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await deleteNews(id);
        setToast({ message: 'Notícia excluída!', type: 'success' });
        fetchData();
      } catch {
        setToast({ message: 'Erro ao excluir notícia', type: 'error' });
      }
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Notícias</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Input
          label="Título"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          error={error.title}
          style={{ flex: 1, minWidth: 180 }}
        />
        <Input
          label="Conteúdo"
          placeholder="Conteúdo"
          value={content}
          onChange={e => setContent(e.target.value)}
          error={error.content}
          style={{ flex: 2, minWidth: 220 }}
        />
        <Button type="submit" variant="primary">
          {editing ? 'Salvar' : 'Adicionar'}
        </Button>
        {editing && (
          <Button type="button" variant="secondary" onClick={() => { setEditing(null); setTitle(''); setContent(''); }}>
            Cancelar
          </Button>
        )}
      </form>
      {loading ? <Loader /> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', overflow: 'hidden', minWidth: 400, borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #007bff 0%, #4eaf4e 100%)', color: '#fff' }}>
                <th style={{ padding: 14, textAlign: 'left', fontWeight: 600 }}>Título</th>
                <th style={{ padding: 14, textAlign: 'left', fontWeight: 600 }}>Conteúdo</th>
                <th style={{ padding: 14 }}></th>
              </tr>
            </thead>
            <tbody>
              {news.map((n, idx) => (
                <tr key={n.id} style={{
                  background: idx % 2 === 0 ? '#f8fafc' : '#e9f5ee',
                  transition: 'background 0.2s',
                  ':hover': { background: '#e0f7fa' }
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#e0f7fa')}
                onMouseOut={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#f8fafc' : '#e9f5ee')}
                >
                  <td style={{ padding: 14 }}>{n.title}</td>
                  <td style={{ padding: 14 }}>{n.content}</td>
                  <td style={{ padding: 14, display: 'flex', gap: 8 }}>
                    <Button onClick={() => handleEdit(n)} variant="primary" style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaEdit /> Editar
                    </Button>
                    <Button onClick={() => handleDelete(n.id)} variant="danger" style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaTrash /> Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default News; 