import React, { useState } from 'react';
import { forgotPassword, resetPassword } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Key, AlertCircle, CheckCircle } from 'lucide-react';

export const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateStep1 = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!otp.trim()) {
      errs.otp = 'OTP Code is required.';
    }
    if (!newPassword) {
      errs.newPassword = 'New Password is required.';
    } else if (newPassword.length < 6) {
      errs.newPassword = 'Password must be at least 6 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccess('');

    if (!validateStep1()) return;

    setLoading(true);

    try {
      const res = await forgotPassword({ email: email.trim() });
      setSuccess(res.data?.message || 'Reset OTP generated!');
      setStep(2);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to process request for this email.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateStep2()) return;

    setLoading(true);

    try {
      await resetPassword({ email: email.trim(), otp: otp.trim(), newPassword });
      alert('Password reset successfully! Log in with your new password.');
      navigate('/login');
    } catch (err) {
      setFormError(err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
            <Key size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Reset Password</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Step {step} of 2</p>
        </div>

        {formError && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid var(--accent-rose)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
            <AlertCircle size={18} /> {formError}
          </div>
        )}

        {success && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-emerald)', color: '#6ee7b7', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
            <CheckCircle size={18} /> {success}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} noValidate>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Registered Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder="customer@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              {errors.email && <div className="error-text"><AlertCircle size={13} /> {errors.email}</div>}
            </div>

            <button className="btn-primary" type="submit" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send Reset OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} noValidate>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">OTP Code</label>
              <input
                type="text"
                className={`form-input ${errors.otp ? 'form-input-error' : ''}`}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  if (errors.otp) setErrors({ ...errors, otp: null });
                }}
              />
              {errors.otp && <div className="error-text"><AlertCircle size={13} /> {errors.otp}</div>}
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className={`form-input ${errors.newPassword ? 'form-input-error' : ''}`}
                  placeholder="New Secure Password (Min 6 chars)"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.newPassword) setErrors({ ...errors, newPassword: null });
                  }}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              {errors.newPassword && <div className="error-text"><AlertCircle size={13} /> {errors.newPassword}</div>}
            </div>

            <button className="btn-primary" type="submit" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Resetting Password...' : 'Confirm Reset'}
            </button>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          <Link to="/login" style={{ color: '#818cf8', textDecoration: 'none' }}>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
