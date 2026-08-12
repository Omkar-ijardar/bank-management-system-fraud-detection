import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getAllFraudLogs } from '../../api';
import { ShieldAlert, Search, Filter, Eye, X, Bot, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export const AdminFraudAlerts = () => {
  const [fraudLogs, setFraudLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDecision, setFilterDecision] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFraudLogs = () => {
    setLoading(true);
    getAllFraudLogs()
      .then(res => {
        const list = res.data || [];
        setFraudLogs(list);
      })
      .catch((err) => {
        console.error('Error fetching fraud logs:', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFraudLogs();
  }, []);

  const getDecisionString = (dec) => {
    if (!dec && dec !== 0) return 'Blocked';
    const str = String(dec).toUpperCase();
    if (str === 'ALLOWED' || str === '1') return 'Allowed';
    if (str === 'BLOCKED' || str === '2') return 'Blocked';
    return String(dec);
  };

  const filtered = fraudLogs.filter(f => {
    const custName = f.customerName || `Customer #${f.customerId}`;
    const decisionStr = getDecisionString(f.customerDecision);
    const matchesSearch = custName.toLowerCase().includes(search.toLowerCase()) ||
                          String(f.accountId).includes(search) ||
                          (f.currentTransactionCity || '').toLowerCase().includes(search.toLowerCase()) ||
                          (f.clientIpAddress || '').includes(search);
    const matchesDecision = filterDecision === 'ALL' ? true : decisionStr.toUpperCase() === filterDecision.toUpperCase();
    return matchesSearch && matchesDecision;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldAlert size={28} color="#f43f5e" /> Fraud Security Command & Alert Center
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>Real-time record of all flagged high-risk transactions, velocity checks, and customer decision logs.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={fetchFraudLogs} className="btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: '10px' }}>
            <RefreshCw size={15} /> Refresh Logs
          </button>
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', padding: '0.5rem 1.25rem', borderRadius: '12px', color: '#f87171', fontWeight: 800, fontSize: '0.9rem', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
            Flagged Events: {fraudLogs.length}
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          <Search size={20} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by customer name, account number, city, or IP address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1rem' }}>
          <Filter size={18} color="#94a3b8" />
          <select
            value={filterDecision}
            onChange={(e) => setFilterDecision(e.target.value)}
            style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '8px', outline: 'none' }}
          >
            <option value="ALL">All Decisions</option>
            <option value="ALLOWED">Allowed by Customer</option>
            <option value="BLOCKED">Blocked by Customer</option>
          </select>
        </div>
      </div>

      {/* Fraud Logs Table */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading real-time fraud decision logs...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No fraud alerts logged matching search criteria.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '0.85rem' }}>Customer</th>
                <th style={{ padding: '0.85rem' }}>Account Number</th>
                <th style={{ padding: '0.85rem' }}>Amount</th>
                <th style={{ padding: '0.85rem' }}>City Location</th>
                <th style={{ padding: '0.85rem' }}>Client IP</th>
                <th style={{ padding: '0.85rem' }}>Risk Score</th>
                <th style={{ padding: '0.85rem' }}>Customer Decision</th>
                <th style={{ padding: '0.85rem' }}>Date & Time</th>
                <th style={{ padding: '0.85rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => {
                const dec = getDecisionString(f.customerDecision);
                const isAllow = dec === 'Allowed';
                return (
                  <tr key={f.fraudId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#e2e8f0' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 700, color: '#fff' }}>{f.customerName || `Customer #${f.customerId}`}</td>
                    <td style={{ padding: '0.85rem', fontWeight: 600 }}>#{f.accountId}</td>
                    <td style={{ padding: '0.85rem', fontWeight: 800, color: '#fbbf24' }}>₹{parseFloat(f.transactionAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: '0.85rem' }}>
                      <div style={{ color: '#06b6d4', fontWeight: 600 }}>{f.currentTransactionCity || 'Pune'}</div>
                      {f.previousTransactionCity && <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Prev: {f.previousTransactionCity}</div>}
                    </td>
                    <td style={{ padding: '0.85rem' }}>
                      <div style={{ color: '#38bdf8', fontWeight: 600 }}>{f.clientIpAddress || '127.0.0.1'}</div>
                    </td>
                    <td style={{ padding: '0.85rem' }}>
                      <span style={{ background: (f.riskScore || 85) >= 80 ? 'rgba(244, 63, 94, 0.25)' : 'rgba(245, 158, 11, 0.2)', color: (f.riskScore || 85) >= 80 ? '#f87171' : '#fbbf24', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                        {f.riskScore || 85} / 100
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem' }}>
                      <span style={{ background: isAllow ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)', color: isAllow ? '#34d399' : '#f87171', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        {isAllow ? <CheckCircle size={14} /> : <XCircle size={14} />} {dec}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem', color: '#94a3b8', fontSize: '0.8rem' }}>{f.createdAt ? new Date(f.createdAt).toLocaleString('en-IN') : 'N/A'}</td>
                    <td style={{ padding: '0.85rem', textAlign: 'right' }}>
                      <button onClick={() => setSelectedRecord({ ...f, decisionStr: dec })} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: '8px' }}>
                        <Eye size={15} /> Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Detailed Fraud Inspection Modal */}
      {selectedRecord && createPortal(
        <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: 'rgba(5, 8, 18, 0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1.5rem', overflowY: 'auto' }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedRecord(null); }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '640px', padding: '2.25rem', borderRadius: '24px', border: '1px solid rgba(244, 63, 94, 0.5)', boxShadow: '0 25px 60px rgba(0,0,0,0.9)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setSelectedRecord(null)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={24} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(244, 63, 94, 0.2)', padding: '0.75rem', borderRadius: '16px', border: '1px solid rgba(244, 63, 94, 0.4)' }}>
                <AlertTriangle size={32} color="#f43f5e" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>Fraud Inspection Log #{selectedRecord.fraudId}</h2>
                <span style={{ color: '#f87171', fontSize: '0.85rem', fontWeight: 700 }}>Risk Score: {selectedRecord.riskScore || 85} / 100 • Decision: {selectedRecord.decisionStr || getDecisionString(selectedRecord.customerDecision)}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(15, 23, 42, 0.7)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <div><span style={{ color: '#94a3b8' }}>Customer ID:</span> <strong style={{ color: '#fff' }}>Customer #{selectedRecord.customerId}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Account Number:</span> <strong style={{ color: '#fff' }}>#{selectedRecord.accountId}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Transaction Amount:</span> <strong style={{ color: '#fbbf24', fontSize: '1.05rem' }}>₹{parseFloat(selectedRecord.transactionAmount || 0).toLocaleString('en-IN')}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Customer Decision:</span> <strong style={{ color: (selectedRecord.decisionStr || getDecisionString(selectedRecord.customerDecision)) === 'Allowed' ? '#34d399' : '#f87171' }}>{selectedRecord.decisionStr || getDecisionString(selectedRecord.customerDecision)}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Previous City:</span> <strong style={{ color: '#cbd5e1' }}>{selectedRecord.previousTransactionCity || 'N/A'}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Current City:</span> <strong style={{ color: '#06b6d4' }}>{selectedRecord.currentTransactionCity || 'Pune'}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Previous IP:</span> <strong style={{ color: '#cbd5e1' }}>{selectedRecord.previousIpAddress || 'N/A'}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Current IP:</span> <strong style={{ color: '#38bdf8' }}>{selectedRecord.clientIpAddress || '127.0.0.1'}</strong></div>
            </div>

            {/* Fraud Detection Reasoning Box */}
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1.25rem', borderRadius: '14px', borderLeft: '4px solid #06b6d4', marginBottom: '1.5rem' }}>
              <div style={{ color: '#06b6d4', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <ShieldAlert size={18} /> Fraud Detection System Reasoning:
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.875rem', fontStyle: 'italic', margin: 0, lineHeight: '1.5' }}>
                {selectedRecord.aiExplanation || selectedRecord.reason || 'Transaction flagged due to high amount threshold verification.'}
              </p>
            </div>

            <button onClick={() => setSelectedRecord(null)} className="btn-primary" style={{ width: '100%', padding: '0.85rem', borderRadius: '12px' }}>
              Close Inspection View
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
