import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  Search,
  Filter,
  Download,
  Eye,
  Zap,
  Globe,
  Server,
  Smartphone
} from 'lucide-react';

const Diagnostics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);

  // Mock data
  const diagnostics = [
    {
      id: '1',
      pixelName: 'E-commerce Principal',
      pixelId: '123456789012345',
      severity: 'error',
      category: 'implementation',
      title: 'Pixel não encontrado na página',
      description: 'O código do pixel não foi detectado na página de checkout',
      url: 'https://exemplo.com/checkout',
      lastChecked: new Date(Date.now() - 5 * 60 * 1000),
      status: 'active'
    },
    {
      id: '2',
      pixelName: 'Landing Page Promo',
      pixelId: '987654321098765',
      severity: 'warning',
      category: 'events',
      title: 'Evento Purchase sem parâmetros obrigatórios',
      description: 'O evento Purchase está sendo enviado sem os parâmetros value e currency',
      url: 'https://exemplo.com/promo',
      lastChecked: new Date(Date.now() - 15 * 60 * 1000),
      status: 'active'
    },
    {
      id: '3',
      pixelName: 'Blog Corporativo',
      pixelId: '456789123456789',
      severity: 'info',
      category: 'performance',
      title: 'Baixo volume de eventos',
      description: 'O pixel está recebendo menos eventos que o esperado nas últimas 24 horas',
      url: 'https://blog.exemplo.com',
      lastChecked: new Date(Date.now() - 30 * 60 * 1000),
      status: 'resolved'
    },
    {
      id: '4',
      pixelName: 'App Mobile',
      pixelId: '789123456789123',
      severity: 'error',
      category: 'connection',
      title: 'Falha na conexão com Meta API',
      description: 'Não foi possível estabelecer conexão com a API do Meta para envio de eventos',
      url: 'N/A (Mobile App)',
      lastChecked: new Date(Date.now() - 45 * 60 * 1000),
      status: 'active'
    },
    {
      id: '5',
      pixelName: 'E-commerce Principal',
      pixelId: '123456789012345',
      severity: 'success',
      category: 'implementation',
      title: 'Implementação correta',
      description: 'Pixel implementado corretamente e enviando eventos conforme esperado',
      url: 'https://exemplo.com',
      lastChecked: new Date(Date.now() - 2 * 60 * 1000),
      status: 'resolved'
    }
  ];

  const healthScore = {
    overall: 78,
    implementation: 85,
    events: 72,
    performance: 80,
    connection: 75
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'implementation':
        return <Globe className="w-4 h-4" />;
      case 'events':
        return <Zap className="w-4 h-4" />;
      case 'performance':
        return <RefreshCw className="w-4 h-4" />;
      case 'connection':
        return <Server className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
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

  const runDiagnostic = async () => {
    setIsRunningDiagnostic(true);
    // Simular diagnóstico
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRunningDiagnostic(false);
  };

  const filteredDiagnostics = diagnostics.filter(diagnostic => {
    const matchesSearch = diagnostic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diagnostic.pixelName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || diagnostic.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Diagnósticos</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitore a saúde e performance dos seus pixels
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Relatório
          </button>
          <button
            onClick={runDiagnostic}
            disabled={isRunningDiagnostic}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRunningDiagnostic ? 'animate-spin' : ''}`} />
            {isRunningDiagnostic ? 'Executando...' : 'Executar Diagnóstico'}
          </button>
        </div>
      </div>

      {/* Health Score */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Pontuação de Saúde
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getHealthColor(healthScore.overall)}`}>
              {healthScore.overall}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Geral</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getHealthColor(healthScore.implementation)}`}>
              {healthScore.implementation}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Implementação</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getHealthColor(healthScore.events)}`}>
              {healthScore.events}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Eventos</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getHealthColor(healthScore.performance)}`}>
              {healthScore.performance}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Performance</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getHealthColor(healthScore.connection)}`}>
              {healthScore.connection}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Conexão</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar diagnósticos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todas as Severidades</option>
          <option value="error">Erro</option>
          <option value="warning">Aviso</option>
          <option value="info">Informação</option>
          <option value="success">Sucesso</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Erros Críticos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {diagnostics.filter(d => d.severity === 'error' && d.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avisos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {diagnostics.filter(d => d.severity === 'warning' && d.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolvidos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {diagnostics.filter(d => d.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Itens</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{diagnostics.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Resultados do Diagnóstico
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Problema
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pixel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Severidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Última Verificação
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDiagnostics.map((diagnostic) => (
                <tr key={diagnostic.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      {getSeverityIcon(diagnostic.severity)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {diagnostic.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {diagnostic.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{diagnostic.pixelName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{diagnostic.pixelId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(diagnostic.severity)}`}>
                      {diagnostic.severity === 'error' ? 'Erro' : 
                       diagnostic.severity === 'warning' ? 'Aviso' : 
                       diagnostic.severity === 'info' ? 'Info' : 'Sucesso'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900 dark:text-white">
                      {getCategoryIcon(diagnostic.category)}
                      <span className="ml-2 capitalize">{diagnostic.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                    {diagnostic.url}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(diagnostic.lastChecked)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;