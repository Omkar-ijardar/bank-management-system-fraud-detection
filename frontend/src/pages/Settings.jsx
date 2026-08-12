import React from 'react';
import { Settings as SettingsIcon, Shield, Server, Database } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <SettingsIcon size={28} color="#6366f1" /> System & Microservice Configuration
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enterprise architecture ports & connected services status</p>
      </div>

      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Server size={20} color="#06b6d4" /> Connected Backend Endpoints
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span>Bank Auth Service</span>
            <span style={{ color: '#818cf8', fontWeight: 600 }}>http://localhost:9090</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span>Bank Account Service</span>
            <span style={{ color: '#818cf8', fontWeight: 600 }}>http://localhost:8082</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span>Bank Transaction Service</span>
            <span style={{ color: '#818cf8', fontWeight: 600 }}>http://localhost:8086</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span>TransferFlow Service</span>
            <span style={{ color: '#818cf8', fontWeight: 600 }}>http://localhost:8083</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span>.NET Fraud & AI Service</span>
            <span style={{ color: '#818cf8', fontWeight: 600 }}>http://localhost:5000</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span>Bank Admin Portal Service</span>
            <span style={{ color: '#818cf8', fontWeight: 600 }}>http://localhost:9098</span>
          </div>
        </div>
      </div>
    </div>
  );
};
