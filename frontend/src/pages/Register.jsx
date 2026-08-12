import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '1995-05-15',
    gender: 'MALE',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    aadhaar: '',
    pan: '',
    address: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001'
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMobileChange = (e) => {
    // Restrict mobile input to digits only and max 10 characters
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, mobile: val });
    if (errors.mobile) setErrors({ ...errors, mobile: null });
  };

  const handleAadhaarChange = (e) => {
    // Restrict Aadhaar input to digits only and max 12 characters
    const val = e.target.value.replace(/\D/g, '').slice(0, 12);
    setFormData({ ...formData, aadhaar: val });
    if (errors.aadhaar) setErrors({ ...errors, aadhaar: null });
  };

  const handlePanChange = (e) => {
    // Restrict PAN input to max 10 uppercase chars
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setFormData({ ...formData, pan: val });
    if (errors.pan) setErrors({ ...errors, pan: null });
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    // Allow alphabets and spaces only
    const val = value.replace(/[^A-Za-z\s]/g, '');
    setFormData({ ...formData, [name]: val });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validate = () => {
    const errs = {};

    if (!formData.firstName.trim()) {
      errs.firstName = 'First Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(formData.firstName.trim())) {
      errs.firstName = 'First Name must contain alphabets only.';
    }

    if (!formData.lastName.trim()) {
      errs.lastName = 'Last Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(formData.lastName.trim())) {
      errs.lastName = 'Last Name must contain alphabets only.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.mobile) {
      errs.mobile = 'Mobile number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      errs.mobile = 'Mobile number must start with 6, 7, 8, or 9 and be 10 digits.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.dateOfBirth) {
      errs.dateOfBirth = 'Date of birth is required.';
    }

    if (!formData.aadhaar) {
      errs.aadhaar = 'Aadhaar number is required.';
    } else if (!/^\d{12}$/.test(formData.aadhaar)) {
      errs.aadhaar = 'Please enter a valid 12-digit Aadhaar number.';
    }

    if (!formData.pan) {
      errs.pan = 'PAN number is required.';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      errs.pan = 'Please enter a valid 10-character PAN number (e.g. ABCDE1234F).';
    }

    if (!formData.address.trim()) {
      errs.address = 'Street address is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMsg('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await registerUser(formData);
      setSuccessMsg('Account successfully created! Redirecting to login page...');
      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } catch (err) {
      const backendData = err.response?.data;
      if (backendData?.errors) {
        setErrors((prev) => ({ ...prev, ...backendData.errors }));
      }
      setFormError(backendData?.message || backendData?.error || 'Registration failed. Check details.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '760px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
            <ShieldCheck size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff' }}>Open a Banking System Account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Fast, Secure & Fraud-Protected Onboarding</p>
        </div>

        {formError && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid var(--accent-rose)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
            <AlertCircle size={18} /> {formError}
          </div>
        )}

        {successMsg && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', fontWeight: 600 }}>
            <CheckCircle size={22} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} noValidate style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
              placeholder="e.g. Rohan"
              value={formData.firstName}
              onChange={handleNameChange}
            />
            {errors.firstName && <div className="error-text"><AlertCircle size={13} /> {errors.firstName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
              placeholder="e.g. Bhatia"
              value={formData.lastName}
              onChange={handleNameChange}
            />
            {errors.lastName && <div className="error-text"><AlertCircle size={13} /> {errors.lastName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              placeholder="customer@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-text"><AlertCircle size={13} /> {errors.email}</div>}
          </div>

          {/* Indian Mobile Number with Sleek Integrated +91 Prefix */}
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{
                position: 'absolute',
                left: '0.85rem',
                color: '#06b6d4',
                fontWeight: 700,
                fontSize: '0.9rem',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                borderRight: '1px solid rgba(255, 255, 255, 0.15)',
                paddingRight: '0.6rem',
                height: '55%'
              }}>
                +91
              </div>
              <input
                type="text"
                name="mobile"
                className={`form-input ${errors.mobile ? 'form-input-error' : ''}`}
                placeholder="9876543210"
                value={formData.mobile}
                onChange={handleMobileChange}
                maxLength={10}
                style={{ paddingLeft: '3.8rem' }}
              />
            </div>
            {errors.mobile && <div className="error-text"><AlertCircle size={13} /> {errors.mobile}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-input ${errors.password ? 'form-input-error' : ''}`}
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error-text"><AlertCircle size={13} /> {errors.password}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="error-text"><AlertCircle size={13} /> {errors.confirmPassword}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className={`form-input ${errors.dateOfBirth ? 'form-input-error' : ''}`}
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && <div className="error-text"><AlertCircle size={13} /> {errors.dateOfBirth}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Aadhaar Number (12 digits)</label>
            <input
              type="text"
              name="aadhaar"
              className={`form-input ${errors.aadhaar ? 'form-input-error' : ''}`}
              placeholder="123456789012"
              value={formData.aadhaar}
              onChange={handleAadhaarChange}
              maxLength={12}
            />
            {errors.aadhaar && <div className="error-text"><AlertCircle size={13} /> {errors.aadhaar}</div>}
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">PAN Number (10 characters)</label>
            <input
              type="text"
              name="pan"
              className={`form-input ${errors.pan ? 'form-input-error' : ''}`}
              placeholder="ABCDE1234F"
              value={formData.pan}
              onChange={handlePanChange}
              maxLength={10}
            />
            {errors.pan && <div className="error-text"><AlertCircle size={13} /> {errors.pan}</div>}
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Street Address</label>
            <input
              type="text"
              name="address"
              className={`form-input ${errors.address ? 'form-input-error' : ''}`}
              placeholder="123 Financial Tower, MG Road"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <div className="error-text"><AlertCircle size={13} /> {errors.address}</div>}
          </div>

          <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
            <button className="btn-primary" type="submit" style={{ width: '100%', padding: '0.85rem' }} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#818cf8', fontWeight: 600, textDecoration: 'none' }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
