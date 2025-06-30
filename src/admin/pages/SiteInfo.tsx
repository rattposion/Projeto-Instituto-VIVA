import React, { useEffect, useState } from 'react';
import { getSiteInfo, createSiteInfo, updateSiteInfo, deleteSiteInfo } from '../../utils/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface SiteInfoItem {
  id: number;
  key: string;
  value: string;
}

const SiteInfo: React.FC = () => {
  const [info, setInfo] = useState<SiteInfoItem[]>([]);
  const [editing, setEditing] = useState<SiteInfoItem | null>(null);
  const [keyField, setKeyField] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [error, setError] = useState<{ key?: string; value?: string }>({});

  const fetchData = async () => {
    setLoading(true);
    setInfo(await getSiteInfo());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    if (!keyField) return setError({ key: 'Chave obrigatória' });
    if (!value) return setError({ value: 'Valor obrigatório' });
    try {
      if (editing) {
        await updateSiteInfo(editing.id, { key: keyField, value });
        setToast({ message: 'Informação atualizada!', type: 'success' });
      } else {
        await createSiteInfo({ key: keyField, value });
        setToast({ message: 'Informação adicionada!', type: 'success' });
      }
      setKeyField(''); setValue(''); setEditing(null);
      fetchData();
    } catch {
      setToast({ message: 'Erro ao salvar informação', type: 'error' });
    }
  };

  const handleEdit = (item: SiteInfoItem) => {
    setEditing(item);
    setKeyField(item.key);
    setValue(item.value);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await deleteSiteInfo(id);
        setToast({ message: 'Informação excluída!', type: 'success' });
        fetchData();
      } catch {
        setToast({ message: 'Erro ao excluir informação', type: 'error' });
      }
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Informações do Site</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Input
          label="Chave (ex: email, telefone)"
          placeholder="Chave (ex: email, telefone)"
          value={keyField}
          onChange={e => setKeyField(e.target.value)}
          error={error.key}
          style={{ flex: 1, minWidth: 180 }}
        />
        <Input
          label="Valor"
          placeholder="Valor"
          value={value}
          onChange={e => setValue(e.target.value)}
          error={error.value}
          style={{ flex: 2, minWidth: 220 }}
        />
        <Button type="submit" variant="primary">
          {editing ? 'Salvar' : 'Adicionar'}
        </Button>
        {editing && (
          <Button type="button" variant="secondary" onClick={() => { setEditing(null); setKeyField(''); setValue(''); }}>
            Cancelar
          </Button>
        )}
      </form>
      {loading ? <Loader /> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', overflow: 'hidden', minWidth: 400, borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: 'linear-gradient(90deg, #007bff 0%, #4eaf4e 100%)', color: '#fff' }}>
                <th style={{ padding: 14, textAlign: 'left', fontWeight: 600 }}>Chave</th>
                <th style={{ padding: 14, textAlign: 'left', fontWeight: 600 }}>Valor</th>
                <th style={{ padding: 14 }}></th>
              </tr>
            </thead>
            <tbody>
              {info.map((item, idx) => (
                <tr key={item.id} style={{
                  background: idx % 2 === 0 ? '#f8fafc' : '#e9f5ee',
                  transition: 'background 0.2s',
                  ':hover': { background: '#e0f7fa' }
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#e0f7fa')}
                onMouseOut={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#f8fafc' : '#e9f5ee')}
                >
                  <td style={{ padding: 14 }}>{item.key}</td>
                  <td style={{ padding: 14 }}>{item.value}</td>
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

export default SiteInfo; 