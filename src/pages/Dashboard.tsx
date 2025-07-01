import React from 'react';
import { 
  Target, 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  // Mock data
  const stats = [
    {
      title: 'Pixels Ativos',
      value: '12',
      change: '+2',
      changeType: 'positive' as const,
      icon: Target,
      color: 'blue'
    },
    {
      title: 'Eventos Hoje',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Conversões',
      value: '156',
      change: '+8%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Receita',
      value: 'R$ 45.2K',
      change: '-3%',
      changeType: 'negative' as const,
      icon: DollarSign,
      color: 'yellow'
    }
  ];

  const eventsData = [
    { name: 'Seg', events: 1200, conversions: 45 },
    { name: 'Ter', events: 1900, conversions: 67 },
    { name: 'Qua', events: 1600, conversions: 52 },
    { name: 'Qui', events: 2200, conversions: 78 },
    { name: 'Sex', events: 2847, conversions: 89 },
    { name: 'Sáb', events: 1800, conversions: 56 },
    { name: 'Dom', events: 1400, conversions: 42 }
  ];

  const topEvents = [
    { name: 'PageView', value: 45, color: '#3B82F6' },
    { name: 'AddToCart', value: 25, color: '#10B981' },
    { name: 'Purchase', value: 15, color: '#F59E0B' },
    { name: 'Lead', value: 10, color: '#EF4444' },
    { name: 'Outros', value: 5, color: '#6B7280' }
  ];

  const recentPixels = [
    { id: '1', name: 'E-commerce Principal', pixelId: '123456789', status: 'active', events: 1247, lastActivity: '2 min atrás' },
    { id: '2', name: 'Landing Page Promo', pixelId: '987654321', status: 'active', events: 856, lastActivity: '5 min atrás' },
    { id: '3', name: 'Blog Corporativo', pixelId: '456789123', status: 'inactive', events: 0, lastActivity: '2 horas atrás' },
    { id: '4', name: 'App Mobile', pixelId: '789123456', status: 'error', events: 234, lastActivity: '1 hora atrás' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'error': return 'Erro';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visão geral dos seus pixels e eventos do Meta Pixel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs. semana passada</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Eventos e Conversões (7 dias)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={eventsData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-gray-600" />
              <YAxis className="text-gray-600" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="events" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Eventos"
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Conversões"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Eventos Mais Frequentes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topEvents}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {topEvents.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {topEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: event.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {event.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {event.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Pixels */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pixels Recentes
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pixel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Eventos Hoje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Última Atividade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentPixels.map((pixel) => (
                <tr key={pixel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {pixel.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {pixel.pixelId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pixel.status)}`}>
                      {getStatusText(pixel.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {pixel.events.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {pixel.lastActivity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Atenção Necessária
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              O pixel "Blog Corporativo" está inativo há 2 horas. Verifique a implementação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;