import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

import Dashboard             from './pages/Dashboard';
import Schools               from './pages/Schools';
import RegistrationRequests  from './pages/RegistrationRequests';
import Plans from  "./pages/Plans/Plans";
import Subscriptions         from './pages/Subscriptions';
import Payments              from './pages/Payments';
import Modules               from './pages/Modules';
import Users                 from './pages/Users';
import Notifications         from './pages/Notifications';
import SupportTickets        from './pages/SupportTickets';

import AuditLogs             from './pages/AuditLogs';
import SystemSettings        from './pages/SystemSettings';
import Profile               from './pages/Profile';
import ReportsAnalytics from './pages/ReportsAnalytics';
import AddOn from './pages/Plans/Addon';
import CreatePlan from './pages/Plans/CreatePlan';
import EditPlan from './pages/Plans/EditPlan';
import EditAddOnPlan from './pages/Plans/EditAddOnPlan';
import CreateAddOnPlan from './pages/Plans/CreateAddonPlan';
import DemoRequests from './pages/DemoRequests';
import Coupon from './pages/Coupon';
import Orders from './pages/Orders';
import Trials from './pages/Trials';
import Announcements from './pages/Announcements/Announcements';
import EmailLogs from './pages/EmailLogs';
import FAQ from './pages/FAQ';
import Blogs from "./pages/Blogs/Blogs";
import CreateBlog from './pages/Blogs/CreateBlog';
import Testimonials from './pages/Testimonial/Testimonials';
import CreateTestimonial from './pages/Testimonial/CreateTestimonial';
import AboutUs from './pages/AboutUs';
import CreateAnnouncement from './pages/Announcements/CreateAnnouncements';
import CreateAnnouncements from './pages/Announcements/CreateAnnouncements';


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
              <Route path="/demo-requests"  element={<DemoRequests />} />
          <Route path="/plans"                  element={<Plans/>} />
          <Route path="/plans/add-ons" element ={<AddOn/>}/>
          <Route path="/subscriptions"          element={<Subscriptions />} />
          <Route path="/payments"               element={<Payments />} />
                  <Route path="/faq"               element={<FAQ />} />
          <Route path="/modules"                element={<Modules />} />
            <Route path="/trials"                element={<Trials />} />
          <Route path="/users"                  element={<Users />} />
          <Route path="/notifications"          element={<Notifications />} />
          <Route path="/support-tickets"        element={<SupportTickets />} />
           <Route path="/coupons"        element={<Coupon/>} />
          <Route path="/audit-logs"             element={<AuditLogs />} />
          <Route path="/system-settings"        element={<SystemSettings />} />
          <Route path="/profile"                element={<Profile />} />
          <Route path="/reportsanalytics"       element={<ReportsAnalytics/>}/>
             <Route path="/systemsettings"       element={<SystemSettings/>}/>
             <Route path="/plans/create" element={<CreatePlan/>}/>
           <Route path="/plans/edit/:id" element={<EditPlan />} />
                <Route path="/plans/add-ons/edit/:id" element={<EditAddOnPlan />} />
                     <Route path="/plans/add-ons/create" element={<CreateAddOnPlan />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/announcement"  element={<Announcements/>}/>
                        <Route path="/emaillogs" element={<EmailLogs/>}/>
                        <Route path="/blogs" element={<Blogs/>}/>
                        <Route path="/blogs/create" element={<CreateBlog/>}/>
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/testimonials/create" element={<CreateTestimonial />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/create-announcement" element={<CreateAnnouncements/>}/>
          </Routes>
      </div>
    </div>
  );
}
