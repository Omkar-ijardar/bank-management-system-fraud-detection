import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, ShieldCheck, Mail, Phone, Lock, Calendar, KeyRound } from 'lucide-react';

export const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 10px 25px rgba(6, 182, 212, 0.3)' }}>
            <UserCheck size={36} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>{user?.firstName || 'Bank'} {user?.lastName || 'Administrator'}</h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(244, 63, 94, 0.2)', color: '#f87171', fontWeight: 800, fontSize: '0.8rem', padding: '0.3rem 0.85rem', borderRadius: '20px', marginTop: '0.5rem', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
            <ShieldCheck size={14} /> ROLE: SYSTEM ADMIN
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Mail size={18} color="#06b6d4" />
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Official Admin Email</span>
              <div style={{ color: '#fff', fontWeight: 700 }}>{user?.email || 'admin@bank.com'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Phone size={18} color="#06b6d4" />
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Security Contact Line</span>
              <div style={{ color: '#fff', fontWeight: 700 }}>+91 99999 99999</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <KeyRound size={18} color="#06b6d4" />
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Access Clearance Level</span>
              <div style={{ color: '#34d399', fontWeight: 700 }}>LEVEL 5 • FULL SYSTEM OVERRIDE</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar size={18} color="#06b6d4" />
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Session Initialized</span>
              <div style={{ color: '#fff', fontWeight: 700 }}>{new Date().toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.25)', fontSize: '0.825rem', color: '#cbd5e1', lineHeight: '1.5' }}>
          <strong>Admin Security Note:</strong> You are logged into the enterprise control panel. All administrative actions are recorded in the system audit trail.
        </div>
      </div>
    </div>
  );
};
