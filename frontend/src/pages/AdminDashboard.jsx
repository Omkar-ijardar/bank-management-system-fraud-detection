import React, { useState, useEffect } from 'react';
import { getAdminMetrics, getAllFraudLogs } from '../api';
import { ShieldAlert, Users, Wallet, Activity, AlertCircle, Bot, CheckCircle } from 'lucide-react';

export const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [fraudLogs, setFraudLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [m, logsRes] = await Promise.all([
          getAdminMetrics(),
          getAllFraudLogs().catch(() => ({ data: [] }))
        ]);
        setMetrics(m);
        setFraudLogs(logsRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldAlert size={28} color="#f43f5e" /> Admin & Fraud Control Center
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Microservices Health • Live Aggregated Metrics • AI Fraud Monitoring</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Customers (Auth Svc)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>{metrics?.totalCustomers || 0}</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Accounts (Account Svc)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#818cf8' }}>{metrics?.totalAccounts || 0}</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Transactions (Txn Svc)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#34d399' }}>{metrics?.totalTransactions || 0}</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Flagged Fraud Cases (.NET Svc)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f87171' }}>{metrics?.totalFraudCases || 0}</div>
        </div>
      </div>

      {/* Fraud Logs Audit Table */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bot size={22} color="#6366f1" /> .NET Fraud Detection Logs & AI Explanations
        </h3>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading AI Fraud logs...</div>
        ) : fraudLogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No fraud logs recorded yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {fraudLogs.map((log) => (
              <div key={log.fraudId || log.TransactionId} className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ background: log.riskScore >= 80 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: log.riskScore >= 80 ? '#f87171' : '#34d399', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>
                      Risk Score: {log.riskScore}
                    </span>
                    <span style={{ fontWeight: 600, color: '#fff' }}>Txn #{log.transactionId}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customer #{log.customerId}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(log.createdAt).toLocaleString()}</span>
                </div>

                <div style={{ fontSize: '0.9rem', color: '#e2e8f0', marginBottom: '0.5rem' }}>
                  Amount: <strong>₹{parseFloat(log.transactionAmount).toLocaleString()}</strong> | IP: {log.clientIpAddress} | City: {log.currentTransactionCity}
                </div>

                {log.aiExplanation && (
                  <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '3px solid #6366f1', fontSize: '0.85rem', color: '#c7d2fe' }}>
                    <strong>AI Fraud Reasoning:</strong> {log.aiExplanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
