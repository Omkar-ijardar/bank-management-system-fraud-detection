import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { getAccountsByCustomer, transferMoney, confirmTransfer } from '../api';
import { formatAccountNumber } from '../utils/formatters';
import { ArrowLeftRight, ShieldAlert, ShieldCheck, AlertCircle, Sparkles, AlertTriangle, Check, X, Bot } from 'lucide-react';

export const Transfer = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Automatic location detection
  const [city] = useState('Pune');

  // Modal State for Suspicious Transactions (>= ₹50,000 & flagged)
  const [suspiciousModal, setSuspiciousModal] = useState(null);

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const refreshAccounts = async () => {
    if (user?.customerId) {
      try {
        const res = await getAccountsByCustomer(user.customerId);
        const list = res.data?.data || [];
        setAccounts(list);
        if (list.length > 0 && !fromAccountId) setFromAccountId(list[0].accountId);
      } catch (err) {
        console.error('Failed to load accounts:', err);
      }
    }
  };

  useEffect(() => {
    refreshAccounts();
  }, [user]);

  const handleKeyDown = (e) => {
    // Prevent minus sign, plus sign, and exponent e character
    if (['-', '+', 'e', 'E'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const validate = () => {
    const errs = {};
    if (!fromAccountId) {
      errs.fromAccountId = 'Please select a source account.';
    }

    if (!toAccountId) {
      errs.toAccountId = 'Please enter destination account ID.';
    } else if (parseInt(fromAccountId) === parseInt(toAccountId)) {
      errs.toAccountId = 'Sender and receiver accounts cannot be the same.';
    }

    if (!amount) {
      errs.amount = 'Amount is required.';
    } else {
      const num = parseFloat(amount);
      if (isNaN(num) || num <= 0) {
        errs.amount = 'Amount must be greater than zero.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!validate()) {
      return;
    }

    setLoading(true);
    const transferAmount = parseFloat(amount);

    try {
      const payload = {
        fromAccountId: parseInt(fromAccountId),
        toAccountId: parseInt(toAccountId),
        amount: transferAmount,
        transactionCity: city,
        clientIpAddress: '127.0.0.1'
      };

      const res = await transferMoney(payload);
      const data = res.data;

      if (transferAmount >= 50000 || data.status === 'FLAGGED' || data.isFraud) {
        // Trigger Suspicious Transaction Confirmation Modal Popup
        setSuspiciousModal({
          fromAccountId: parseInt(fromAccountId),
          toAccountId: parseInt(toAccountId),
          amount: transferAmount,
          city: city,
          clientIpAddress: '127.0.0.1',
          riskScore: data.riskScore || 85,
          aiExplanation: data.aiExplanation || 'This transaction has been flagged for security verification because it exceeds the fraud detection threshold.'
        });
      } else {
        setResult({
          isFlagged: false,
          status: 'SUCCESS',
          message: 'Fund Transfer Completed Successfully!',
          txId: data.transactionId
        });
        setAmount('');
        refreshAccounts();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed. Please check account details & available balance.');
    } finally {
      setLoading(false);
    }
  };

  const handleAllowTransfer = async () => {
    if (!suspiciousModal) return;
    setLoading(true);
    setError('');

    try {
      const payload = {
        fromAccountId: suspiciousModal.fromAccountId,
        toAccountId: suspiciousModal.toAccountId,
        amount: suspiciousModal.amount,
        transactionCity: suspiciousModal.city,
        clientIpAddress: suspiciousModal.clientIpAddress,
        customerDecision: 'Allowed',
        riskScore: suspiciousModal.riskScore,
        aiExplanation: suspiciousModal.aiExplanation
      };

      const res = await confirmTransfer(payload);
      setSuspiciousModal(null);

      setResult({
        isFlagged: false,
        status: 'SUCCESS',
        message: 'Transfer Approved & Executed Successfully! Money transferred to destination account.',
        txId: res.data?.transactionId
      });

      setAmount('');
      refreshAccounts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve transfer.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockTransfer = async () => {
    if (!suspiciousModal) return;
    setLoading(true);
    setError('');

    try {
      const payload = {
        fromAccountId: suspiciousModal.fromAccountId,
        toAccountId: suspiciousModal.toAccountId,
        amount: suspiciousModal.amount,
        transactionCity: suspiciousModal.city,
        clientIpAddress: suspiciousModal.clientIpAddress,
        customerDecision: 'Blocked',
        riskScore: suspiciousModal.riskScore,
        aiExplanation: suspiciousModal.aiExplanation
      };

      await confirmTransfer(payload);
      setSuspiciousModal(null);

      setResult({
        isFlagged: true,
        status: 'BLOCKED',
        message: 'Transfer Cancelled: Transaction blocked by customer request. No funds were debited.',
      });

      setAmount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record blocked transfer.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) => {
    return '₹' + (parseFloat(val) || 0).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <ArrowLeftRight size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>Fund Transfer</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fast, Secure & Automated Fraud Threshold Guard Active</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid var(--accent-rose)', color: '#fca5a5', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {result && !result.isFlagged && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-emerald)', color: '#6ee7b7', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={28} color="#34d399" />
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{result.message}</h4>
              <p style={{ fontSize: '0.85rem', color: '#a7f3d0' }}>Balance updated in account ledger.</p>
            </div>
          </div>
        )}

        {result && result.isFlagged && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid var(--accent-rose)', color: '#fca5a5', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldAlert size={28} color="#f87171" />
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{result.message}</h4>
              <p style={{ fontSize: '0.85rem', color: '#fca5a5' }}>FraudLog updated with decision: Blocked.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleTransferSubmit} noValidate>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">From Account (Sender)</label>
            <select
              className={`form-select ${errors.fromAccountId ? 'form-input-error' : ''}`}
              value={fromAccountId}
              onChange={(e) => {
                setFromAccountId(e.target.value);
                if (errors.fromAccountId) setErrors({ ...errors, fromAccountId: null });
                if (errors.toAccountId) setErrors({ ...errors, toAccountId: null });
              }}
            >
              <option value="">-- Select Source Account --</option>
              {accounts.map((acc) => (
                <option key={acc.accountId} value={acc.accountId}>
                  {acc.accountType} - {formatAccountNumber(acc.accountNumber)} (Available: ₹{parseFloat(acc.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })})
                </option>
              ))}
            </select>
            {errors.fromAccountId && <div className="error-text"><AlertCircle size={13} /> {errors.fromAccountId}</div>}
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">To Account ID (Receiver Target)</label>
            <input
              type="number"
              onKeyDown={handleKeyDown}
              className={`form-input ${errors.toAccountId ? 'form-input-error' : ''}`}
              placeholder="e.g. 2"
              value={toAccountId}
              onChange={(e) => {
                const val = e.target.value;
                if (parseFloat(val) < 0) return;
                setToAccountId(val);
                if (errors.toAccountId) setErrors({ ...errors, toAccountId: null });
              }}
            />
            {errors.toAccountId && <div className="error-text"><AlertCircle size={13} /> {errors.toAccountId}</div>}
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Transfer Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              onKeyDown={handleKeyDown}
              className={`form-input ${errors.amount ? 'form-input-error' : ''}`}
              placeholder="e.g. 50000"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (parseFloat(val) < 0) return;
                setAmount(val);
                if (errors.amount) setErrors({ ...errors, amount: null });
              }}
            />
            {errors.amount && <div className="error-text"><AlertCircle size={13} /> {errors.amount}</div>}
          </div>

          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Sparkles size={16} /> Transfers under ₹50,000 execute instantly. Transfers ₹50,000 or greater undergo security verification.
          </div>

          <button className="btn-primary" type="submit" style={{ width: '100%', padding: '0.9rem' }} disabled={loading}>
            {loading ? 'Processing Transfer...' : 'Execute Secure Transfer'}
          </button>
        </form>
      </div>

      {/* SUSPICIOUS TRANSACTION CONFIRMATION MODAL POPUP */}
      {suspiciousModal && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(5, 8, 18, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '1.5rem',
            overflowY: 'auto',
            pointerEvents: 'auto'
          }}
        >
          <div
            className="glass-panel animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '480px',
              padding: '2.25rem',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.2)',
              borderRadius: '20px',
              textAlign: 'center',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            {/* Warning Icon Header */}
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <AlertTriangle size={36} color="#f59e0b" />
            </div>

            {/* Modal Title */}
            <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
              Suspicious Transaction Detected
            </h2>

            {/* Dynamic Amount Message */}
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '0.6rem 1rem', borderRadius: '10px', display: 'inline-block', marginBottom: '1rem', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
              You are about to transfer {formatCurrency(suspiciousModal.amount)}.
            </div>

            {/* Verification Subtitle */}
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
              This transaction has been flagged for security verification because it exceeds the fraud detection threshold. Please confirm whether you want to continue with this transfer.
            </p>

            {/* Security Note Box */}
            {suspiciousModal.aiExplanation && (
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.85rem 1rem', borderRadius: '12px', textAlign: 'left', marginBottom: '1.5rem', borderLeft: '4px solid #f59e0b', fontSize: '0.825rem' }}>
                <div style={{ color: '#fbbf24', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                  <Bot size={15} /> Security Note:
                </div>
                <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>{suspiciousModal.aiExplanation}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                type="button"
                onClick={handleAllowTransfer}
                disabled={loading}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)',
                  padding: '0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}
              >
                <Check size={18} /> Allow Transfer
              </button>

              <button
                type="button"
                onClick={handleBlockTransfer}
                disabled={loading}
                className="btn-danger"
                style={{
                  background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                  boxShadow: '0 4px 15px rgba(244, 63, 94, 0.35)',
                  padding: '0.85rem',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}
              >
                <X size={18} /> Block Transfer
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
