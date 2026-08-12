import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAccountsByCustomer, getTransactionHistory } from '../api';
import { History, Search, Filter, Download } from 'lucide-react';

export const Transactions = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.customerId) {
      getAccountsByCustomer(user.customerId).then((res) => {
        const list = res.data?.data || [];
        setAccounts(list);
        if (list.length > 0) {
          setSelectedAccountId(list[0].accountId);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedAccountId) {
      setLoading(true);
      getTransactionHistory(selectedAccountId)
        .then((res) => {
          setTransactions(res.data?.data || []);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [selectedAccountId]);

  const filteredTxns = transactions.filter((tx) => {
    const matchesSearch =
      tx.referenceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      typeFilter === 'ALL' ||
      (tx.transactionType && tx.transactionType.toUpperCase() === typeFilter.toUpperCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>Transaction History</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Comprehensive ledger of account deposits, withdrawals, and transfers</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1', minWidth: '220px' }}>
          <label className="form-label">Select Account</label>
          <select className="form-select" value={selectedAccountId} onChange={(e) => setSelectedAccountId(e.target.value)}>
            {accounts.map((acc) => (
              <option key={acc.accountId} value={acc.accountId}>
                {acc.accountType} - #{acc.accountNumber}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: '1.5', minWidth: '240px' }}>
          <label className="form-label">Search Reference / Description</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search TXN reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div style={{ minWidth: '160px' }}>
          <label className="form-label">Filter Type</label>
          <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="ALL">All Types</option>
            <option value="Deposit">Deposit</option>
            <option value="Withdraw">Withdraw</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading transactions...</div>
        ) : filteredTxns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No transactions found matching your criteria.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.85rem' }}>Transaction Ref</th>
                <th style={{ padding: '0.85rem' }}>Type</th>
                <th style={{ padding: '0.85rem' }}>Date & Time</th>
                <th style={{ padding: '0.85rem' }}>Amount</th>
                <th style={{ padding: '0.85rem' }}>Available Balance</th>
                <th style={{ padding: '0.85rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTxns.map((tx) => {
                const isDeposit = tx.transactionType && tx.transactionType.toUpperCase() === 'DEPOSIT';
                const isSuccess = tx.status && tx.status.toUpperCase() === 'SUCCESS';
                return (
                  <tr key={tx.transactionId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 600, color: '#818cf8' }}>{tx.referenceNumber}</td>
                    <td style={{ padding: '0.85rem' }}>{tx.transactionType}</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>{new Date(tx.transactionTime).toLocaleString()}</td>
                    <td style={{ padding: '0.85rem', fontWeight: 700, color: isDeposit ? '#34d399' : '#f43f5e' }}>
                      {isDeposit ? '+' : '-'}₹{parseFloat(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: '0.85rem', color: '#fff' }}>₹{parseFloat(tx.availableBalance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: '0.85rem' }}>
                      <span style={{ background: isSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)', color: isSuccess ? '#34d399' : '#f87171', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
