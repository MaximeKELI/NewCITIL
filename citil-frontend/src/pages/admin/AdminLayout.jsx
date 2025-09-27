import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar.jsx';
import Topbar from '../../components/admin/Topbar.jsx';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F9F9EA] text-[#2C3E50]">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
