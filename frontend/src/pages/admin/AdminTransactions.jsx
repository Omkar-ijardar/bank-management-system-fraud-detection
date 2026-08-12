import React, { useState, useEffect } from 'react';
import { getAllTransactions } from '../../api';
import { formatAccountId } from '../../utils/formatters';
import { History, Search, Filter, ArrowDownRight, ArrowUpRight, ArrowLeftRight } from 'lucide-react';

export const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [minAmount, setMinAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTransactions()
      .then(res => {
        setTransactions(res.data?.data || res.data || []);
      })
      .catch((err) => {
        console.error('Error fetching transactions:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = transactions.filter(t => {
    const ref = String(t.referenceNumber || '');
    const accId = formatAccountId(t.accountId);
    const city = String(t.transactionCity || t.city || '');
    const matchesSearch = ref.toLowerCase().includes(search.toLowerCase()) || accId.toLowerCase().includes(search.toLowerCase()) || city.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'ALL' ? true : (t.transactionType || t.type || '').toUpperCase() === filterType.toUpperCase();
    const matchesMinAmount = minAmount === '' ? true : parseFloat(t.amount || 0) >= parseFloat(minAmount);
    return matchesSearch && matchesType && matchesMinAmount;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <History size={28} color="#c084fc" /> Master Transaction Registry
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>Real-time database log of all deposits, withdrawals, and inter-bank transfers.</p>
        </div>
        <div style={{ background: 'rgba(192, 132, 252, 0.1)', padding: '0.5rem 1rem', borderRadius: '10px', color: '#c084fc', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(192, 132, 252, 0.25)' }}>
          Total Logged in DB: {transactions.length}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
          <Search size={20} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by reference number, Account ID (ACC-00000001), or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1rem' }}>
          <Filter size={18} color="#94a3b8" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '8px', outline: 'none' }}
          >
            <option value="ALL">All Transaction Types</option>
            <option value="DEPOSIT">DEPOSIT</option>
            <option value="WITHDRAW">WITHDRAW</option>
            <option value="TRANSFER">TRANSFER</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Min Amount (₹):</span>
          <input
            type="number"
            placeholder="e.g. 50000"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: '8px', width: '110px', outline: 'none' }}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading transaction registry from database...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No transactions logged in database matching criteria.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '0.85rem' }}>Tx ID & Ref</th>
                <th style={{ padding: '0.85rem' }}>Account ID</th>
                <th style={{ padding: '0.85rem' }}>Type</th>
                <th style={{ padding: '0.85rem' }}>Amount</th>
                <th style={{ padding: '0.85rem' }}>Balance After</th>
                <th style={{ padding: '0.85rem' }}>City</th>
                <th style={{ padding: '0.85rem' }}>Timestamp</th>
                <th style={{ padding: '0.85rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const typeName = (t.transactionType || t.type || '').toUpperCase();
                return (
                  <tr key={t.transactionId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#e2e8f0' }}>
                    <td style={{ padding: '0.85rem' }}>
                      <div style={{ fontWeight: 700, color: '#c084fc' }}>#{t.transactionId}</div>
                      <div style={{ fontSize: '0.775rem', color: '#94a3b8' }}>{t.referenceNumber}</div>
                    </td>
                    <td style={{ padding: '0.85rem', fontWeight: 600 }}>{formatAccountId(t.accountId)}</td>
                    <td style={{ padding: '0.85rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: typeName === 'DEPOSIT' ? '#34d399' : typeName === 'WITHDRAW' ? '#f87171' : '#60a5fa' }}>
                        {typeName === 'DEPOSIT' && <ArrowDownRight size={15} />}
                        {typeName === 'WITHDRAW' && <ArrowUpRight size={15} />}
                        {typeName === 'TRANSFER' && <ArrowLeftRight size={15} />}
                        {typeName}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem', fontWeight: 800, color: typeName === 'DEPOSIT' ? '#34d399' : typeName === 'WITHDRAW' ? '#f87171' : '#60a5fa' }}>
                      ₹{parseFloat(t.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: '0.85rem', color: '#94a3b8' }}>₹{parseFloat(t.availableBalance || t.balanceAfter || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: '0.85rem' }}>{t.transactionCity || t.city || 'N/A'}</td>
                    <td style={{ padding: '0.85rem', fontSize: '0.8rem', color: '#94a3b8' }}>{t.transactionTime ? new Date(t.transactionTime).toLocaleString('en-IN') : 'N/A'}</td>
                    <td style={{ padding: '0.85rem' }}>
                      <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                        {t.status}
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
