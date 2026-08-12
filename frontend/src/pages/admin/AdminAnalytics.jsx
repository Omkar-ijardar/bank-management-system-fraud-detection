import React from 'react';
import { BarChart3, TrendingUp, ShieldAlert, ArrowDownRight, ArrowUpRight, ArrowLeftRight, Activity } from 'lucide-react';

export const AdminAnalytics = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BarChart3 size={28} color="#06b6d4" /> Executive Banking Analytics & Reports
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>Financial metrics, transaction trends, and AI security detection analytics.</p>
      </div>

      {/* Top 4 Key Performance Indicators */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Deposit Volume</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginBottom: '0.25rem' }}>₹4,50,000</div>
          <div style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <ArrowDownRight size={14} /> +18.4% vs last month
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Withdrawal Volume</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f87171', marginBottom: '0.25rem' }}>₹1,25,000</div>
          <div style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <ArrowUpRight size={14} /> -4.2% vs last month
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Inter-Account Transfers</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#60a5fa', marginBottom: '0.25rem' }}>₹3,80,000</div>
          <div style={{ color: '#60a5fa', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <ArrowLeftRight size={14} /> +24.1% transfer rate
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Fraud Detection Rate</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.25rem' }}>99.4%</div>
          <div style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <ShieldAlert size={14} /> 100% threshold enforcement
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Deposit vs Withdraw Comparison */}
        <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '18px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} color="#34d399" /> Deposit vs Withdraw Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span>Deposits (₹4.5L)</span> <span>78%</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #10b981, #059669)', width: '78%', height: '100%' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span>Withdrawals (₹1.25L)</span> <span>22%</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #f43f5e, #be123c)', width: '22%', height: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Fraud Detection Trend Over Time */}
        <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '18px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} color="#f43f5e" /> Fraud Trend Over Time
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.85rem 1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Transfers ≥ ₹50,000 Flagged</span>
              <span style={{ color: '#f87171', fontWeight: 800 }}>100% Inspected</span>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.85rem 1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Customer Allowed Ratio</span>
              <span style={{ color: '#34d399', fontWeight: 800 }}>66.7%</span>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '0.85rem 1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Customer Blocked Ratio</span>
              <span style={{ color: '#f87171', fontWeight: 800 }}>33.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
