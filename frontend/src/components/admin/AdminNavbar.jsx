import React from 'react';
import { ShieldCheck, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ height: '65px', background: 'rgba(15, 23, 42, 0.98)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Left: Project Logo & Project Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/admin/dashboard')}>
        <div style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', padding: '0.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldCheck size={24} color="#fff" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '0.5px' }}>
            Banking System
          </h2>
          <span style={{ fontSize: '0.7rem', color: '#06b6d4', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700 }}>
            Admin Portal
          </span>
        </div>
      </div>

      {/* Right: Notifications, Admin Info, Role & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Notification Icon */}
        <button
          className="btn-secondary"
          style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
          title="Notifications"
        >
          <Bell size={18} color="#94a3b8" />
          <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', background: '#f43f5e', borderRadius: '50%' }}></span>
        </button>

        {/* Logged-in Admin Name & Role */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'rgba(30, 41, 59, 0.7)', padding: '0.4rem 0.85rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <User size={16} color="#06b6d4" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>
              {user?.firstName ? `${user.firstName} ${user.lastName}` : (user?.email || 'System Admin')}
            </div>
            <div style={{ color: '#06b6d4', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
              Admin
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn-secondary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f87171' }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
};
