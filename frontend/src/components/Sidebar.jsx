import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, ArrowDownRight, ArrowUpRight, ArrowLeftRight, History, User, Settings } from 'lucide-react';

export const Sidebar = () => {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/accounts', label: 'My Accounts', icon: Wallet },
    { to: '/deposit', label: 'Deposit Money', icon: ArrowDownRight },
    { to: '/withdraw', label: 'Withdraw Money', icon: ArrowUpRight },
    { to: '/transfer', label: 'Fund Transfer', icon: ArrowLeftRight },
    { to: '/transactions', label: 'Transaction History', icon: History },
    { to: '/profile', label: 'My Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="glass-panel" style={{ width: '240px', minHeight: 'calc(100vh - 65px)', borderRadius: 0, borderTop: 0, borderBottom: 0, borderLeft: 0, padding: '1.5rem 1rem' }}>
      <div style={{ padding: '0.5rem 1rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Customer Portal
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(6, 182, 212, 0.15))' : 'transparent',
                border: isActive ? '1px solid var(--border-glass-focus)' : '1px solid transparent',
                fontWeight: isActive ? 600 : 400,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              })}
            >
              <Icon size={18} color="#6366f1" />
              <span style={{ fontSize: '0.9rem' }}>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
