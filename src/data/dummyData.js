// ============================================
// DUMMY DATA - SMS Super Admin
// ============================================

// --- SCHOOLS ---
export const schools = [
  { id: 1,  schoolId: "SCH-001", name: "Springfield Academy",      admin: "John Carter",   adminEmail: "john@springfield.edu",   plan: "Premium",    students: 1750, teachers: 86,  status: "Active",    expiry: "2026-12-19", createdAt: "2024-01-15" },
  { id: 2,  schoolId: "SCH-002", name: "Riverside School",          admin: "John Carter",   adminEmail: "john@riverside.edu",     plan: "Premium",    students: 1250, teachers: 84,  status: "Active",    expiry: "2025-12-19", createdAt: "2024-02-10" },
  { id: 3,  schoolId: "SCH-003", name: "Maple Heights School",      admin: "John Carter",   adminEmail: "john@maple.edu",         plan: "Premium",    students: 1250, teachers: 55,  status: "Trial",     expiry: "2025-12-13", createdAt: "2024-03-05" },
  { id: 4,  schoolId: "SCH-004", name: "DW Public School",          admin: "John Carter",   adminEmail: "john@dw.edu",            plan: "Premium",    students: 1500, teachers: 32,  status: "Active",    expiry: "2025-12-12", createdAt: "2024-03-20" },
  { id: 5,  schoolId: "SCH-005", name: "Oak Ridge High School",     admin: "John Carter",   adminEmail: "john@oakridge.edu",      plan: "Premium",    students: 1250, teachers: 35,  status: "Suspended", expiry: "2024-12-11", createdAt: "2024-04-01" },
  { id: 6,  schoolId: "SCH-006", name: "Cedar Valley Academy",      admin: "John Carter",   adminEmail: "john@cedar.edu",         plan: "Premium",    students: 1700, teachers: 48,  status: "Active",    expiry: "2024-12-12", createdAt: "2024-04-15" },
  { id: 7,  schoolId: "SCH-007", name: "Pine Grove Middle School",  admin: "John Carter",   adminEmail: "john@pinegrove.edu",     plan: "Premium",    students: 1350, teachers: 55,  status: "Expired",   expiry: "2024-12-13", createdAt: "2024-05-01" },
  { id: 8,  schoolId: "SCH-008", name: "Springfield North",         admin: "John Carter",   adminEmail: "john@springfield2.edu",  plan: "Premium",    students: 1250, teachers: 55,  status: "Active",    expiry: "2024-12-14", createdAt: "2024-05-15" },
  { id: 9,  schoolId: "SCH-009", name: "Blue Sky Academy",          admin: "Sarah Miles",   adminEmail: "sarah@bluesky.edu",      plan: "Basic",      students: 980,  teachers: 40,  status: "Active",    expiry: "2025-06-30", createdAt: "2024-06-01" },
  { id: 10, schoolId: "SCH-010", name: "Oakwood International",     admin: "Robert Lee",    adminEmail: "robert@oakwood.edu",     plan: "Enterprise", students: 3200, teachers: 120, status: "Active",    expiry: "2027-01-01", createdAt: "2024-06-10" },
  { id: 11, schoolId: "SCH-011", name: "Greenfield High School",    admin: "Linda Chen",    adminEmail: "linda@greenfield.edu",   plan: "Premium",    students: 1400, teachers: 62,  status: "Active",    expiry: "2026-08-01", createdAt: "2024-07-01" },
  { id: 12, schoolId: "SCH-012", name: "Sunridge Academy",          admin: "Mark Johnson",  adminEmail: "mark@sunridge.edu",      plan: "Basic",      students: 600,  teachers: 28,  status: "Active",    expiry: "2026-05-15", createdAt: "2024-07-10" },
  { id: 13, schoolId: "SCH-013", name: "Westbrook Elementary",      admin: "Priya Nair",    adminEmail: "priya@westbrook.edu",    plan: "Basic",      students: 450,  teachers: 20,  status: "Trial",     expiry: "2026-09-01", createdAt: "2024-07-20" },
  { id: 14, schoolId: "SCH-014", name: "Lakeside Prep School",      admin: "Tom Rivera",    adminEmail: "tom@lakeside.edu",       plan: "Enterprise", students: 2800, teachers: 110, status: "Active",    expiry: "2027-03-01", createdAt: "2024-08-01" },
  { id: 15, schoolId: "SCH-015", name: "Hillcrest Academy",         admin: "Amy Wong",      adminEmail: "amy@hillcrest.edu",      plan: "Premium",    students: 1600, teachers: 72,  status: "Active",    expiry: "2026-11-01", createdAt: "2024-08-15" },
  { id: 16, schoolId: "SCH-016", name: "Valley View School",        admin: "James Park",    adminEmail: "james@valleyview.edu",   plan: "Premium",    students: 1100, teachers: 50,  status: "Suspended", expiry: "2025-01-01", createdAt: "2024-09-01" },
  { id: 17, schoolId: "SCH-017", name: "North Star Elementary",     admin: "Clara Davis",   adminEmail: "clara@northstar.edu",    plan: "Basic",      students: 390,  teachers: 18,  status: "Active",    expiry: "2026-07-01", createdAt: "2024-09-10" },
  { id: 18, schoolId: "SCH-018", name: "Evergreen School",          admin: "Sam Patel",     adminEmail: "sam@evergreen.edu",      plan: "Premium",    students: 1800, teachers: 80,  status: "Active",    expiry: "2026-10-01", createdAt: "2024-09-20" },
  { id: 19, schoolId: "SCH-019", name: "Horizon Academy",           admin: "Nina Scott",    adminEmail: "nina@horizon.edu",       plan: "Enterprise", students: 4000, teachers: 150, status: "Active",    expiry: "2028-01-01", createdAt: "2024-10-01" },
  { id: 20, schoolId: "SCH-020", name: "Maplewood Middle School",   admin: "Eric Brown",    adminEmail: "eric@maplewood.edu",     plan: "Basic",      students: 720,  teachers: 33,  status: "Expired",   expiry: "2025-03-01", createdAt: "2024-10-15" },
  { id: 21, schoolId: "SCH-021", name: "Clearwater High",           admin: "Fiona Lee",     adminEmail: "fiona@clearwater.edu",   plan: "Premium",    students: 1550, teachers: 68,  status: "Active",    expiry: "2026-12-01", createdAt: "2024-11-01" },
  { id: 22, schoolId: "SCH-022", name: "Pinecrest School",          admin: "George Kim",    adminEmail: "george@pinecrest.edu",   plan: "Basic",      students: 500,  teachers: 24,  status: "Active",    expiry: "2026-06-01", createdAt: "2024-11-10" },
  { id: 23, schoolId: "SCH-023", name: "Summit International",      admin: "Hannah Moore",  adminEmail: "hannah@summit.edu",      plan: "Enterprise", students: 3500, teachers: 130, status: "Active",    expiry: "2027-06-01", createdAt: "2024-11-20" },
  { id: 24, schoolId: "SCH-024", name: "Redwood Academy",           admin: "Ivan Gray",     adminEmail: "ivan@redwood.edu",       plan: "Premium",    students: 1300, teachers: 58,  status: "Trial",     expiry: "2026-02-01", createdAt: "2024-12-01" },
  { id: 25, schoolId: "SCH-025", name: "Brookside Elementary",      admin: "Julia White",   adminEmail: "julia@brookside.edu",    plan: "Basic",      students: 410,  teachers: 19,  status: "Active",    expiry: "2026-09-15", createdAt: "2024-12-10" },
];

// --- USERS ---
export const users = [
  { id: 1, name: "John Carter", email: "john.carter@example.com", plan: "School Admin", school: "Springfield Academy", status: "Active", lastLogin: "2026-05-30", role: "school_admin", avatar: "JC" },
  { id: 2, name: "Sarah Miller", email: "sarah.miller@example.com", plan: "School Admin", school: "Riverside School", status: "Active", lastLogin: "2026-05-30", role: "school_admin", avatar: "SM" },
  { id: 3, name: "Admin User", email: "admin.user@example.com", plan: "Super Admin", school: "", status: "Active", lastLogin: "2026-05-30", role: "super_admin", avatar: "AU" },
  { id: 4, name: "James Brown", email: "james.brown@example.com", plan: "School Admin", school: "Blue Sky Academy", status: "Suspended", lastLogin: "2026-05-30", role: "school_admin", avatar: "JB" },
  { id: 5, name: "Emma Wilson", email: "emma.wilson@example.com", plan: "School Admin", school: "Oakwood International", status: "Active", lastLogin: "2026-05-30", role: "school_admin", avatar: "EW" },
  { id: 6, name: "Michael Scott", email: "michael.scott@example.com", plan: "School Admin", school: "DW Public School", status: "Active", lastLogin: "2026-04-12", role: "school_admin", avatar: "MS" },
  { id: 7, name: "Priya Sharma", email: "priya.sharma@example.com", plan: "School Admin", school: "Cedar Valley Academy", status: "Active", lastLogin: "2026-05-01", role: "school_admin", avatar: "PS" },
  { id: 8, name: "Tom Hardy", email: "tom.hardy@example.com", plan: "School Admin", school: "Maple Heights School", status: "Inactive", lastLogin: "2026-02-20", role: "school_admin", avatar: "TH" },
];

// --- REGISTRATION PROPOSALS ---
export const registrationProposals = [
  { id: 1, schoolName: "Sunflower Academy", contactName: "Alice Johnson", email: "alice@sunflower.edu", phone: "+1-555-0101", city: "Austin", state: "Texas", students: 850, plan: "Premium", submittedAt: "2026-05-28", status: "Pending" },
  { id: 2, schoolName: "Green Valley School", contactName: "Bob Martinez", email: "bob@greenvalley.edu", phone: "+1-555-0102", city: "Denver", state: "Colorado", students: 1200, plan: "Basic", submittedAt: "2026-05-27", status: "Pending" },
  { id: 3, schoolName: "North Star Academy", contactName: "Clara White", email: "clara@northstar.edu", phone: "+1-555-0103", city: "Seattle", state: "Washington", students: 2000, plan: "Enterprise", submittedAt: "2026-05-26", status: "Approved" },
  { id: 4, schoolName: "Heritage School", contactName: "David Kim", email: "david@heritage.edu", phone: "+1-555-0104", city: "Atlanta", state: "Georgia", students: 650, plan: "Basic", submittedAt: "2026-05-25", status: "Rejected" },
  { id: 5, schoolName: "Future Leaders Academy", contactName: "Eva Chen", email: "eva@futureleaders.edu", phone: "+1-555-0105", city: "Miami", state: "Florida", students: 1500, plan: "Premium", submittedAt: "2026-05-24", status: "Pending" },
  { id: 6, schoolName: "Valley Bridge School", contactName: "Frank Turner", email: "frank@valleybridge.edu", phone: "+1-555-0106", city: "Chicago", state: "Illinois", students: 900, plan: "Premium", submittedAt: "2026-05-23", status: "Approved" },
];

// --- PLANS ---
export const plans = [
  { id: 1, name: "Basic", price: 99, billing: "Monthly", maxStudents: 500, maxTeachers: 30, schools: 12, features: ["Attendance", "Grades", "Basic Reports"], status: "Active" },
  { id: 2, name: "Premium", price: 199, billing: "Monthly", maxStudents: 2000, maxTeachers: 100, schools: 45, features: ["All Basic", "Advanced Reports", "Parent Portal", "Notifications", "API Access"], status: "Active" },
  { id: 3, name: "Enterprise", price: 499, billing: "Monthly", maxStudents: 999999, maxTeachers: 999999, schools: 8, features: ["All Premium", "Custom Branding", "Dedicated Support", "SLA 99.9%", "Custom Integrations"], status: "Active" },
  { id: 4, name: "Starter", price: 49, billing: "Monthly", maxStudents: 200, maxTeachers: 15, schools: 5, features: ["Attendance", "Grades"], status: "Inactive" },
];

// --- SUBSCRIPTIONS ---
export const subscriptions = [
  { id: 1, school: "Springfield Academy", plan: "Premium", amount: 199, status: "Active", startDate: "2025-01-01", endDate: "2026-12-31", billingCycle: "Monthly", nextBilling: "2026-06-01" },
  { id: 2, school: "Riverside School", plan: "Premium", amount: 199, status: "Active", startDate: "2025-02-01", endDate: "2025-12-31", billingCycle: "Monthly", nextBilling: "2026-06-01" },
  { id: 3, school: "Maple Heights School", plan: "Premium", amount: 199, status: "Trial", startDate: "2026-05-01", endDate: "2026-06-01", billingCycle: "Trial", nextBilling: "2026-06-01" },
  { id: 4, school: "Blue Sky Academy", plan: "Basic", amount: 99, status: "Active", startDate: "2025-06-01", endDate: "2026-06-30", billingCycle: "Monthly", nextBilling: "2026-07-01" },
  { id: 5, school: "Oakwood International", plan: "Enterprise", amount: 499, status: "Active", startDate: "2024-01-01", endDate: "2027-01-01", billingCycle: "Annual", nextBilling: "2027-01-01" },
  { id: 6, school: "Oak Ridge High School", plan: "Premium", amount: 199, status: "Suspended", startDate: "2024-01-01", endDate: "2024-12-31", billingCycle: "Monthly", nextBilling: "-" },
  { id: 7, school: "Pine Grove Middle School", plan: "Premium", amount: 199, status: "Expired", startDate: "2024-01-01", endDate: "2024-12-13", billingCycle: "Monthly", nextBilling: "-" },
];

// --- PAYMENTS ---
export const payments = [
  { id: 1, txnId: "TXN-20260501-001", school: "Springfield Academy", plan: "Premium", amount: 199, method: "Credit Card", status: "Paid", date: "2026-05-01", invoice: "INV-001" },
  { id: 2, txnId: "TXN-20260501-002", school: "Riverside School", plan: "Premium", amount: 199, method: "Bank Transfer", status: "Paid", date: "2026-05-01", invoice: "INV-002" },
  { id: 3, txnId: "TXN-20260501-003", school: "Blue Sky Academy", plan: "Basic", amount: 99, method: "Credit Card", status: "Paid", date: "2026-05-01", invoice: "INV-003" },
  { id: 4, txnId: "TXN-20260502-004", school: "Oakwood International", plan: "Enterprise", amount: 499, method: "Bank Transfer", status: "Paid", date: "2026-05-02", invoice: "INV-004" },
  { id: 5, txnId: "TXN-20260503-005", school: "Cedar Valley Academy", plan: "Premium", amount: 199, method: "Credit Card", status: "Overdue", date: "2026-05-03", invoice: "INV-005" },
  { id: 6, txnId: "TXN-20260504-006", school: "DW Public School", plan: "Premium", amount: 199, method: "Credit Card", status: "Paid", date: "2026-05-04", invoice: "INV-006" },
  { id: 7, txnId: "TXN-20260505-007", school: "Maple Heights School", plan: "Premium", amount: 199, method: "Bank Transfer", status: "Pending", date: "2026-05-05", invoice: "INV-007" },
  { id: 8, txnId: "TXN-20260506-008", school: "Pine Grove Middle School", plan: "Premium", amount: 199, method: "Credit Card", status: "Overdue", date: "2026-05-06", invoice: "INV-008" },
];

// --- MODULES ---
export const modules = [
  { id: 1, name: "Attendance Management", description: "Track daily student attendance", category: "Academic", assignedTo: 8, status: "Active", version: "2.1.0" },
  { id: 2, name: "Grade Book", description: "Record and manage student grades", category: "Academic", assignedTo: 8, status: "Active", version: "3.0.1" },
  { id: 3, name: "Parent Portal", description: "Parent communication and updates", category: "Communication", assignedTo: 6, status: "Active", version: "1.5.2" },
  { id: 4, name: "Fee Management", description: "Manage school fees and payments", category: "Finance", assignedTo: 5, status: "Active", version: "2.0.0" },
  { id: 5, name: "Timetable Generator", description: "Automated timetable scheduling", category: "Admin", assignedTo: 7, status: "Active", version: "1.2.1" },
  { id: 6, name: "Library Management", description: "Book catalog and lending system", category: "Admin", assignedTo: 4, status: "Inactive", version: "1.0.3" },
  { id: 7, name: "Transport Management", description: "Bus routes and student tracking", category: "Admin", assignedTo: 3, status: "Active", version: "1.1.0" },
  { id: 8, name: "Exam Scheduler", description: "Plan and manage examinations", category: "Academic", assignedTo: 8, status: "Active", version: "2.2.0" },
  { id: 9, name: "HR & Payroll", description: "Staff management and payroll processing", category: "Finance", assignedTo: 2, status: "Beta", version: "0.9.5" },
  { id: 10, name: "Analytics Dashboard", description: "Advanced reporting and insights", category: "Analytics", assignedTo: 5, status: "Active", version: "3.1.0" },
];

// --- NOTIFICATIONS ---
export const notifications = [
  { id: 1, title: "New School Registration", message: "Sunflower Academy submitted a registration request", type: "info", recipient: "All Admins", sentAt: "2026-05-28 10:30", status: "Sent" },
  { id: 2, title: "Payment Overdue", message: "Cedar Valley Academy payment is 7 days overdue", type: "warning", recipient: "Super Admin", sentAt: "2026-05-27 09:00", status: "Sent" },
  { id: 3, title: "Subscription Expiring", message: "Riverside School subscription expires in 30 days", type: "warning", recipient: "School Admin", sentAt: "2026-05-26 08:00", status: "Sent" },
  { id: 4, title: "System Maintenance", message: "Scheduled maintenance on June 10 from 2-4 AM UTC", type: "info", recipient: "All Users", sentAt: "2026-05-25 12:00", status: "Sent" },
  { id: 5, title: "New Module Released", message: "HR & Payroll module is now in beta", type: "success", recipient: "All Admins", sentAt: "2026-05-24 15:00", status: "Sent" },
  { id: 6, title: "Account Suspended", message: "Oak Ridge High School account has been suspended", type: "error", recipient: "Super Admin", sentAt: "2026-05-23 11:00", status: "Sent" },
  { id: 7, title: "Welcome Email", message: "Welcome to MUN-C Super Admin platform", type: "success", recipient: "New Users", sentAt: "2026-05-20 09:00", status: "Draft" },
];

// --- SUPPORT TICKETS ---
export const supportTickets = [
  { id: 1, ticketId: "TCT-891", school: "Springfield Academy", subject: "Unable to generate exam reports", priority: "Medium", status: "Active", date: "2026-03-06", assignedTo: "Tech Team" },
  { id: 2, ticketId: "TCT-890", school: "Riverside School", subject: "Missing student attendance data", priority: "High", status: "Active", date: "2026-03-06", assignedTo: "Data Team" },
  { id: 3, ticketId: "TCT-889", school: "Blue Sky Academy", subject: "Insufficient information for course enrollment", priority: "Medium", status: "Active", date: "2026-03-06", assignedTo: "Tech Team" },
  { id: 4, ticketId: "TCT-004", school: "Oakwood International", subject: "Unable to sync exam reports", priority: "Low", status: "Suspended", date: "2026-03-06", assignedTo: "Tech Team" },
  { id: 5, ticketId: "TCT-895", school: "Blue Sky Academy", subject: "Error syncing grades with the database", priority: "High", status: "Active", date: "2026-03-06", assignedTo: "Data Team" },
  { id: 6, ticketId: "TCT-896", school: "Cedar Valley Academy", subject: "Parent portal not loading on mobile", priority: "Medium", status: "Active", date: "2026-05-01", assignedTo: "Tech Team" },
  { id: 7, ticketId: "TCT-897", school: "DW Public School", subject: "Timetable conflicts detected", priority: "Low", status: "Resolved", date: "2026-04-22", assignedTo: "Support" },
];

// --- AUDIT LOGS ---
export const auditLogs = [
  { id: 1, action: "School Created", performer: "Super Admin", target: "Sunflower Academy", ip: "192.168.1.1", timestamp: "2026-05-28 10:35:22", module: "Schools" },
  { id: 2, action: "User Suspended", performer: "Super Admin", target: "James Brown", ip: "192.168.1.1", timestamp: "2026-05-27 14:20:10", module: "Users" },
  { id: 3, action: "Plan Updated", performer: "Super Admin", target: "Premium Plan", ip: "192.168.1.1", timestamp: "2026-05-26 09:15:00", module: "Plans" },
  { id: 4, action: "Payment Recorded", performer: "System", target: "Springfield Academy - TXN-001", ip: "10.0.0.1", timestamp: "2026-05-25 00:01:00", module: "Payments" },
  { id: 5, action: "Module Deactivated", performer: "Super Admin", target: "Library Management", ip: "192.168.1.1", timestamp: "2026-05-24 16:45:30", module: "Modules" },
  { id: 6, action: "Subscription Renewed", performer: "System", target: "Blue Sky Academy", ip: "10.0.0.1", timestamp: "2026-05-23 00:01:00", module: "Subscriptions" },
  { id: 7, action: "Registration Approved", performer: "Super Admin", target: "North Star Academy", ip: "192.168.1.1", timestamp: "2026-05-22 11:30:00", module: "Registrations" },
  { id: 8, action: "Notification Sent", performer: "System", target: "All Admins", ip: "10.0.0.1", timestamp: "2026-05-21 08:00:00", module: "Notifications" },
  { id: 9, action: "Login", performer: "Admin User", target: "Super Admin Dashboard", ip: "192.168.2.10", timestamp: "2026-05-20 09:00:00", module: "Auth" },
  { id: 10, action: "Settings Updated", performer: "Super Admin", target: "System Settings", ip: "192.168.1.1", timestamp: "2026-05-19 14:00:00", module: "Settings" },
];

// --- DASHBOARD STATS ---
export const dashboardStats = {
  totalSchools: 248,
  activeSchools: 231,
  totalStudents: 145820,
  totalTeachers: 8640,
  totalRevenue: 48920,
trialSchools:248,
activeSubscriptions: 226,
expiringPlans:18,
  activeModules: 9,
  monthlyGrowth: "12%",
  revenueGrowth: "+8.4%",
  schoolGrowth: "5",
  studentGrowth: "2340",
  teacherGrowth: "180",
  trialSchoolsGrowth:"14%",
  activeSubscriptionsGrowth:"91%",
  activeSchoolsGrowth:"77%",
};

// --- DASHBOARD RECENT ACTIVITY ---
export const recentActivity = [
  { id: 1, action: "New school registered", detail: "Sunflower Academy submitted proposal", time: "2 hours ago", type: "school" },
  { id: 2, action: "Payment received", detail: "Springfield Academy - $199", time: "4 hours ago", type: "payment" },
  { id: 3, action: "Ticket opened", detail: "Riverside School - Attendance issue", time: "5 hours ago", type: "ticket" },
  { id: 4, action: "User suspended", detail: "James Brown account suspended", time: "1 day ago", type: "user" },
  { id: 5, action: "Subscription renewed", detail: "Oakwood International renewed Enterprise plan", time: "1 day ago", type: "subscription" },
];

// --- REPORTS MONTHLY DATA ---
export const monthlyRevenueData = [
  { month: "Jan", revenue: 38200, schools: 220 },
  { month: "Feb", revenue: 40100, schools: 225 },
  { month: "Mar", revenue: 41500, schools: 230 },
  { month: "Apr", revenue: 43000, schools: 235 },
  { month: "May", revenue: 45600, schools: 240 },
  { month: "Jun", revenue: 48920, schools: 248 },
];
