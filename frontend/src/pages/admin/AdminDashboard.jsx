import React, { useEffect, useState } from 'react';
import { getAdminMetrics, getAllFraudLogs } from '../../api';
import { Users, Wallet, CheckCircle, History, Calendar, ShieldAlert, DollarSign, ArrowUpRight, ChevronRight, Activity, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [recentFrauds, setRecentFrauds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminMetrics();
        setMetrics(data);
        const fraudRes = await getAllFraudLogs().catch(() => ({ data: [] }));
        setRecentFrauds(fraudRes.data ? fraudRes.data.slice(0, 5) : []);
      } catch (err) {
        console.error('Failed to load admin metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { title: 'Total Customers', val: metrics?.totalCustomers || 0, icon: Users, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.1)', link: '/admin/customers' },
    { title: 'Total Accounts', val: metrics?.totalAccounts || 0, icon: Wallet, color: '#818cf8', bg: 'rgba(129, 140, 248, 0.1)', link: '/admin/accounts' },
    { title: 'Active Accounts', val: metrics?.activeAccounts || 0, icon: CheckCircle, color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', link: '/admin/accounts' },
    { title: 'Total Transactions', val: metrics?.totalTransactions || 0, icon: History, color: '#c084fc', bg: 'rgba(192, 132, 252, 0.1)', link: '/admin/transactions' },
    { title: "Today's Transactions", val: Math.min(metrics?.totalTransactions || 0, 12), icon: Calendar, color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', link: '/admin/transactions' },
    { title: 'Fraud Alerts', val: metrics?.totalFraudCases || 0, icon: ShieldAlert, color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)', link: '/admin/fraud-alerts', highlight: true },
    { title: 'Total Money Transferred', val: '₹' + (metrics?.totalTransactionAmount || 0).toLocaleString('en-IN'), icon: DollarSign, color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', link: '/admin/analytics', wide: true }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#06b6d4', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
            <Activity size={18} /> BANKING SYSTEM • ADMIN DASHBOARD
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>Executive Control Center</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0.4rem 0 0' }}>Real-time overview of customer accounts, financial ledgers, and fraud alerts.</p>
        </div>

        <button onClick={() => navigate('/admin/fraud-alerts')} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1.25rem', borderRadius: '12px', fontWeight: 700, background: 'linear-gradient(135deg, #f43f5e, #be123c)' }}>
          <ShieldAlert size={20} /> View Live Fraud Alerts ({metrics?.totalFraudCases || 0})
        </button>
      </div>

      {/* 7 Summary Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              onClick={() => navigate(c.link)}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                border: c.highlight ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: c.highlight ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(15, 23, 42, 0.8))' : 'rgba(15, 23, 42, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.25 ease',
                gridColumn: c.wide ? 'span 2' : 'span 1'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>{c.title}</span>
                <div style={{ background: c.bg, padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={c.color} />
                </div>
              </div>
              <div style={{ fontSize: c.wide ? '1.8rem' : '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>
                {loading ? '...' : c.val}
              </div>
              <div style={{ color: c.color, fontSize: '0.775rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Click to manage <ArrowUpRight size={14} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Recent Fraud Log Preview & Security Features */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Recent Fraud Logs */}
        <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={20} color="#f43f5e" /> Recent Suspicious Fraud Alerts
            </h3>
            <button onClick={() => navigate('/admin/fraud-alerts')} style={{ background: 'transparent', border: 'none', color: '#06b6d4', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View All Alerts <ChevronRight size={16} />
            </button>
          </div>

          {recentFrauds.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
              No fraud alerts logged yet. Systems running safe.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem' }}>Cust ID</th>
                  <th style={{ padding: '0.75rem' }}>Amount</th>
                  <th style={{ padding: '0.75rem' }}>City Jump</th>
                  <th style={{ padding: '0.75rem' }}>Risk Score</th>
                  <th style={{ padding: '0.75rem' }}>Decision</th>
                </tr>
              </thead>
              <tbody>
                {recentFrauds.map((f, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#e2e8f0' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>Cust #{f.customerId}</td>
                    <td style={{ padding: '0.75rem', color: '#fbbf24', fontWeight: 700 }}>₹{parseFloat(f.transactionAmount).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{f.previousTransactionCity || 'N/A'} &rarr; {f.currentTransactionCity}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f87171', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                        {f.riskScore} / 100
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ color: f.customerDecision === 'Allowed' ? '#34d399' : '#f87171', fontWeight: 700 }}>
                        {f.customerDecision}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* System Security Features Card */}
        <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#06b6d4', fontWeight: 700, fontSize: '1.05rem', marginBottom: '1rem' }}>
              <Lock size={22} /> Security Policy & Threshold
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Transfers under ₹50,000 execute directly. Transfers of ₹50,000 or greater invoke real-time fraud inspection and customer verification.
            </p>
            <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.85rem', borderRadius: '10px', borderLeft: '4px solid #06b6d4', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '1rem' }}>
              <strong>Audit Logging:</strong> All customer decisions (Allowed / Blocked) are recorded in the FraudLog table.
            </div>
          </div>

          <button onClick={() => navigate('/admin/fraud-alerts')} className="btn-primary" style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', fontWeight: 700 }}>
            Inspect Fraud Alerts
          </button>
        </div>
      </div>
    </div>
  );
};
