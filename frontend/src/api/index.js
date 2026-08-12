import axios from 'axios';

const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';

const AUTH_URL = import.meta.env.VITE_AUTH_URL || `http://${hostname}:9090/api/auth`;
const ACCOUNT_URL = import.meta.env.VITE_ACCOUNT_URL || `http://${hostname}:8082/api/accounts`;
const TRANSACTION_URL = import.meta.env.VITE_TRANSACTION_URL || `http://${hostname}:8086/api/transactions`;
const TRANSFER_URL = import.meta.env.VITE_TRANSFER_URL || `http://${hostname}:8083/api/transactions`;
const FRAUD_URL = import.meta.env.VITE_FRAUD_URL || `http://${hostname}:5000/api/Fraud`;
const CHAT_URL = import.meta.env.VITE_CHAT_URL || `http://${hostname}:5000/api/Chat`;

// Global Axios Interceptor for Authorization Header
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth API Calls
export const registerUser = (data) => axios.post(`${AUTH_URL}/register`, data);
export const verifyOtp = (data) => axios.post(`${AUTH_URL}/verify-otp`, data);
export const loginUser = (data) => axios.post(`${AUTH_URL}/login`, data);
export const forgotPassword = (data) => axios.post(`${AUTH_URL}/forgot-password`, data);
export const resetPassword = (data) => axios.post(`${AUTH_URL}/reset-password`, data);
export const logoutUser = () => axios.post(`${AUTH_URL}/logout`, {}, { headers: getAuthHeader() });
export const checkCustomerExists = (id) => axios.get(`${AUTH_URL}/customers/${id}`);
export const getCustomerProfile = (id) => axios.get(`${AUTH_URL}/customers/profile/${id}`, { headers: getAuthHeader() });
export const getAllCustomers = () => axios.get(`${AUTH_URL}/customers`, { headers: getAuthHeader() });

// Account API Calls
export const createAccount = (data) => axios.post(ACCOUNT_URL, data, { headers: getAuthHeader() });
export const getAllAccounts = () => axios.get(ACCOUNT_URL, { headers: getAuthHeader() });
export const getAccountById = (accountId) => axios.get(`${ACCOUNT_URL}/${accountId}`, { headers: getAuthHeader() });
export const getAccountsByCustomer = (customerId) => axios.get(`${ACCOUNT_URL}/customer/${customerId}`, { headers: getAuthHeader() });
export const updateAccount = (accountId, data) => axios.put(`${ACCOUNT_URL}/${accountId}`, data, { headers: getAuthHeader() });
export const updateAccountBalance = (accountId, data) => axios.put(`${ACCOUNT_URL}/${accountId}/balance`, data, { headers: getAuthHeader() });
export const closeAccount = (accountId) => axios.delete(`${ACCOUNT_URL}/${accountId}`, { headers: getAuthHeader() });

// Transaction API Calls
export const depositMoney = (data) => axios.post(`${TRANSACTION_URL}/deposit`, data, { headers: getAuthHeader() });
export const withdrawMoney = (data) => axios.post(`${TRANSACTION_URL}/withdraw`, data, { headers: getAuthHeader() });
export const getTransactionById = (id) => axios.get(`${TRANSACTION_URL}/${id}`, { headers: getAuthHeader() });
export const getTransactionHistory = (accountId) => axios.get(`${TRANSACTION_URL}/account/${accountId}`, { headers: getAuthHeader() });
export const getAllTransactions = () => axios.get(`${TRANSACTION_URL}/all`, { headers: getAuthHeader() });

// Transfer & Fraud API Calls
export const transferMoney = (data) => axios.post(`${TRANSFER_URL}/transfer`, data, { headers: getAuthHeader() });
export const confirmTransfer = (data) => axios.post(`${TRANSFER_URL}/transfer/confirm`, data, { headers: getAuthHeader() });
export const checkFraud = (data) => axios.post(`${FRAUD_URL}/check`, data);
export const getAllFraudLogs = () => axios.get(`${FRAUD_URL}/logs`);
export const getCustomerFraudLogs = (customerId) => axios.get(`${FRAUD_URL}/customer/${customerId}`);

// AI Chatbot API
export const sendChatMessage = (message) => axios.post(`${CHAT_URL}/chat`, { message });

// Admin & Dashboard API Calls
export const getAdminMetrics = async () => {
  const [authTotal, accountTotal, accountActive, txTotal, txSuccess, txFailed, txAmount, fraudTotal, fraudPending] = await Promise.all([
    axios.get(`${AUTH_URL}/internal/dashboard/total-customers`).catch(() => ({ data: 0 })),
    axios.get(`${ACCOUNT_URL}/internal/dashboard/total-accounts`).catch(() => ({ data: 0 })),
    axios.get(`${ACCOUNT_URL}/internal/dashboard/active-accounts`).catch(() => ({ data: 0 })),
    axios.get(`${TRANSACTION_URL}/internal/dashboard/total`).catch(() => ({ data: 0 })),
    axios.get(`${TRANSACTION_URL}/internal/dashboard/successful`).catch(() => ({ data: 0 })),
    axios.get(`${TRANSACTION_URL}/internal/dashboard/failed`).catch(() => ({ data: 0 })),
    axios.get(`${TRANSACTION_URL}/internal/dashboard/amount`).catch(() => ({ data: 0 })),
    axios.get(`${FRAUD_URL}/internal/dashboard/total`).catch(() => ({ data: 0 })),
    axios.get(`${FRAUD_URL}/internal/dashboard/pending`).catch(() => ({ data: 0 }))
  ]);

  return {
    totalCustomers: authTotal.data,
    totalAccounts: accountTotal.data,
    activeAccounts: accountActive.data,
    totalTransactions: txTotal.data,
    successfulTransactions: txSuccess.data,
    failedTransactions: txFailed.data,
    totalTransactionAmount: txAmount.data,
    totalFraudCases: fraudTotal.data,
    pendingFraudCases: fraudPending.data
  };
};
