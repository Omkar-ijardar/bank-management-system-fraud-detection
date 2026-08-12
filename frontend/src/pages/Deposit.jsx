import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAccountsByCustomer, depositMoney } from '../api';
import { formatAccountNumber } from '../utils/formatters';
import { ArrowDownRight, AlertCircle, CheckCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Deposit = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('Online cash deposit');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Automatic location detection
  const [city] = useState('Pune');

  const fetchUserAccounts = async () => {
    if (user?.customerId) {
      try {
        const res = await getAccountsByCustomer(user.customerId);
        const list = res.data?.data || [];
        setAccounts(list);
        if (list.length > 0) {
          setAccountId(list[0].accountId.toString());
        } else {
          setAccountId('');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchUserAccounts();
  }, [user]);

  const handleKeyDown = (e) => {
    if (['-', '+', 'e', 'E'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const validate = () => {
    const errs = {};
    const parsedAccId = parseInt(accountId);
    if (!accountId || isNaN(parsedAccId) || parsedAccId <= 0) {
      errs.accountId = 'Please select a valid bank account.';
    }

    if (!amount) {
      errs.amount = 'Amount is required.';
    } else {
      const num = parseFloat(amount);
      if (isNaN(num) || num <= 0) {
        errs.amount = 'Amount must be greater than zero.';
      }
    }

    if (!description.trim()) {
      errs.description = 'Description / Remarks is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const res = await depositMoney({
        accountId: parseInt(accountId),
        amount: parseFloat(amount),
        description: description.trim(),
        transactionCity: city
      });

      const updatedBal = res.data?.data?.availableBalance;

      // Update state locally immediately
      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) =>
          acc.accountId === parseInt(accountId)
            ? { ...acc, balance: updatedBal !== undefined ? updatedBal : (parseFloat(acc.balance) + parseFloat(amount)) }
            : acc
        )
      );

      setSuccess(`Successfully deposited ₹${parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}! Reference: ${res.data?.data?.referenceNumber || 'SUCCESS'}`);
      setAmount('');

      // Refresh accounts from backend to guarantee sync
      setTimeout(() => {
        fetchUserAccounts();
      }, 300);

    } catch (err) {
      setError(err.response?.data?.message || 'Deposit failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '540px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <ArrowDownRight size={32} color="#10b981" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>Deposit Money</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Direct cash or transfer credit to your bank account</p>
        </div>

        {accounts.length === 0 && (
          <div style={{ background: 'rgba(234, 179, 8, 0.15)', border: '1px solid #eab308', color: '#fef08a', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <AlertCircle size={18} color="#eab308" /> No Active Bank Accounts Found
            </div>
            <div>You don't have an active bank account yet. Please open an account first before attempting to deposit.</div>
            <Link to="/accounts" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem', alignSelf: 'flex-start', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
              <PlusCircle size={14} /> Open Bank Account
            </Link>
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid var(--accent-rose)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {success && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-emerald)', color: '#6ee7b7', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CheckCircle size={18} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Select Target Account</label>
            <select
              className={`form-select ${errors.accountId ? 'form-input-error' : ''}`}
              value={accountId}
              onChange={(e) => {
                setAccountId(e.target.value);
                if (errors.accountId) setErrors({ ...errors, accountId: null });
              }}
              disabled={accounts.length === 0}
            >
              <option value="">-- Select Account --</option>
              {accounts.map((acc) => (
                <option key={acc.accountId} value={acc.accountId}>
                  {acc.accountType} - {formatAccountNumber(acc.accountNumber)} (Balance: ₹{parseFloat(acc.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })})
                </option>
              ))}
            </select>
            {errors.accountId && <div className="error-text"><AlertCircle size={13} /> {errors.accountId}</div>}
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Deposit Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              onKeyDown={handleKeyDown}
              className={`form-input ${errors.amount ? 'form-input-error' : ''}`}
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (parseFloat(val) < 0) return;
                setAmount(val);
                if (errors.amount) setErrors({ ...errors, amount: null });
              }}
              disabled={accounts.length === 0}
            />
            {errors.amount && <div className="error-text"><AlertCircle size={13} /> {errors.amount}</div>}
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Description / Remarks</label>
            <input
              type="text"
              className={`form-input ${errors.description ? 'form-input-error' : ''}`}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: null });
              }}
              disabled={accounts.length === 0}
            />
            {errors.description && <div className="error-text"><AlertCircle size={13} /> {errors.description}</div>}
          </div>

          <button className="btn-primary" type="submit" style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #10b981, #059669)' }} disabled={loading || accounts.length === 0}>
            {loading ? 'Processing Deposit...' : 'Confirm Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
};
