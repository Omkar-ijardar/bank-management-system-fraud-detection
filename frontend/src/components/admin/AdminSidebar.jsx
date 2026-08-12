import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, Wallet, History, ShieldAlert, BarChart3, UserCheck, LogOut, ShieldCheck } from 'lucide-react';

export const AdminSidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/customers', label: 'Customers', icon: Users },
    { to: '/admin/accounts', label: 'Accounts', icon: Wallet },
    { to: '/admin/transactions', label: 'Transactions', icon: History },
    { to: '/admin/fraud-alerts', label: 'Fraud Alerts', icon: ShieldAlert, badge: 'High Priority' },
    { to: '/admin/analytics', label: 'Reports / Analytics', icon: BarChart3 },
    { to: '/admin/profile', label: 'Admin Profile', icon: UserCheck },
  ];

  return (
    <aside style={{ width: '260px', minHeight: 'calc(100vh - 65px)', background: 'rgba(15, 23, 42, 0.95)', borderRight: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem 1rem' }}>
      <div>
        <div style={{ padding: '0.5rem 1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.25rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={20} color="#fff" />
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>Banking System</h4>
            <span style={{ color: '#06b6d4', fontSize: '0.725rem', fontWeight: 700, letterSpacing: '0.5px' }}>ADMIN DASHBOARD</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.8rem 1rem',
                  borderRadius: '10px',
                  color: isActive ? '#fff' : '#94a3b8',
                  background: isActive ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.15))' : 'transparent',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Icon size={18} color={link.to.includes('fraud') ? '#f43f5e' : '#38bdf8'} />
                  <span style={{ fontSize: '0.875rem' }}>{link.label}</span>
                </div>
                {link.badge && (
                  <span style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f87171', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '6px', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '0.75rem', borderRadius: '10px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
            {user?.firstName ? user.firstName[0] : 'A'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ color: '#fff', fontSize: '0.825rem', fontWeight: 600, margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.firstName ? `${user.firstName} ${user.lastName}` : (user?.email || 'Admin User')}
            </p>
            <p style={{ color: '#06b6d4', fontSize: '0.725rem', margin: 0, fontWeight: 700 }}>ROLE: ADMIN</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: '0.6rem',
            padding: '0.75rem',
            borderRadius: '10px',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#f87171',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <LogOut size={16} /> Logout Session
        </button>
      </div>
    </aside>
  );
};
