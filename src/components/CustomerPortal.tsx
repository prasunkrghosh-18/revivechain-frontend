import { useState, useRef } from 'react';
import { UploadCloud, Leaf, Package, MapPin, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TriageResult {
  condition: string;
  destination: string;
  scope_3_carbon_saved_kg: number;
  recommended_action: string;
  item_filename: string;
}

export default function CustomerPortal() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    const baseUrl = 'https://jl6kfh-8000.csb.app';
    
    try {
      const response = await fetch(`${baseUrl}/api/triage`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to process the return. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-12 relative z-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">AI Pre-Triage Module</h2>
        <p className="text-slate-400">Secure automated condition assessment.</p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="p-8 flex flex-col">
          {!result ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Upload Area */}
              <div 
                className={`relative border border-dashed rounded-xl p-10 transition-colors flex flex-col items-center justify-center text-center cursor-pointer ${
                  file ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-slate-700 bg-slate-950/50 hover:border-slate-500 hover:bg-slate-900/80'
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => !file && fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                {previewUrl ? (
                  <div className="relative w-full max-w-sm mx-auto">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-auto max-h-64 object-contain rounded-lg shadow-lg border border-slate-700"
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); resetForm(); }}
                      className="absolute -top-3 -right-3 bg-slate-800 text-slate-300 hover:text-white rounded-full p-2 shadow-xl border border-slate-600 hover:bg-red-500/80 hover:border-red-500 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
                      <UploadCloud className="w-8 h-8 relative z-10" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-wide">CLICK OR DRAG IMAGE</h3>
                    <p className="text-xs text-slate-500 mt-2 font-medium tracking-wide uppercase">PNG, JPG, WEBP (Max 10MB)</p>
                  </>
                )}
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-950/50 text-red-400 rounded-lg text-sm border border-red-900 shadow-inner font-medium">
                  {error}
                </div>
              )}

              <div className="mt-8">
                <button
                  onClick={handleSubmit}
                  disabled={!file || isLoading}
                  className={`w-full py-4 px-6 rounded-xl flex items-center justify-center font-bold text-sm tracking-widest transition-all ${
                    !file || isLoading 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      SIMULATING UPLOAD...
                    </>
                  ) : (
                    'INITIATE ANALYSIS'
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="px-6 py-4 bg-slate-950/80 border border-slate-800 rounded-xl shadow-inner">
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-400 tracking-wide uppercase">Evaluated Status</span>
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-md shadow-inner border ${
                           result.condition === 'Pristine' ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800/50' :
                           result.condition === 'Damaged' ? 'bg-amber-950/50 text-amber-400 border-amber-800/50' :
                           'bg-slate-800/50 text-slate-300 border-slate-700'
                      }`}>
                        {result.condition.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-400 tracking-wide uppercase">Authorized Destination</span>
                      <span className="text-sm font-medium text-white">{result.destination}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-400 tracking-wide uppercase">System Directive</span>
                      <span className="text-sm font-bold text-teal-400">{result.recommended_action}</span>
                    </div>

                    <div className="h-px bg-slate-800 w-full my-4"></div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-400 tracking-wide uppercase">Scope 3 Impact</span>
                      <span className="text-lg font-bold text-emerald-400" style={{ textShadow: '0 0 10px rgba(16,185,129,0.3)' }}>
                        +{result.scope_3_carbon_saved_kg} kg CO₂e
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
                  <button
                    className="flex-1 py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold tracking-widest text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] text-center"
                  >
                    CONFIRM ROUTING
                  </button>
                  <button
                    onClick={resetForm}
                    className="py-4 px-6 bg-slate-800/50 border border-slate-700 hover:bg-slate-700 text-white rounded-xl font-bold tracking-widest text-sm transition-colors backdrop-blur-sm"
                  >
                    RESET
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
