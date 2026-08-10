import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Page content */}
        <main className="flex-1 overflow-hidden flex flex-col p-4 sm:p-5 lg:p-6 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
