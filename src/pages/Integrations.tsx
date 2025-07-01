import React, { useState } from 'react';
import { 
  Puzzle, 
  Plus, 
  Search,
  Settings,
  Trash2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  Webhook
} from 'lucide-react';
import toast from 'react-hot-toast';

const Integrations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const integrations = [
    {
      id: '1',
      name: 'Google Tag Manager',
      type: 'gtm',
      description: 'Gerencie seus pixels através do Google Tag Manager',
      status: 'active',
      lastSync: new Date(Date.now() - 30 * 60 * 1000),
      config: {
        containerId: 'GTM-XXXXXXX',
        workspaceId: '12345'
      },
      pixelsConnected: 3
    },
    {
      id: '2',
      name: 'WordPress Plugin',
      type: 'wordpress',
      description: 'Plugin oficial para sites WordPress',
      status: 'active',
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
      config: {
        siteUrl: 'https://meusite.com.br',
        version: '2.1.0'
      },
      pixelsConnected: 1
    },
    {
      id: '3',
      name: 'Shopify App',
      type: 'shopify',
      description: 'Integração nativa com lojas Shopify',
      status: 'inactive',
      lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
      config: {
        shopDomain: 'minhaloja.myshopify.com',
        appVersion: '1.5.2'
      },
      pixelsConnected: 0
    },
    {
      id: '4',
      name: 'Webhook Personalizado',
      type: 'webhook',
      description: 'Receba eventos via webhook HTTP',
      status: 'error',
      lastSync: new Date(Date.now() - 6 * 60 * 60 * 1000),
      config: {
        endpoint: 'https://api.exemplo.com/webhook',
        secret: '***hidden***'
      },
      pixelsConnected: 2
    }
  ];

  const availableIntegrations = [
    {
      type: 'gtm',
      name: 'Google Tag Manager',
      description: 'Gerencie todos os seus pixels através do GTM',
      icon: Code,
      category: 'Tag Management'
    },
    {
      type: 'wordpress',
      name: 'WordPress',
      description: 'Plugin oficial para sites WordPress',
      icon: Globe,
      category: 'CMS'
    },
    {
      type: 'shopify',
      name: 'Shopify',
      description: 'Integração nativa com lojas Shopify',
      icon: Smartphone,
      category: 'E-commerce'
    },
    {
      type: 'webhook',
      name: 'Webhook',
      description: 'Integração personalizada via HTTP',
      icon: Webhook,
      category: 'API'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gtm': return <Code className="w-5 h-5" />;
      case 'wordpress': return <Globe className="w-5 h-5" />;
      case 'shopify': return <Smartphone className="w-5 h-5" />;
      case 'webhook': return <Webhook className="w-5 h-5" />;
      default: return <Puzzle className="w-5 h-5" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    integration.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddIntegration = (type: string) => {
    setShowAddModal(false);
    toast.success(`Integração ${type} adicionada com sucesso!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Integrações</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Conecte seus pixels com outras plataformas e ferramentas
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Integração
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar integrações..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Puzzle className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Integrações</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{integrations.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ativas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {integrations.filter(i => i.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Com Problemas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {integrations.filter(i => i.status === 'error').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <ExternalLink className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pixels Conectados</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {integrations.reduce((sum, i) => sum + i.pixelsConnected, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
                  {getTypeIcon(integration.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {integration.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(integration.status)}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                  {integration.status === 'active' ? 'Ativo' : 
                   integration.status === 'inactive' ? 'Inativo' : 'Erro'}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Pixels conectados:</span>
                <span className="font-medium text-gray-900 dark:text-white">{integration.pixelsConnected}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Última sincronização:</span>
                <span className="font-medium text-gray-900 dark:text-white">{formatTimeAgo(integration.lastSync)}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </button>
              <button className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Integration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)} />
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-6">
                  Adicionar Nova Integração
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableIntegrations.map((integration) => {
                    const Icon = integration.icon;
                    return (
                      <div
                        key={integration.type}
                        onClick={() => handleAddIntegration(integration.type)}
                        className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
                            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {integration.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {integration.description}
                            </p>
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded mt-2">
                              {integration.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integrations;