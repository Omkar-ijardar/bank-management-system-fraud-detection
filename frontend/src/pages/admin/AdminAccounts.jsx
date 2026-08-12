import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getAllAccounts } from '../../api';
import { formatAccountId, formatCustomerId, formatAccountNumber } from '../../utils/formatters';
import { Wallet, Search, Filter, Eye, X, CheckCircle2, XCircle } from 'lucide-react';

export const AdminAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAccounts()
      .then(res => {
        setAccounts(res.data?.data || res.data || []);
      })
      .catch((err) => {
        console.error('Error fetching accounts:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = accounts.filter(a => {
    const accNum = String(a.accountNumber || '');
    const accId = formatAccountId(a.accountId);
    const custId = formatCustomerId(a.customerId);
    const accType = String(a.accountType || '');
    const matchesSearch = accNum.includes(search) || accId.toLowerCase().includes(search.toLowerCase()) || custId.toLowerCase().includes(search.toLowerCase()) || accType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' ? true : (a.status || '').toUpperCase() === filterStatus.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Wallet size={28} color="#818cf8" /> Account Ledger Management
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>Real-time database accounts ledger and operational states.</p>
        </div>
        <div style={{ background: 'rgba(129, 140, 248, 0.1)', padding: '0.5rem 1rem', borderRadius: '10px', color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(129, 140, 248, 0.25)' }}>
          Total Accounts in DB: {accounts.length}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          <Search size={20} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search account number, Account ID (ACC-00000001), Customer ID (CUST-000001)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1rem' }}>
          <Filter size={18} color="#94a3b8" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '8px', outline: 'none' }}
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE Accounts Only</option>
            <option value="CLOSED">CLOSED Accounts Only</option>
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading accounts from database...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No bank accounts found matching criteria.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '0.85rem' }}>Account ID</th>
                <th style={{ padding: '0.85rem' }}>Account Number</th>
                <th style={{ padding: '0.85rem' }}>Customer ID</th>
                <th style={{ padding: '0.85rem' }}>Account Type</th>
                <th style={{ padding: '0.85rem' }}>Available Balance</th>
                <th style={{ padding: '0.85rem' }}>Status</th>
                <th style={{ padding: '0.85rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.accountId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#e2e8f0' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 700, color: '#818cf8' }}>{formatAccountId(a.accountId)}</td>
                  <td style={{ padding: '0.85rem', fontWeight: 700, color: '#fff' }}>{formatAccountNumber(a.accountNumber)}</td>
                  <td style={{ padding: '0.85rem' }}>{formatCustomerId(a.customerId)}</td>
                  <td style={{ padding: '0.85rem', fontWeight: 600 }}>{a.accountType}</td>
                  <td style={{ padding: '0.85rem', color: '#34d399', fontWeight: 700 }}>₹{parseFloat(a.balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: '0.85rem' }}>
                    <span style={{ background: (a.status || '').toUpperCase() === 'ACTIVE' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)', color: (a.status || '').toUpperCase() === 'ACTIVE' ? '#34d399' : '#f87171', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      {(a.status || '').toUpperCase() === 'ACTIVE' ? <CheckCircle2 size={13} /> : <XCircle size={13} />} {a.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem', textAlign: 'right' }}>
                    <button onClick={() => setSelectedAccount(a)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: '8px' }}>
                      <Eye size={15} /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Account Details Modal */}
      {selectedAccount && createPortal(
        <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: 'rgba(5, 8, 18, 0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1.5rem', overflowY: 'auto' }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedAccount(null); }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(129, 140, 248, 0.4)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setSelectedAccount(null)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={24} />
            </button>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem' }}>Account Details</h2>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.5rem' }}>
              <div><span style={{ color: '#94a3b8' }}>Account ID:</span> <strong style={{ color: '#fff' }}>{formatAccountId(selectedAccount.accountId)}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Account Number:</span> <strong style={{ color: '#fff' }}>{formatAccountNumber(selectedAccount.accountNumber)}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Owner Customer:</span> <strong style={{ color: '#fff' }}>{formatCustomerId(selectedAccount.customerId)}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Account Type:</span> <strong style={{ color: '#818cf8' }}>{selectedAccount.accountType}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Available Ledger Balance:</span> <strong style={{ color: '#34d399', fontSize: '1.1rem' }}>₹{parseFloat(selectedAccount.balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></div>
              <div><span style={{ color: '#94a3b8' }}>Account Status:</span> <strong style={{ color: (selectedAccount.status || '').toUpperCase() === 'ACTIVE' ? '#34d399' : '#f87171' }}>{selectedAccount.status}</strong></div>
            </div>

            <button onClick={() => setSelectedAccount(null)} className="btn-primary" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px' }}>
              Close Account View
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
