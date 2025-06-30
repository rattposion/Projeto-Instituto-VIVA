import React, { useEffect, useState } from 'react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../utils/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [error, setError] = useState<{ name?: string; text?: string }>({});

  const fetchData = async () => {
    setLoading(true);
    setTestimonials(await getTestimonials());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    if (!name) return setError({ name: 'Nome obrigatório' });
    if (!text) return setError({ text: 'Depoimento obrigatório' });
    try {
      if (editing) {
        await updateTestimonial(editing.id, { name, text });
        setToast({ message: 'Depoimento atualizado!', type: 'success' });
      } else {
        await createTestimonial({ name, text });
        setToast({ message: 'Depoimento adicionado!', type: 'success' });
      }
      setName(''); setText(''); setEditing(null);
      fetchData();
    } catch {
      setToast({ message: 'Erro ao salvar depoimento', type: 'error' });
    }
  };

  const handleEdit = (t: Testimonial) => {
    setEditing(t);
    setName(t.name);
    setText(t.text);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await deleteTestimonial(id);
        setToast({ message: 'Depoimento excluído!', type: 'success' });
        fetchData();
      } catch {
        setToast({ message: 'Erro ao excluir depoimento', type: 'error' });
      }
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Depoimentos</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Input
          label="Nome"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          error={error.name}
          style={{ flex: 1, minWidth: 180 }}
        />
        <Input
          label="Depoimento"
          placeholder="Depoimento"
          value={text}
          onChange={e => setText(e.target.value)}
          error={error.text}
          style={{ flex: 2, minWidth: 220 }}
        />
        <Button type="submit" variant="primary">
          {editing ? 'Salvar' : 'Adicionar'}
        </Button>
        {editing && (
          <Button type="button" variant="secondary" onClick={() => { setEditing(null); setName(''); setText(''); }}>
            Cancelar
          </Button>
        )}
      </form>
      {loading ? <Loader /> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', overflow: 'hidden', minWidth: 400, borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #007bff 0%, #4eaf4e 100%)', color: '#fff' }}>
                <th style={{ padding: 14, textAlign: 'left', fontWeight: 600 }}>Nome</th>
                <th style={{ padding: 14, textAlign: 'left', fontWeight: 600 }}>Depoimento</th>
                <th style={{ padding: 14 }}></th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t, idx) => (
                <tr key={t.id} style={{
                  background: idx % 2 === 0 ? '#f8fafc' : '#e9f5ee',
                  transition: 'background 0.2s',
                  ':hover': { background: '#e0f7fa' }
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#e0f7fa')}
                onMouseOut={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#f8fafc' : '#e9f5ee')}
                >
                  <td style={{ padding: 14 }}>{t.name}</td>
                  <td style={{ padding: 14 }}>{t.text}</td>
                  <td style={{ padding: 14, display: 'flex', gap: 8 }}>
                    <Button onClick={() => handleEdit(t)} variant="primary" style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaEdit /> Editar
                    </Button>
                    <Button onClick={() => handleDelete(t.id)} variant="danger" style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
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

export default Testimonials; 