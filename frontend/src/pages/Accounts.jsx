import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { getAccountsByCustomer, createAccount, closeAccount } from '../api';
import { formatAccountId, formatAccountNumber } from '../utils/formatters';
import { PlusCircle, AlertCircle, CheckCircle, XCircle, X } from 'lucide-react';

export const Accounts = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newAccData, setNewAccData] = useState({
    accountType: 'Savings',
    branchName: 'Main City Branch',
    ifscCode: 'BKID000101'
  });
  const [modalErrors, setModalErrors] = useState({});

  const fetchAccounts = async () => {
    if (!user?.customerId) return;
    try {
      const res = await getAccountsByCustomer(user.customerId);
      setAccounts(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  const validateModal = () => {
    const errs = {};
    if (!newAccData.branchName.trim()) {
      errs.branchName = 'Branch Name is required.';
    }

    if (!newAccData.ifscCode.trim()) {
      errs.ifscCode = 'IFSC Code is required.';
    } else if (!/^[A-Z0-9]{11}$/.test(newAccData.ifscCode.trim().toUpperCase())) {
      errs.ifscCode = 'Invalid IFSC Code. Please enter an 11-character code (e.g. BKID000101).';
    }

    setModalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateModal()) {
      return;
    }

    try {
      await createAccount({
        customerId: user.customerId,
        accountType: newAccData.accountType,
        branchName: newAccData.branchName.trim(),
        ifscCode: newAccData.ifscCode.trim().toUpperCase()
      });
      setSuccess('Account created successfully!');
      setModalOpen(false);
      fetchAccounts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account.');
    }
  };

  const handleCloseAccount = async (accountId) => {
    if (!window.confirm('Are you sure you want to close this account?')) return;
    setError('');
    setSuccess('');
    try {
      await closeAccount(accountId);
      setSuccess('Account closed successfully.');
      fetchAccounts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to close account.');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>Account Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage savings, salary, and current accounts</p>
        </div>
        <button className="btn-primary" onClick={() => { setModalErrors({}); setModalOpen(true); }}>
          <PlusCircle size={18} /> Open New Account
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid var(--accent-rose)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {success && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-emerald)', color: '#6ee7b7', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <CheckCircle size={18} /> {success}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {accounts.map((acc) => (
          <div key={acc.accountId} className="glass-panel glass-card-interactive" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase' }}>
                {acc.accountType} Account
              </span>
              <span style={{ background: acc.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)', color: acc.status === 'Active' ? '#34d399' : '#f87171', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                {acc.status}
              </span>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Account Balance</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>
                ₹{parseFloat(acc.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h2>
            </div>

            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div><strong>Account ID:</strong> {formatAccountId(acc.accountId)}</div>
              <div><strong>Account Number:</strong> {formatAccountNumber(acc.accountNumber)}</div>
              <div><strong>Branch:</strong> {acc.branchName}</div>
              <div><strong>IFSC Code:</strong> {acc.ifscCode}</div>
              <div><strong>Opened:</strong> {acc.openDate}</div>
            </div>

            {acc.status === 'Active' && (
              <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', textAlign: 'right' }}>
                <button className="btn-danger" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={() => handleCloseAccount(acc.accountId)}>
                  <XCircle size={14} /> Close Account
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Account Modal */}
      {modalOpen && createPortal(
        <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: 'rgba(5, 8, 18, 0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1.5rem', overflowY: 'auto' }} onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(129, 140, 248, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', margin: 0 }}>Open New Bank Account</h3>
              <button type="button" onClick={() => setModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateAccount} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem', display: 'block' }}>Account Type</label>
                <select className="form-select" value={newAccData.accountType} onChange={(e) => setNewAccData({ ...newAccData, accountType: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.95rem' }}>
                  <option value="Savings" style={{ background: '#0f172a', color: '#fff' }}>Savings Account</option>
                  <option value="Current" style={{ background: '#0f172a', color: '#fff' }}>Current Account</option>
                  <option value="Salary" style={{ background: '#0f172a', color: '#fff' }}>Salary Account</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem', display: 'block' }}>Branch Name</label>
                <input
                  type="text"
                  className={`form-input ${modalErrors.branchName ? 'form-input-error' : ''}`}
                  placeholder="e.g. Main City Branch"
                  value={newAccData.branchName}
                  onChange={(e) => {
                    setNewAccData({ ...newAccData, branchName: e.target.value });
                    if (modalErrors.branchName) setModalErrors({ ...modalErrors, branchName: null });
                  }}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px' }}
                />
                {modalErrors.branchName && <div className="error-text" style={{ marginTop: '0.35rem' }}><AlertCircle size={13} /> {modalErrors.branchName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem', display: 'block' }}>IFSC Code</label>
                <input
                  type="text"
                  className={`form-input ${modalErrors.ifscCode ? 'form-input-error' : ''}`}
                  placeholder="e.g. BKID000101"
                  value={newAccData.ifscCode}
                  onChange={(e) => {
                    setNewAccData({ ...newAccData, ifscCode: e.target.value.toUpperCase() });
                    if (modalErrors.ifscCode) setModalErrors({ ...modalErrors, ifscCode: null });
                  }}
                  maxLength={11}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px' }}
                />
                {modalErrors.ifscCode && <div className="error-text" style={{ marginTop: '0.35rem' }}><AlertCircle size={13} /> {modalErrors.ifscCode}</div>}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button className="btn-secondary" type="button" style={{ flex: 1, padding: '0.75rem', borderRadius: '10px' }} onClick={() => setModalOpen(false)}>Cancel</button>
                <button className="btn-primary" type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '10px' }}>Create Account</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
