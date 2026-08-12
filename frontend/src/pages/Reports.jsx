import React, { useState, useEffect } from 'react';
import { getAdminMetrics } from '../api';
import { BarChart3, TrendingUp, ShieldAlert, CheckCircle, RefreshCw } from 'lucide-react';

export const Reports = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const data = await getAdminMetrics();
      setMetrics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BarChart3 size={28} color="#6366f1" /> Reports & Financial Analytics
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enterprise microservices transaction volume & fraud summary report</p>
        </div>
        <button className="btn-secondary" onClick={fetchMetrics}>
          <RefreshCw size={16} /> Refresh Analytics
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Processed Volume</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#34d399' }}>
            ₹{parseFloat(metrics?.totalTransactionAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
            <TrendingUp size={14} /> Settlement Confirmed Across Microservices
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Transaction Success Ratio</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#818cf8' }}>
            {metrics?.totalTransactions ? Math.round((metrics.successfulTransactions / metrics.totalTransactions) * 100) : 100}%
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
            Successful: {metrics?.successfulTransactions || 0} | Failed: {metrics?.failedTransactions || 0}
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Fraud Detection Efficiency</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f87171' }}>
            {metrics?.totalFraudCases || 0} Threat(s) Prevented
          </div>
          <span style={{ fontSize: '0.8rem', color: '#fca5a5', marginTop: '0.5rem', display: 'block' }}>
            AI Fraud Rule Engine & Gemini Integration Active
          </span>
        </div>
      </div>
    </div>
  );
};
