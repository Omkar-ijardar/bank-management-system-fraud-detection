import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AIChatbot } from './components/AIChatbot';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { Accounts } from './pages/Accounts';
import { Deposit } from './pages/Deposit';
import { Withdraw } from './pages/Withdraw';
import { Transfer } from './pages/Transfer';
import { Transactions } from './pages/Transactions';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

// Admin Portal Imports
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminAccounts } from './pages/admin/AdminAccounts';
import { AdminTransactions } from './pages/admin/AdminTransactions';
import { AdminFraudAlerts } from './pages/admin/AdminFraudAlerts';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminProfile } from './pages/admin/AdminProfile';

import { ShieldAlert, ArrowLeft } from 'lucide-react';

// Access Denied Page for Unauthorized Manual URL Attempts
const AccessDenied = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090d16', color: '#fff', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '20px' }}>
        <div style={{ background: 'rgba(244, 63, 94, 0.2)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
          <ShieldAlert size={36} color="#f43f5e" />
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>Access Denied</h1>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
          You do not have administrative privileges to view this portal. All unauthorized access attempts are logged for security.
        </p>
        <a href="/dashboard" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px' }}>
          <ArrowLeft size={18} /> Return to Customer Dashboard
        </a>
      </div>
    </div>
  );
};

// Customer Protected Route Guard
const CustomerRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  return children;
};

// Admin Protected Route Guard
const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role !== 'ADMIN') return <Navigate to="/access-denied" replace />;
  return children;
};

// Customer Layout Shell
const CustomerLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
      <AIChatbot />
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Dedicated Enterprise Admin Portal Routes (Role-Protected for ADMIN) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="accounts" element={<AdminAccounts />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="fraud-alerts" element={<AdminFraudAlerts />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* Customer Portal Routes (Role-Protected for CUSTOMER) */}
          <Route
            path="/*"
            element={
              <CustomerRoute>
                <CustomerLayout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/withdraw" element={<Withdraw />} />
                    <Route path="/transfer" element={<Transfer />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </CustomerLayout>
              </CustomerRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
