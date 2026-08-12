import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getAllCustomers, getAccountsByCustomer } from '../../api';
import { formatCustomerId, formatAccountId, formatAccountNumber } from '../../utils/formatters';
import { Users, Search, Eye, X, Mail, Phone, MapPin, Calendar, CreditCard, ShieldCheck } from 'lucide-react';

export const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCustomers()
      .then(res => {
        setCustomers(res.data || []);
      })
      .catch((err) => {
        console.error('Error fetching customers:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInspectCustomer = async (cust) => {
    setSelectedCustomer(cust);
    try {
      const res = await getAccountsByCustomer(cust.customerId);
      setCustomerAccounts(res.data?.data || []);
    } catch (err) {
      setCustomerAccounts([]);
    }
  };

  const filtered = customers.filter(c => {
    const fn = c.firstName || '';
    const ln = c.lastName || '';
    const em = c.email || '';
    const ct = c.city || '';
    const mb = c.mobile || '';
    const cid = formatCustomerId(c.customerId);
    return fn.toLowerCase().includes(search.toLowerCase()) ||
           ln.toLowerCase().includes(search.toLowerCase()) ||
           em.toLowerCase().includes(search.toLowerCase()) ||
           ct.toLowerCase().includes(search.toLowerCase()) ||
           mb.includes(search) ||
           cid.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Users size={28} color="#06b6d4" /> Customer Management Directory
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>Real-time database record of all registered bank customers.</p>
        </div>
        <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.5rem 1rem', borderRadius: '10px', color: '#06b6d4', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
          Total Registered in Database: {customers.length}
        </div>
      </div>

      {/* Search Input */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Search size={20} color="#94a3b8" />
        <input
          type="text"
          placeholder="Search customer by ID (e.g. CUST-000001), name, email, mobile, or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '0.95rem' }}
        />
      </div>

      {/* Customers Table */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading customer data from MySQL database...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No customers found in database matching search criteria.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '0.85rem' }}>Customer ID</th>
                <th style={{ padding: '0.85rem' }}>Full Name</th>
                <th style={{ padding: '0.85rem' }}>Email & Mobile</th>
                <th style={{ padding: '0.85rem' }}>City / State</th>
                <th style={{ padding: '0.85rem' }}>Aadhaar & PAN</th>
                <th style={{ padding: '0.85rem' }}>Role</th>
                <th style={{ padding: '0.85rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.customerId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', color: '#e2e8f0' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 700, color: '#06b6d4' }}>{formatCustomerId(c.customerId)}</td>
                  <td style={{ padding: '0.85rem', fontWeight: 700, color: '#fff' }}>{c.firstName} {c.lastName}</td>
                  <td style={{ padding: '0.85rem' }}>
                    <div style={{ color: '#e2e8f0' }}>{c.email}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.mobile}</div>
                  </td>
                  <td style={{ padding: '0.85rem' }}>{c.city}, {c.state}</td>
                  <td style={{ padding: '0.85rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                    <div>Aadhaar: {c.aadhaarNumber || c.aadhaar}</div>
                    <div>PAN: {c.panNumber || c.pan}</div>
                  </td>
                  <td style={{ padding: '0.85rem' }}>
                    <span style={{ background: c.role === 'ADMIN' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: c.role === 'ADMIN' ? '#f87171' : '#34d399', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                      {c.role || 'CUSTOMER'}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem', textAlign: 'right' }}>
                    <button onClick={() => handleInspectCustomer(c)} className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: '8px' }}>
                      <Eye size={15} /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Customer Inspection Modal */}
      {selectedCustomer && createPortal(
        <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: 'rgba(5, 8, 18, 0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1.5rem', overflowY: 'auto' }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedCustomer(null); }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(6, 182, 212, 0.4)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setSelectedCustomer(null)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={24} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>
                {selectedCustomer.firstName ? selectedCustomer.firstName[0] : 'U'}
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>{selectedCustomer.firstName} {selectedCustomer.lastName}</h2>
                <p style={{ color: '#06b6d4', fontSize: '0.85rem', margin: 0, fontWeight: 600 }}>Customer ID: {formatCustomerId(selectedCustomer.customerId)} • Role: {selectedCustomer.role || 'CUSTOMER'}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div><Mail size={16} color="#06b6d4" /> <span style={{ color: '#94a3b8' }}>Email:</span> <strong style={{ color: '#fff' }}>{selectedCustomer.email}</strong></div>
              <div><Phone size={16} color="#06b6d4" /> <span style={{ color: '#94a3b8' }}>Mobile:</span> <strong style={{ color: '#fff' }}>{selectedCustomer.mobile}</strong></div>
              <div><MapPin size={16} color="#06b6d4" /> <span style={{ color: '#94a3b8' }}>City:</span> <strong style={{ color: '#fff' }}>{selectedCustomer.city}, {selectedCustomer.state}</strong></div>
              <div><Calendar size={16} color="#06b6d4" /> <span style={{ color: '#94a3b8' }}>DOB:</span> <strong style={{ color: '#fff' }}>{selectedCustomer.dateOfBirth}</strong></div>
              <div><ShieldCheck size={16} color="#06b6d4" /> <span style={{ color: '#94a3b8' }}>Aadhaar:</span> <strong style={{ color: '#fff' }}>{selectedCustomer.aadhaarNumber || selectedCustomer.aadhaar}</strong></div>
              <div><CreditCard size={16} color="#06b6d4" /> <span style={{ color: '#94a3b8' }}>PAN:</span> <strong style={{ color: '#fff' }}>{selectedCustomer.panNumber || selectedCustomer.pan}</strong></div>
            </div>

            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Associated Bank Accounts ({customerAccounts.length})</h4>
            {customerAccounts.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No active accounts linked.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {customerAccounts.map(a => (
                  <div key={a.accountId} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.75rem 1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#fff' }}>{a.accountType}</strong> <span style={{ color: '#94a3b8' }}>{formatAccountNumber(a.accountNumber)}</span>
                    </div>
                    <div style={{ color: '#34d399', fontWeight: 700 }}>
                      ₹{parseFloat(a.balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
