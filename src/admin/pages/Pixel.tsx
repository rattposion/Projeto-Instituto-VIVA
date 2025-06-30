import React, { useEffect, useState } from 'react';
import { getPixel, createPixel, updatePixel, deletePixel } from '../../utils/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface PixelConfig {
  id: number;
  pixelId: string;
  enabled: boolean;
}

const Pixel: React.FC = () => {
  const [pixels, setPixels] = useState<PixelConfig[]>([]);
  const [editing, setEditing] = useState<PixelConfig | null>(null);
  const [pixelId, setPixelId] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [error, setError] = useState<{ pixelId?: string }>({});

  const fetchData = async () => {
    setLoading(true);
    setPixels(await getPixel());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    if (!pixelId) return setError({ pixelId: 'Pixel ID obrigatório' });
    try {
      if (editing) {
        await updatePixel(editing.id, { pixelId, enabled });
        setToast({ message: 'Pixel atualizado!', type: 'success' });
      } else {
        await createPixel({ pixelId, enabled });
        setToast({ message: 'Pixel adicionado!', type: 'success' });
      }
      setPixelId(''); setEnabled(true); setEditing(null);
      fetchData();
    } catch {
      setToast({ message: 'Erro ao salvar Pixel', type: 'error' });
    }
  };

  const handleEdit = (item: PixelConfig) => {
    setEditing(item);
    setPixelId(item.pixelId);
    setEnabled(item.enabled);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await deletePixel(id);
        setToast({ message: 'Pixel excluído!', type: 'success' });
        fetchData();
      } catch {
        setToast({ message: 'Erro ao excluir Pixel', type: 'error' });
      }
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Configuração do Facebook Pixel</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Input
          label="Pixel ID"
          placeholder="Pixel ID"
          value={pixelId}
          onChange={e => setPixelId(e.target.value)}
          error={error.pixelId}
          style={{ flex: 2, minWidth: 180 }}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={e => setEnabled(e.target.checked)}
            style={{ marginRight: 4 }}
          /> Ativo
        </label>
        <Button type="submit" variant="primary">
          {editing ? 'Salvar' : 'Adicionar'}
        </Button>
        {editing && (
          <Button type="button" variant="secondary" onClick={() => { setEditing(null); setPixelId(''); setEnabled(true); }}>
            Cancelar
          </Button>
        )}
      </form>
      {loading ? <Loader /> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', overflow: 'hidden', minWidth: 400, borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #007bff 0%, #4eaf4e 100%)', color: '#fff' }}>
                <th style={{ padding: 14, textAlign: 'left', fontWeight: 600 }}>Pixel ID</th>
                <th style={{ padding: 14, textAlign: 'left', fontWeight: 600 }}>Ativo</th>
                <th style={{ padding: 14 }}></th>
              </tr>
            </thead>
            <tbody>
              {pixels.map((item, idx) => (
                <tr key={item.id} style={{
                  background: idx % 2 === 0 ? '#f8fafc' : '#e9f5ee',
                  transition: 'background 0.2s',
                  ':hover': { background: '#e0f7fa' }
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#e0f7fa')}
                onMouseOut={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#f8fafc' : '#e9f5ee')}
                >
                  <td style={{ padding: 14 }}>{item.pixelId}</td>
                  <td style={{ padding: 14 }}>{item.enabled ? 'Sim' : 'Não'}</td>
                  <td style={{ padding: 14, display: 'flex', gap: 8 }}>
                    <Button onClick={() => handleEdit(item)} variant="primary" style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaEdit /> Editar
                    </Button>
                    <Button onClick={() => handleDelete(item.id)} variant="danger" style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
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

export default Pixel; 