import React, { useState } from 'react';
import { checkCustomerExists, getAccountsByCustomer } from '../api';
import { Users, Search, CheckCircle, XCircle } from 'lucide-react';

export const CustomerAdmin = () => {
  const [searchId, setSearchId] = useState('');
  const [customerResult, setCustomerResult] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setCustomerResult(null);
    setAccounts([]);
    setLoading(true);

    try {
      const res = await checkCustomerExists(searchId);
      setCustomerResult(res.data);

      if (res.data?.exists) {
        const accRes = await getAccountsByCustomer(searchId);
        setAccounts(accRes.data?.data || []);
      }
    } catch (err) {
      setError('Customer search failed or service unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>Customer Management & Verification</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Query Auth Service customer status & linked bank accounts</p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', maxWidth: '500px' }}>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label className="form-label">Customer ID</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                className="form-input"
                placeholder="Enter Customer ID (e.g. 1)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                required
              />
              <button className="btn-primary" type="submit" disabled={loading}>
                <Search size={18} /> Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {customerResult && (
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {customerResult.exists ? <CheckCircle size={28} color="#34d399" /> : <XCircle size={28} color="#f87171" />}
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
                Customer ID #{customerResult.customerId}: {customerResult.exists ? 'Registered & Active' : 'Not Found'}
              </h3>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status: {customerResult.status}</span>
            </div>
          </div>

          {customerResult.exists && (
            <div>
              <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.85rem' }}>Linked Accounts ({accounts.length})</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {accounts.map((acc) => (
                  <div key={acc.accountId} className="glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontWeight: 600, color: '#818cf8', fontSize: '0.9rem' }}>{acc.accountType} Account</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>₹{acc.balance}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Acc #{acc.accountNumber}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
