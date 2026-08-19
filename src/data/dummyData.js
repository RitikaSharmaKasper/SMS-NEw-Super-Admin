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
  { id: 1, name: "John Carter", email: "john.carter@example.com", role: "School Admin", school: "Springfield Academy", status: "Active", lastLogin: "2026-05-30", avatar: "JC" },
  { id: 2, name: "Sarah Miller", email: "sarah.miller@example.com", role: "School Admin", school: "Riverside School", status: "Active", lastLogin: "2026-05-30", avatar: "SM" },
  { id: 3, name: "Admin User", email: "admin.user@example.com", role: "Super Admin", school: "Platform HQ", status: "Active", lastLogin: "2026-05-30", avatar: "AU" },
  { id: 4, name: "James Brown", email: "james.brown@example.com", role: "School Admin", school: "Blue Sky Academy", status: "Suspended", lastLogin: "2026-05-30", avatar: "JB" },
  { id: 5, name: "Emma Wilson", email: "emma.wilson@example.com", role: "School Admin", school: "Oakwood International", status: "Active", lastLogin: "2026-05-30", avatar: "EW" },
  { id: 6, name: "Michael Scott", email: "michael.scott@example.com", role: "School Admin", school: "DW Public School", status: "Active", lastLogin: "2026-04-12", avatar: "MS" },
  { id: 7, name: "Priya Sharma", email: "priya.sharma@example.com", role: "School Admin", school: "Cedar Valley Academy", status: "Active", lastLogin: "2026-05-01", avatar: "PS" },
  { id: 8, name: "Tom Hardy", email: "tom.hardy@example.com", role: "School Admin", school: "Maple Heights School", status: "Inactive", lastLogin: "2026-02-20", avatar: "TH" },
  { id: 9, name: "Linda Chen", email: "linda.chen@example.com", role: "School Admin", school: "Greenfield High School", status: "Active", lastLogin: "2026-05-28", avatar: "LC" },
  { id: 10, name: "Robert Lee", email: "robert.lee@example.com", role: "School Admin", school: "Oakwood International", status: "Active", lastLogin: "2026-05-29", avatar: "RL" },
  { id: 11, name: "Sarah Miles", email: "sarah.miles@example.com", role: "School Admin", school: "Blue Sky Academy", status: "Active", lastLogin: "2026-05-25", avatar: "SM" },
  { id: 12, name: "Mark Johnson", email: "mark.johnson@example.com", role: "School Admin", school: "Sunridge Academy", status: "Active", lastLogin: "2026-05-18", avatar: "MJ" },
];

// --- REGISTRATION PROPOSALS ---
export const registrationProposals = [
  { id: 1, reqId: "REQ-001", schoolName: "Springfield Academy", adminName: "John Carter", adminEmail: "john@springfield.edu", plan: "Premium", date: "2026-03-06", status: "Pending", expiry: "2025-12-15" },
  { id: 2, reqId: "REQ-002", schoolName: "Riverside School", adminName: "John Carter", adminEmail: "john@springfield.edu", plan: "Premium", date: "2026-03-06", status: "Pending", expiry: "2025-12-15" },
  { id: 3, reqId: "REQ-003", schoolName: "Maple Heights School", adminName: "John Carter", adminEmail: "john@springfield.edu", plan: "Premium", date: "2026-03-06", status: "Approved", expiry: "2025-12-15" },
  { id: 4, reqId: "REQ-004", schoolName: "DW Public School", adminName: "John Carter", adminEmail: "john@springfield.edu", plan: "Premium", date: "2026-03-06", status: "Rejected", expiry: "2025-12-15" },
  { id: 5, reqId: "REQ-005", schoolName: "Oak Ridge High School", adminName: "John Carter", adminEmail: "john@springfield.edu", plan: "Premium", date: "2026-03-06", status: "Pending", expiry: "2025-12-15" },
  { id: 6, reqId: "REQ-006", schoolName: "Sunflower Academy", adminName: "Alice Johnson", adminEmail: "alice@sunflower.edu", plan: "Basic", date: "2026-04-10", status: "Pending", expiry: "2026-04-10" },
  { id: 7, reqId: "REQ-007", schoolName: "Green Valley School", adminName: "Bob Martinez", adminEmail: "bob@greenvalley.edu", plan: "Enterprise", date: "2026-04-12", status: "Approved", expiry: "2026-04-12" },
  { id: 8, reqId: "REQ-008", schoolName: "North Star Academy", adminName: "Clara White", adminEmail: "clara@northstar.edu", plan: "Premium", date: "2026-04-15", status: "Approved", expiry: "2026-04-15" },
  { id: 9, reqId: "REQ-009", schoolName: "Future Leaders", adminName: "Eva Chen", adminEmail: "eva@futureleaders.edu", plan: "Basic", date: "2026-04-18", status: "Rejected", expiry: "2026-04-18" },
  { id: 10, reqId: "REQ-010", schoolName: "Valley Bridge School", adminName: "Frank Turner", adminEmail: "frank@valleybridge.edu", plan: "Premium", date: "2026-04-20", status: "Pending", expiry: "2026-04-20" },
  { id: 11, reqId: "REQ-011", schoolName: "Lakeside Prep", adminName: "Tom Rivera", adminEmail: "tom@lakeside.edu", plan: "Enterprise", date: "2026-04-22", status: "Approved", expiry: "2026-04-22" },
  { id: 12, reqId: "REQ-012", schoolName: "Hillcrest Academy", adminName: "Amy Wong", adminEmail: "amy@hillcrest.edu", plan: "Premium", date: "2026-04-25", status: "Pending", expiry: "2026-04-25" },
];

export const demoRequests=
[
  { 
    id: 1, 
    reqId: "REQ-001", 
    leadName: "Ravi Sharma", 
    schoolName: "Springfield Academy", 
    adminName: "Ravi Sharma",
    adminEmail: "ravi@springfield.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Premium", 
    date: "2026-12-15", 
    status: "New", 
    expiry: "2026-12-15" 
  },
  { 
    id: 2, 
    reqId: "REQ-002", 
    leadName: "Sophie Lee", 
    schoolName: "Riverside School", 
    adminName: "Sophie Lee",
    adminEmail: "sophie@riverside.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Premium", 
    date: "2026-12-15", 
    status: "New", 
    expiry: "2026-12-15" 
  },
  { 
    id: 3, 
    reqId: "REQ-003", 
    leadName: "Jacob Torres", 
    schoolName: "Maple Heights School", 
    adminName: "Jacob Torres",
    adminEmail: "jacob@mapleheights.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Premium", 
    date: "2026-12-15", 
    status: "New", 
    expiry: "2026-12-15" 
  },
  { 
    id: 4, 
    reqId: "REQ-004", 
    leadName: "Liam Johnson", 
    schoolName: "DW Public School", 
    adminName: "Liam Johnson",
    adminEmail: "liam@dwpublic.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Premium", 
    date: "2026-12-15", 
    status: "Converted", 
    expiry: "2026-12-15" 
  },
  { 
    id: 5, 
    reqId: "REQ-005", 
    leadName: "Ethan Patel", 
    schoolName: "Oak Ridge High School", 
    adminName: "Ethan Patel",
    adminEmail: "ethan@oakridge.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Premium", 
    date: "2026-12-15", 
    status: "Follow Up", 
    expiry: "2026-12-15" 
  },
  { 
    id: 6, 
    reqId: "REQ-006", 
    leadName: "Olivia Brown", 
    schoolName: "Sunflower Academy", 
    adminName: "Olivia Brown",
    adminEmail: "olivia@sunflower.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Basic", 
    date: "2026-12-15", 
    status: "Converted", 
    expiry: "2026-12-15" 
  },
  { 
    id: 7, 
    reqId: "REQ-007", 
    leadName: "Noa Wilson", 
    schoolName: "Green Valley School", 
    adminName: "Noa Wilson",
    adminEmail: "noa@greenvalley.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Enterprise", 
    date: "2026-12-15", 
    status: "Converted", 
    expiry: "2026-12-15" 
  },
  { 
    id: 8, 
    reqId: "REQ-008", 
    leadName: "Emma Davis", 
    schoolName: "North Star Academy", 
    adminName: "Emma Davis",
    adminEmail: "emma@northstar.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Premium", 
    date: "2026-12-15", 
    status: "Not Interested", 
    expiry: "2026-12-15" 
  },
  { 
    id: 9, 
    reqId: "REQ-009", 
    leadName: "Isabelle Martinez", 
    schoolName: "Future Leaders Academy", 
    adminName: "Isabelle Martinez",
    adminEmail: "isabelle@futureleaders.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Basic", 
    date: "2026-12-15", 
    status: "Not Interested", 
    expiry: "2026-12-15" 
  },
  { 
    id: 10, 
    reqId: "REQ-010", 
    leadName: "Amina Khan", 
    schoolName: "Valley Bridge School", 
    adminName: "Amina Khan",
    adminEmail: "amina@valleybridge.edu", 
    contact: "9898765698",
    message: "Recovering from minor surgery",
    plan: "Premium", 
    date: "2026-12-15", 
    status: "Converted", 
    expiry: "2026-12-15" 
  },
]

// --- PLANS ---
export const plans = [
  { id: 1, name: "Basic", price: 99, billing: "Monthly", maxStudents: 500, maxTeachers: 30, schools: 12, features: ["Attendance", "Grades", "Basic Reports"], status: "Active" },
  { id: 2, name: "Premium", price: 199, billing: "Monthly", maxStudents: 2000, maxTeachers: 100, schools: 45, features: ["All Basic", "Advanced Reports", "Parent Portal", "Notifications", "API Access"], status: "Active" },
  { id: 3, name: "Enterprise", price: 499, billing: "Monthly", maxStudents: 999999, maxTeachers: 999999, schools: 8, features: ["All Premium", "Custom Branding", "Dedicated Support", "SLA 99.9%", "Custom Integrations"], status: "Active" },
  { id: 4, name: "Starter", price: 49, billing: "Monthly", maxStudents: 200, maxTeachers: 15, schools: 5, features: ["Attendance", "Grades"], status: "Inactive" },
];

// --- SUBSCRIPTIONS ---
export const subscriptions = [
  { id: 1, school: "Springfield Academy", plan: "Premium", amount: 199, status: "Active", startDate: "2025-01-01", endDate: "2026-12-31", student:"1250",teacher:"50" },
  { id: 2, school: "Riverside School", plan: "Premium", amount: 199, status: "Active", startDate: "2025-02-01", endDate: "2025-12-31", student:"1250", teacher:"50" },
  { id: 3, school: "Maple Heights School", plan: "Premium", amount: 199, status: "Trial", startDate: "2026-05-01", endDate: "2026-06-01",student:"1250", teacher:"50" },
  { id: 4, school: "Blue Sky Academy", plan: "Basic", amount: 99, status: "Active", startDate: "2025-06-01", endDate: "2026-06-30", student:"1250",teacher:"50"},
  { id: 5, school: "Oakwood International", plan: "Enterprise", amount: 499, status: "Active", startDate: "2024-01-01", endDate: "2027-01-01",student:"1250",teacher:"50"},
  { id: 6, school: "Oak Ridge High School", plan: "Premium", amount: 199, status: "Suspended", startDate: "2024-01-01", endDate: "2024-12-31",student:"1250", teacher:"50" },
  { id: 7, school: "Pine Grove Middle School", plan: "Premium", amount: 199, status: "Expired", startDate: "2024-01-01", endDate: "2024-12-13", student:"1250",teacher:"50"},
  { id: 8, school: "Cedar Valley Academy", plan: "Premium", amount: 199, status: "Active", startDate: "2025-03-01", endDate: "2026-03-01",student:"1250", teacher:"50"},
  { id: 9, school: "DW Public School", plan: "Premium", amount: 199, status: "Active", startDate: "2025-04-01", endDate: "2026-04-01",student:"1250", teacher:"50"},
  { id: 10, school: "Greenfield High School", plan: "Premium", amount: 199, status: "Active", startDate: "2025-05-01", endDate: "2026-05-01",student:"1250", teacher:"50" },
  { id: 11, school: "Sunridge Academy", plan: "Basic", amount: 99, status: "Active", startDate: "2025-06-01", endDate: "2026-06-01", student:"1250",teacher:"50" },
  { id: 12, school: "Westbrook Elementary", plan: "Basic", amount: 99, status: "Trial", startDate: "2026-05-15", endDate: "2026-06-15", student:"1250",teacher:"50"},
];

// --- PAYMENTS ---
export const payments = [
  { id: 1, txnId: "TXN-20260501-001", school: "Springfield Academy", plan: "Premium", amount: 199,gst:1250,total:1250,  method: "Credit Card", status: "Paid", date: "2026-05-01", invoice: "INV-001" },
  { id: 2, txnId: "TXN-20260501-002", school: "Riverside School", plan: "Premium", amount: 199, gst:1250,total:1250, method: "Bank Transfer", status: "Paid", date: "2026-05-01", invoice: "INV-002" },
  { id: 3, txnId: "TXN-20260501-003", school: "Blue Sky Academy", plan: "Basic", amount: 99,gst:1250,total:1250, method: "Credit Card", status: "Paid", date: "2026-05-01", invoice: "INV-003" },
  { id: 4, txnId: "TXN-20260502-004", school: "Oakwood International", plan: "Enterprise", amount: 499,gst:1250, total:1250,method: "Bank Transfer", status: "Paid", date: "2026-05-02", invoice: "INV-004" },
  { id: 5, txnId: "TXN-20260503-005", school: "Cedar Valley Academy", plan: "Premium", amount: 199,gst:1250, total:1250,method: "Credit Card", status: "Overdue", date: "2026-05-03", invoice: "INV-005" },
  { id: 6, txnId: "TXN-20260504-006", school: "DW Public School", plan: "Premium", amount: 199, gst:1250,total:1250,method: "Credit Card", status: "Paid", date: "2026-05-04", invoice: "INV-006" },
  { id: 7, txnId: "TXN-20260505-007", school: "Maple Heights School", plan: "Premium", amount: 199,gst:1250,total:1250, method: "Bank Transfer", status: "Pending", date: "2026-05-05", invoice: "INV-007" },
  { id: 8, txnId: "TXN-20260506-008", school: "Pine Grove Middle School", plan: "Premium", amount: 199,gst:1250,total:1250, method: "Credit Card", status: "Overdue", date: "2026-05-06", invoice: "INV-008" },
  { id: 9, txnId: "TXN-20260507-009", school: "Greenfield High School", plan: "Premium", amount: 199,gst:1250,total:1250, method: "Credit Card", status: "Paid", date: "2026-05-07", invoice: "INV-009" },
  { id: 10, txnId: "TXN-20260508-010", school: "Sunridge Academy", plan: "Basic", amount: 99,gst:1250,total:1250, method: "Bank Transfer", status: "Paid", date: "2026-05-08", invoice: "INV-010" },
  { id: 11, txnId: "TXN-20260509-011", school: "Lakeside Prep School", plan: "Enterprise", amount: 499,gst:1250,total:1250, method: "Credit Card", status: "Paid", date: "2026-05-09", invoice: "INV-011" },
  { id: 12, txnId: "TXN-20260510-012", school: "Hillcrest Academy", plan: "Premium", amount: 199,gst:1250, total:1250,method: "Credit Card", status: "Pending", date: "2026-05-10", invoice: "INV-012" },
];

// --- MODULES ---
export const modules = [
  { id: 1, name: "Students", category: "Academic", plan: "Basic", status: "Active", planScope: "Basic | Standard | Premium", enabled: true },
  { id: 2, name: "Teachers", category: "Academic", plan: "Basic", status: "Active", planScope: "Standard | Premium", enabled: true },
  { id: 3, name: "Classes", category: "Academic", plan: "Basic", status: "Active", planScope: "Basic", enabled: true },
  { id: 4, name: "Attendance", category: "Academic", plan: "Basic", status: "Active", planScope: "Basic | Standard | Premium", enabled: true },
  { id: 5, name: "Homework", category: "Academic", plan: "Basic", status: "Active", planScope: "Basic", enabled: true },
  { id: 6, name: "Exams", category: "Academic", plan: "Basic", status: "Active", planScope: "Basic | Standard | Premium", enabled: true },
  { id: 7, name: "Timetable", category: "Academic", plan: "Basic", status: "Active", planScope: "Basic | Premium", enabled: true },
  { id: 8, name: "Fees", category: "Finance", plan: "Basic", status: "Active", planScope: "Basic | Premium", enabled: true },
  { id: 9, name: "Reports", category: "Analytics", plan: "Basic", status: "Active", planScope: "Basic | Standard | Premium", enabled: true },
  { id: 10, name: "Analytics", category: "Analytics", plan: "Basic", status: "Active", planScope: "Basic", enabled: true },
  { id: 11, name: "Messaging", category: "Communication", plan: "Basic", status: "Active", planScope: "Basic | Standard | Premium", enabled: true },
  { id: 12, name: "Notifications", category: "Communication", plan: "Basic", status: "Inactive", planScope: "Premium", enabled: false },
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

// --- COUPONS & PROMO CODES ---
export const coupons = [
  { 
    id: 1, 
    code: "FREEHSP", 
    description: "Enjoy free shipping on orders over $50. Limited time offer. Applicable for online purchases only.",
    discountType: "Fixed Amount",
    discountValue: "₹100",
    discount: "₹100 off",
    redemptions: 25,
    redemptionLimit: 100,
    status: "Active",
    validFrom: "2026-01-01",
    validUntil: "2026-03-06",
    usageLimit: 100,
    usedCount: 25,
    minOrderAmount: 50,
    appliesTo: "All Plans"
  },
  { 
    id: 2, 
    code: "FREESHIP", 
    description: "Enjoy free shipping on orders over $50. Limited time offer.",
    discountType: "Fixed Amount",
    discountValue: "₹100",
    discount: "₹100 off",
    redemptions: 50,
    redemptionLimit: 100,
    status: "Active",
    validFrom: "2026-01-01",
    validUntil: "2026-03-06",
    usageLimit: 100,
    usedCount: 50,
    minOrderAmount: 50,
    appliesTo: "All Plans"
  },
  { 
    id: 3, 
    code: "SUMMER30", 
    description: "Summertime sale! Save 30% on select items. Offer valid until the end of the month.",
    discountType: "Percentage",
    discountValue: "30%",
    discount: "30% off",
    redemptions: 50,
    redemptionLimit: 100,
    status: "Expires",
    validFrom: "2026-01-01",
    validUntil: "2026-03-06",
    usageLimit: 100,
    usedCount: 50,
    minOrderAmount: 0,
    appliesTo: "Select Items"
  },
  { 
    id: 4, 
    code: "JOINOS", 
    description: "Join our newsletter and receive $5 off your first purchase. Stay updated with our latest products!",
    discountType: "Fixed Amount",
    discountValue: "₹5",
    discount: "₹5 off",
    redemptions: 0,
    redemptionLimit: 100,
    status: "Expires",
    validFrom: "2026-01-01",
    validUntil: "2026-03-06",
    usageLimit: 100,
    usedCount: 0,
    minOrderAmount: 0,
    appliesTo: "First Purchase"
  },
  { 
    id: 5, 
    code: "WELCOME20", 
    description: "Welcome after Get 20% off your first subscription purchase. Valid for one redemption per organization. Cannot be combined with other offers.",
    discountType: "Percentage",
    discountValue: "20%",
    discount: "20% off",
    redemptions: 0,
    redemptionLimit: 100,
    status: "Inactive",
    validFrom: "2026-01-01",
    validUntil: "2026-03-06",
    usageLimit: 100,
    usedCount: 0,
    minOrderAmount: 0,
    appliesTo: "First Subscription"
  },
  { 
    id: 6, 
    code: "SAVE10", 
    description: "Save 10% on any annual subscription. Valid for new customers only.",
    discountType: "Percentage",
    discountValue: "10%",
    discount: "10% off",
    redemptions: 35,
    redemptionLimit: 50,
    status: "Active",
    validFrom: "2026-02-01",
    validUntil: "2026-06-30",
    usageLimit: 50,
    usedCount: 35,
    minOrderAmount: 100,
    appliesTo: "Annual Plans"
  },
  { 
    id: 7, 
    code: "FLASH50", 
    description: "Flash sale! Get 50% off on all plans. Limited time only!",
    discountType: "Percentage",
    discountValue: "50%",
    discount: "50% off",
    redemptions: 0,
    redemptionLimit: 20,
    status: "Active",
    validFrom: "2026-03-01",
    validUntil: "2026-03-15",
    usageLimit: 20,
    usedCount: 0,
    minOrderAmount: 0,
    appliesTo: "All Plans"
  },
  { 
    id: 8, 
    code: "TEACHER10", 
    description: "Special discount for teachers! Get 10% off on all Premium plans.",
    discountType: "Percentage",
    discountValue: "10%",
    discount: "10% off",
    redemptions: 12,
    redemptionLimit: 30,
    status: "Active",
    validFrom: "2026-01-15",
    validUntil: "2026-12-31",
    usageLimit: 30,
    usedCount: 12,
    minOrderAmount: 0,
    appliesTo: "Premium Plans"
  },
  { 
    id: 9, 
    code: "REFER2026", 
    description: "Refer a school and get $50 credit for each successful referral.",
    discountType: "Fixed Amount",
    discountValue: "₹50",
    discount: "₹50 off",
    redemptions: 8,
    redemptionLimit: 999,
    status: "Active",
    validFrom: "2026-01-01",
    validUntil: "2026-12-31",
    usageLimit: 999,
    usedCount: 8,
    minOrderAmount: 0,
    appliesTo: "Referral"
  },
  { 
    id: 10, 
    code: "BULK20", 
    description: "Bulk purchase discount! Get 20% off when subscribing 5+ schools.",
    discountType: "Percentage",
    discountValue: "20%",
    discount: "20% off",
    redemptions: 2,
    redemptionLimit: 10,
    status: "Inactive",
    validFrom: "2025-06-01",
    validUntil: "2025-12-31",
    usageLimit: 10,
    usedCount: 2,
    minOrderAmount: 500,
    appliesTo: "Bulk Purchases"
  },
  { 
    id: 11, 
    code: "EARLYBIRD", 
    description: "Early bird special! 15% off for first 50 subscribers in 2026.",
    discountType: "Percentage",
    discountValue: "15%",
    discount: "15% off",
    redemptions: 15,
    redemptionLimit: 50,
    status: "Active",
    validFrom: "2026-01-01",
    validUntil: "2026-03-31",
    usageLimit: 50,
    usedCount: 15,
    minOrderAmount: 0,
    appliesTo: "All Plans"
  },
  { 
    id: 12, 
    code: "EDU25", 
    description: "Educational institutions get 25% off on all Enterprise plans.",
    discountType: "Percentage",
    discountValue: "25%",
    discount: "25% off",
    redemptions: 9,
    redemptionLimit: 25,
    status: "Active",
    validFrom: "2026-01-01",
    validUntil: "2026-12-31",
    usageLimit: 25,
    usedCount: 9,
    minOrderAmount: 0,
    appliesTo: "Enterprise Plans"
  }
];

// --- ORDERS (Matching the screenshot layout) ---
export const orders = [
  { 
    id: 1, 
    paymentId: "order_1N2c0p2d3f4g5h6j7k8l9UTY", 
    school: "Springfield Academy", 
    plan: "Basic", 
    taxableAmt: 1250, 
    gst: 1250, 
    total: 1250, 
    receipt: "RCP_1786348505096", 
    date: "2026-03-06", 
    status: "Pending", 
    actions: "Details" 
  },
  { 
    id: 2, 
    paymentId: "order_2N2c0p2d3f4g5h6j7k8l9UTY", 
    school: "Evergreen High School", 
    plan: "Premium", 
    taxableAmt: 1250, 
    gst: 1250, 
    total: 1250, 
    receipt: "RCP_1786348505096", 
    date: "2026-03-06", 
    status: "Expired", 
    actions: "Details" 
  },
  { 
    id: 3, 
    paymentId: "order_3N2c0p2d3f4g5h6j7k8l9UTY", 
    school: "Mountainview College", 
    plan: "Standard", 
    taxableAmt: 1250, 
    gst: 1250, 
    total: 1250, 
    receipt: "RCP_1786348505096", 
    date: "2026-03-06", 
    status: "Pending", 
    actions: "Details" 
  },
  { 
    id: 4, 
    paymentId: "order_4N2c0p2d3f4g5h6j7k8l9UTY", 
    school: "Lakeside Institute", 
    plan: "Premium", 
    taxableAmt: 1250, 
    gst: 1250, 
    total: 1250, 
    receipt: "RCP_1786348505096", 
    date: "2026-03-06", 
    status: "Paid", 
    actions: "Details" 
  },
  { 
    id: 5, 
    paymentId: "order_5N2c0p2d3f4g5h6j7k8l9UTY", 
    school: "Sunset Valley University", 
    plan: "Basic", 
    taxableAmt: 1250, 
    gst: 1250, 
    total: 1250, 
    receipt: "RCP_1786348505096", 
    date: "2026-03-06", 
    status: "Paid", 
    actions: "Details" 
  },
  { 
    id: 6, 
    paymentId: "order_6N2c0p2d3f4g5h6j7k8l9UTY", 
    school: "Springfield Academy", 
    plan: "Standard", 
    taxableAmt: 1250, 
    gst: 1250, 
    total: 1250, 
    receipt: "RCP_1786348505096", 
    date: "2026-03-06", 
    status: "Pending", 
    actions: "Details" 
  },
  { 
    id: 7, 
    paymentId: "order_7N2c0p2d3f4g5h6j7k8l9UTY", 
    school: "Riverside Technical School", 
    plan: "Premium", 
    taxableAmt: 1250, 
    gst: 1250, 
    total: 1250, 
    receipt: "RCP_1786348505096", 
    date: "2026-03-06", 
    status: "Pending", 
    actions: "Details" 
  },
  { 
    id: 8, 
    paymentId: "order_8N2c0p2d3f4g5h6j7k8l9UTY", 
    school: "DAV Public School", 
    plan: "Standard", 
    taxableAmt: 1250, 
    gst: 1250, 
    total: 1250, 
    receipt: "RCP_1786348505096", 
    date: "2026-03-06", 
    status: "Failed", 
    actions: "Details" 
  },
];



// --- TRIALS (Matching the screenshot layout) ---
export const trials = [
  { 
    id: 1, 
    school: "Riverside High School", 
    email: "riversidehigh@edu.com",
    plan: "Free Trial", 
    startDate: "2026-03-06", 
    endDate: "2026-03-11",
    daysLeft: 5, 
    status: "Expired", 
    actions: "..." 
  },
  { 
    id: 2, 
    school: "Greenwood College", 
    email: "greenwoodcollege@edu.com",
    plan: "Free Trial", 
    startDate: "2026-03-06", 
    endDate: "2026-03-11",
    daysLeft: 5, 
    status: "Expired", 
    actions: "..." 
  },
  { 
    id: 3, 
    school: "Maple Leaf Institute", 
    email: "mapleleafinstitute@edu.com",
    plan: "Free Trial", 
    startDate: "2026-03-06", 
    endDate: "2026-04-20",
    daysLeft: 45, 
    status: "Active", 
    actions: "..." 
  },
  { 
    id: 4, 
    school: "Pine Valley School", 
    email: "pinevalleyschool@edu.com",
    plan: "Free Trial", 
    startDate: "2026-03-06", 
    endDate: "2026-04-20",
    daysLeft: 45, 
    status: "Active", 
    actions: "..." 
  },
  { 
    id: 5, 
    school: "Lakeside University", 
    email: "lakesideuniversity@edu.com",
    plan: "Free Trial", 
    startDate: "2026-03-06", 
    endDate: "2026-04-20",
    daysLeft: 45, 
    status: "Active", 
    actions: "..." 
  },
  { 
    id: 6, 
    school: "Coder Hill Academy", 
    email: "coderhillacademy@edu.com",
    plan: "Free Trial", 
    startDate: "2026-03-06", 
    endDate: "2026-04-20",
    daysLeft: 45, 
    status: "Active", 
    actions: "..." 
  },
  { 
    id: 7, 
    school: "Springfield Academy", 
    email: "springfieldacademy@edu.com",
    plan: "Free Trial", 
    startDate: "2026-03-06", 
    endDate: "2026-04-20",
    daysLeft: 45, 
    status: "Active", 
    actions: "..." 
  },
  { 
    id: 8, 
    school: "Oak Crest High", 
    email: "oakcresthigh@edu.com",
    plan: "Free Trial", 
    startDate: "2026-03-06", 
    endDate: "2026-04-14",
    daysLeft: -4, 
    status: "Expired", 
    actions: "..." 
  },
];