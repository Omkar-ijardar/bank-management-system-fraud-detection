import React from 'react';
import { Bell, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: 'Security Shield Active',
      message: 'Your account is protected by .NET Real-Time Fraud Score Monitoring.',
      time: 'Just now',
      type: 'info'
    },
    {
      id: 2,
      title: 'JWT Token Authenticated',
      message: 'Bearer token issued with 24-hour expiration for secure session access.',
      time: '10 mins ago',
      type: 'success'
    },
    {
      id: 3,
      title: 'Transfer Limit & Location Rules',
      message: 'Transfers exceeding ₹100,000 trigger automated Gemini AI risk explanations.',
      time: '1 hour ago',
      type: 'warning'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '720px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Bell size={28} color="#6366f1" /> System & Security Notifications
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real-time alerts from microservices & fraud detection system</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifications.map((n) => (
          <div key={n.id} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: n.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : n.type === 'warning' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.2)', padding: '0.6rem', borderRadius: '12px' }}>
              {n.type === 'success' ? <CheckCircle2 size={22} color="#10b981" /> : n.type === 'warning' ? <AlertTriangle size={22} color="#f59e0b" /> : <ShieldCheck size={22} color="#6366f1" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>{n.title}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.time}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
