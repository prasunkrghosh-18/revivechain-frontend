import { useEffect, useState } from 'react';
import { BarChart3, Leaf, DollarSign, Package, Download, Search, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardMetrics {
  total_items_processed: number;
  total_carbon_saved_kg: number;
  items_by_action: {
    RESTOCK: number;
    REFURBISH: number;
    RECYCLE: number;
  };
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const baseUrl = 'https://jl6kfh-8000.csb.app';
        const res = await fetch(`${baseUrl}/api/admin/metrics`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch metrics');
        }
        
        const data = await res.json();
        setMetrics(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while loading metrics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const mockCostSaved = metrics ? (metrics.total_items_processed * 14.5).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '$0.00';

  const mockRecentActivities = [
    { id: 'RET-8824', product: 'Nike Air Zoom Pegasus', condition: 'Pristine', carbonSaved: 50.5, destination: 'Local Partner - NYC', date: 'Just now', status: 'Completed' },
    { id: 'RET-8823', product: 'Sony Core Headphones', condition: 'Damaged', carbonSaved: 35.0, destination: 'Regional Repair Hub', date: '12 mins ago', status: 'In Transit' },
    { id: 'RET-8822', product: 'Generic Blender', condition: 'Broken', carbonSaved: 15.2, destination: 'Metro E-Waste', date: '1 hr ago', status: 'Processing' },
    { id: 'RET-8821', product: 'Zara Winter Jacket', condition: 'Pristine', carbonSaved: 50.5, destination: 'Local Partner - BK', date: '3 hrs ago', status: 'Completed' },
    { id: 'RET-8820', product: 'Dell UltraSharp Monitor', condition: 'Damaged', carbonSaved: 35.0, destination: 'Regional Repair Hub', date: '4 hrs ago', status: 'In Transit' },
  ];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-400 bg-red-950/20 rounded-lg border border-red-900 mx-10 mt-10">
        <p>Error loading dashboard: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Logistics Network KPI</h2>
          <p className="text-sm text-slate-400">Regional impact report and system metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-5 py-2 bg-slate-800 border border-slate-700 text-xs font-bold rounded-lg cursor-pointer hover:bg-slate-700 text-white transition-colors backdrop-blur-sm">Last 24h</span>
          <span className="px-5 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-lg cursor-pointer hover:bg-emerald-500/30 transition-colors backdrop-blur-sm">Last 7 Days</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="bg-slate-900/60 p-8 border border-slate-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-teal-400 shadow-inner">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Total Returns<br/>Processed</span>
          </div>
          <div className="text-4xl font-bold text-white tracking-tight">{metrics?.total_items_processed.toLocaleString()}</div>
          <p className="text-xs text-slate-500 font-medium mt-2 uppercase tracking-wide">Across 48 product categories</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/60 p-8 border border-slate-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-400 shadow-inner">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Scope 3 Carbon<br/>Prevented</span>
            </div>
            <div className="text-4xl font-bold text-white tracking-tight">{metrics?.total_carbon_saved_kg.toLocaleString()}<span className="text-xl ml-2 text-slate-500 font-medium">kg</span></div>
            <p className="text-xs text-emerald-400 font-bold mt-2 tracking-wide">+12.4% vs last month</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/60 p-8 border border-slate-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md relative overflow-hidden">
         <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-teal-500/10 blur-[40px] rounded-full pointer-events-none"></div>
         <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-teal-950 border border-teal-800 rounded-xl text-teal-400 shadow-inner">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">Logistics<br/>Savings</span>
            </div>
            <div className="text-4xl font-bold text-white tracking-tight">{mockCostSaved}</div>
            <p className="text-xs text-teal-400 font-bold mt-2 tracking-wide">+8.1% vs last month</p>
          </div>
        </motion.div>
      </div>

      {/* Activity Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900/60 border border-slate-800 rounded-2xl flex-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)] overflow-hidden backdrop-blur-md mb-8">
        <div className="flex justify-between items-center p-6 lg:px-8 border-b border-slate-800/50">
          <h3 className="font-bold text-white tracking-wide">Recent Routing Activities</h3>
          <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 tracking-wider">VIEW FULL LOG</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/40 text-slate-400 text-xs uppercase tracking-widest">
                <th className="px-6 lg:px-8 py-5 font-bold">Item ID</th>
                <th className="px-6 lg:px-8 py-5 font-bold">Evaluated Condition</th>
                <th className="px-6 lg:px-8 py-5 font-bold">Routing Destination</th>
                <th className="px-6 lg:px-8 py-5 font-bold text-right">Carbon Saved</th>
                <th className="px-6 lg:px-8 py-5 font-bold text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {mockRecentActivities.map((activity, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 lg:px-8 py-5 whitespace-nowrap font-bold text-white font-mono text-xs">{activity.id}</td>
                  <td className="px-6 lg:px-8 py-5 whitespace-nowrap">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold border shadow-inner ${
                        activity.condition === 'Pristine' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50' :
                        activity.condition === 'Damaged' ? 'bg-amber-950/60 text-amber-400 border-amber-800/50' :
                        'bg-slate-800/50 text-slate-300 border-slate-700'
                     }`}>
                       {activity.condition.toUpperCase()}
                     </span>
                  </td>
                  <td className="px-6 lg:px-8 py-5 whitespace-nowrap text-slate-300 font-medium">{activity.destination}</td>
                  <td className="px-6 lg:px-8 py-5 whitespace-nowrap text-right font-bold text-emerald-400">
                     +{activity.carbonSaved} <span className="text-slate-500 font-medium ml-1">kg</span>
                  </td>
                  <td className="px-6 lg:px-8 py-5 whitespace-nowrap text-right text-slate-600 group-hover:text-slate-400 cursor-pointer transition-colors">
                    <MoreHorizontal className="w-5 h-5 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
