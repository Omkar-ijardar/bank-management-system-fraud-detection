import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAccountsByCustomer, getTransactionHistory } from '../api';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowLeftRight, ArrowDownRight, ArrowUpRight, ShieldCheck, CreditCard, History, PlusCircle } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [recentTxns, setRecentTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.customerId) {
        setLoading(false);
        return;
      }
      try {
        const accRes = await getAccountsByCustomer(user.customerId);
        const accList = accRes.data?.data || [];
        setAccounts(accList);

        if (accList.length > 0) {
          const mainAcc = accList[0];
          const txRes = await getTransactionHistory(mainAcc.accountId);
          setRecentTxns(txRes.data?.data?.slice(0, 5) || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const totalBalance = accounts.reduce((acc, a) => acc + (parseFloat(a.balance) || 0), 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(6, 182, 212, 0.2))',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
            Welcome Back, {user?.firstName || 'Valued Customer'} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Banking System Security Shield is active. All transfers undergo real-time risk evaluation.
          </p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/transfer')} style={{ padding: '0.85rem 1.5rem' }}>
          <ArrowLeftRight size={18} /> Quick Money Transfer
        </button>
      </div>

      {/* Balance & Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-panel glass-card-interactive" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Total Combined Balance</span>
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.5rem', borderRadius: '10px' }}>
              <Wallet size={22} color="#6366f1" />
            </div>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#fff' }}>₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
          <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
            <ShieldCheck size={14} /> Active Across {accounts.length} Account(s)
          </span>
        </div>

        <div className="glass-panel glass-card-interactive" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Quick Deposit</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.5rem', borderRadius: '10px' }}>
              <ArrowDownRight size={22} color="#10b981" />
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Instant funds credit to your accounts.</p>
          <button className="btn-secondary" onClick={() => navigate('/deposit')} style={{ width: '100%' }}>
            Deposit Money
          </button>
        </div>

        <div className="glass-panel glass-card-interactive" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Quick Withdraw</span>
            <div style={{ background: 'rgba(244, 63, 94, 0.2)', padding: '0.5rem', borderRadius: '10px' }}>
              <ArrowUpRight size={22} color="#f43f5e" />
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Secure ATM or wire withdrawal.</p>
          <button className="btn-secondary" onClick={() => navigate('/withdraw')} style={{ width: '100%' }}>
            Withdraw Money
          </button>
        </div>
      </div>

      {/* Account Overview Grid */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Your Bank Accounts</h3>
          <button className="btn-secondary" onClick={() => navigate('/accounts')} style={{ fontSize: '0.85rem' }}>
            <PlusCircle size={16} /> Manage Accounts
          </button>
        </div>

        {accounts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No active bank accounts found. Click "Manage Accounts" to open your first savings account.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {accounts.map((acc) => (
              <div key={acc.accountId} className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: 600, textTransform: 'uppercase' }}>{acc.accountType} Account</span>
                  <span style={{ background: acc.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)', color: acc.status === 'Active' ? '#34d399' : '#f87171', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {acc.status}
                  </span>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                  ₹{parseFloat(acc.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span>Acc No: {acc.accountNumber}</span>
                  <span>Branch: {acc.branchName} | IFSC: {acc.ifscCode}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Transactions List */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={20} color="#6366f1" /> Recent Activity
          </h3>
          <button className="btn-secondary" onClick={() => navigate('/transactions')} style={{ fontSize: '0.85rem' }}>
            View Full History
          </button>
        </div>

        {recentTxns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No recent transactions logged.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentTxns.map((tx) => (
              <div key={tx.transactionId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{tx.transactionType}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ref: {tx.referenceNumber} • {new Date(tx.transactionTime).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: tx.transactionType === 'Deposit' ? '#34d399' : '#f43f5e' }}>
                    {tx.transactionType === 'Deposit' ? '+' : '-'}₹{parseFloat(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: tx.status === 'Success' ? '#34d399' : '#fbbf24' }}>{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
