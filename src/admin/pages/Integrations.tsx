import React, { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext'; // Descomente se usar contexto

/**
 * Página de Integrações do Admin
 * Exibe instruções e webhooks
 */
const Integrations: React.FC = () => {
  const [instructions, setInstructions] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const { token } = useAuth(); // Descomente se usar contexto

  // Buscar instruções da API
  useEffect(() => {
    const fetchInstructions = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/integrations/instructions'); // Sem header Authorization
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao buscar instruções');
        setInstructions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Integrações</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Instruções</h2>
            <ul className="list-disc pl-6">
              <li><b>GTM:</b> {instructions.gtm}</li>
              <li><b>WordPress:</b> {instructions.wordpress}</li>
              <li><b>Shopify:</b> {instructions.shopify}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Webhooks</h2>
            <p className="mb-2">Cadastre webhooks para WhatsApp, Discord, CRM, etc.</p>
            {/* Aqui você pode adicionar formulário/listagem de webhooks */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar Webhook</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Integrations; 