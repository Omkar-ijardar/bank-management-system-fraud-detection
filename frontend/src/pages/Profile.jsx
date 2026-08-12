import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCustomerProfile } from '../api';
import { formatCustomerId } from '../utils/formatters';
import { User, Mail, Phone, Calendar, MapPin, CreditCard, ShieldCheck, UserCheck, Hash } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.customerId) {
      getCustomerProfile(user.customerId)
        .then((res) => {
          setProfile(res.data);
        })
        .catch(() => {
          setProfile(user);
        })
        .finally(() => setLoading(false));
    } else {
      setProfile(user);
      setLoading(false);
    }
  }, [user]);

  const p = profile || user || {};

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header Card */}
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', width: '72px', height: '72px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)' }}>
          <User size={36} color="#fff" />
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>
          {p.firstName ? `${p.firstName} ${p.lastName}` : 'Customer Profile'}
        </h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', fontWeight: 700, fontSize: '0.825rem', padding: '0.35rem 0.85rem', borderRadius: '20px', marginTop: '0.5rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <ShieldCheck size={14} /> {formatCustomerId(p.customerId)} • Role: {p.role || 'CUSTOMER'}
        </div>
      </div>

      {/* Customer Profile Detailed Grid (All Fields Except Password) */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
          <UserCheck size={22} color="#06b6d4" /> Personal & Account Information
        </h3>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading account profile...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Hash size={14} color="#06b6d4" /> Customer ID
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{formatCustomerId(p.customerId)}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} color="#06b6d4" /> First Name
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.firstName || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} color="#06b6d4" /> Last Name
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.lastName || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={14} color="#06b6d4" /> Email Address
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.email || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} color="#06b6d4" /> Mobile Phone Number
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.mobile || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} color="#06b6d4" /> Date of Birth
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.dateOfBirth || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <UserCheck size={14} color="#06b6d4" /> Gender
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.gender || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={14} color="#06b6d4" /> Aadhaar Card Number
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.aadhaarNumber || p.aadhaar || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CreditCard size={14} color="#06b6d4" /> PAN Number
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.panNumber || p.pan || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} color="#06b6d4" /> Address
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.address || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} color="#06b6d4" /> City & State
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.city ? `${p.city}, ${p.state}` : 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} color="#06b6d4" /> Pincode
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{p.pincode || 'N/A'}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <UserCheck size={14} color="#06b6d4" /> Account Role
              </div>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '1rem' }}>{p.role || 'CUSTOMER'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
