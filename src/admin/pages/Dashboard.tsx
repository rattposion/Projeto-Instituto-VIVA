import React, { useEffect, useState } from 'react';
// import { Chart } from 'react-chartjs-2'; // Para gráficos reais

/**
 * Página Dashboard do Admin
 * Exibe KPIs e gráfico de eventos
 */
const Dashboard: React.FC = () => {
  // KPIs simulados
  const [kpis, setKpis] = useState({
    pixels: 0,
    events: 0,
    conversions: 0,
    alerts: 0
  });
  // Dados simulados para gráfico
  const [chartData, setChartData] = useState<number[]>([12, 19, 8, 15, 22, 10, 17]);

  useEffect(() => {
    // Aqui você buscaria os dados reais da API
    setKpis({ pixels: 5, events: 1200, conversions: 87, alerts: 2 });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{kpis.pixels}</div>
          <div className="text-gray-700 dark:text-gray-200">Pixels</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold text-green-700 dark:text-green-300">{kpis.events}</div>
          <div className="text-gray-700 dark:text-gray-200">Eventos</div>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">{kpis.conversions}</div>
          <div className="text-gray-700 dark:text-gray-200">Conversões</div>
        </div>
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold text-red-700 dark:text-red-300">{kpis.alerts}</div>
          <div className="text-gray-700 dark:text-gray-200">Alertas</div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Eventos por dia (simulado)</h2>
        {/* Gráfico real pode ser adicionado com Chart.js ou Recharts */}
        <div className="flex items-end gap-2 h-40">
          {chartData.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-8 bg-blue-500 dark:bg-blue-400 rounded-t" style={{ height: `${v * 4}px` }}></div>
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-300">D{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 