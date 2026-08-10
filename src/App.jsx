import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

import Dashboard             from './pages/Dashboard';
import Schools               from './pages/Schools';
import RegistrationRequests  from './pages/RegistrationRequests';
import Plans                 from './pages/Plans';
import Subscriptions         from './pages/Subscriptions';
import Payments              from './pages/Payments';
import Modules               from './pages/Modules';
import Users                 from './pages/Users';
import Notifications         from './pages/Notifications';
import SupportTickets        from './pages/SupportTickets';
import Reports               from './pages/Reports';
import AuditLogs             from './pages/AuditLogs';
import SystemSettings        from './pages/SystemSettings';
import Profile               from './pages/Profile';

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/"                       element={<Dashboard />} />
          <Route path="/schools"                element={<Schools />} />
          <Route path="/registration-requests"  element={<RegistrationRequests />} />
          <Route path="/plans"                  element={<Plans />} />
          <Route path="/subscriptions"          element={<Subscriptions />} />
          <Route path="/payments"               element={<Payments />} />
          <Route path="/modules"                element={<Modules />} />
          <Route path="/users"                  element={<Users />} />
          <Route path="/notifications"          element={<Notifications />} />
          <Route path="/support-tickets"        element={<SupportTickets />} />
          <Route path="/reports"                element={<Reports />} />
          <Route path="/audit-logs"             element={<AuditLogs />} />
          <Route path="/system-settings"        element={<SystemSettings />} />
          <Route path="/profile"                element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
