import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNavbar } from './AdminNavbar';
import { AdminSidebar } from './AdminSidebar';

export const AdminLayout = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      <AdminNavbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 65px)' }}>
        <AdminSidebar />
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'radial-gradient(circle at 50% 0%, rgba(15, 23, 42, 0.9), #090d16 70%)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
