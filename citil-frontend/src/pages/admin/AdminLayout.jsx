import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar.jsx';
import Topbar from '../../components/admin/Topbar.jsx';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F9F9EA] text-[#2C3E50]">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar />
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
