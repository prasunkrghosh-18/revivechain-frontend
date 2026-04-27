import { motion } from 'motion/react';
import { ArrowRight, Box, Camera, RefreshCw, BarChart3, Leaf, DollarSign } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Smart Supply Chains
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Intelligent Reverse Logistics. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Zero Waste.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Eliminate centralized return warehousing. Use AI to triage items at the source, instantly routing them to local restock, repair, or recycling destinations while maximizing carbon offset.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              Launch Customer Portal
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white font-bold rounded-lg transition-all w-full sm:w-auto backdrop-blur-sm">
              View Admin Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">The Intelligent Flow</h2>
            <p className="text-slate-400">Transforming the return experience in three automated steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-md relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full blur-[50px] opacity-20 group-hover:bg-emerald-900/40 transition-colors"></div>
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-slate-700">
                <Camera className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Snap a Photo</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The customer initiates a return by uploading a single photo of the item using their mobile device.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-md relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full blur-[50px] opacity-20 group-hover:bg-teal-900/40 transition-colors"></div>
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-slate-700">
                <BarChart3 className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. AI Pre-Triage</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our vision models instantly analyze the image, categorizing the condition as pristine, damaged, or broken.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-md relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full blur-[50px] opacity-20 group-hover:bg-emerald-900/40 transition-colors"></div>
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-slate-700">
                <RefreshCw className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Smart Routing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The item is dynamically routed to the nearest optimal facility—bypassing wasteful central warehouses entirely.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="py-24 px-6 border-t border-slate-800/50 bg-slate-900/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="py-8 md:px-8">
              <div className="flex justify-center mb-4">
                <DollarSign className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-4xl font-bold text-white mb-2 tracking-tight">Instant Refunds</h4>
              <p className="text-slate-400 text-sm">Automated approvals upon local facility drop-off.</p>
            </div>
            <div className="py-8 md:px-8">
              <div className="flex justify-center mb-4">
                <Leaf className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-4xl font-bold text-white mb-2 tracking-tight">-40%</h4>
              <p className="text-slate-400 text-sm">Reduction in Scope 3 Logistics Emissions.</p>
            </div>
            <div className="py-8 md:px-8">
              <div className="flex justify-center mb-4">
                <Box className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-4xl font-bold text-white mb-2 tracking-tight">Maximized</h4>
              <p className="text-slate-400 text-sm">Item recovery value through immediate local restock.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
