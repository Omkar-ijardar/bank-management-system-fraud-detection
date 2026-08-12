import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LogOut, User, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, padding: '0.85rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
          <ShieldCheck size={24} color="#fff" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '0.5px' }}>
            Banking System
          </h2>
          <span style={{ fontSize: '0.7rem', color: '#818cf8', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
            Customer Portal
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => navigate('/notifications')} title="Notifications">
          <Bell size={18} />
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '20px', border: '1px solid var(--border-glass)' }}>
              <User size={16} color="#6366f1" />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
              </span>
            </div>
            <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }} onClick={() => navigate('/login')}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
