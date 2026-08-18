// import { useState, useEffect } from 'react';
// import server from "../../assets/images/server.svg";
// import email from "../../assets/images/emailsettings.svg";
// import send from "../../assets/images/send.svg";
// import {Upload ,Trash2} from "lucide-react";

// import brandlogo from "../../assets/images/brandlogo.svg";
// const SETTINGS_KEY = 'superadmin_platform_settings';

// const defaultSettings = {
//   maintenance: {
//     enabled: false,
//     message: "We're performing scheduled maintenance. Please check back soon.",
//   },
//   loginSecurity: {
//     maxAttempts: 5,
//     lockoutDuration: 30,
//   },
//   passwordPolicy: {
//     minLength: 8,
//     requireUppercase: true,
//     requireNumber: true,
//     requireSpecialChar: true,
//     expiryDays: 90,
//     preventReuseCount: 3,
//   },
//   registration: {
//     allowPublicRegistration: true,
//     requireEmailVerification: true,
//     autoApprove: false,
//     defaultRole: 'School Admin',
//   },
//   subscriptions: {
//     trialDays: 14,
//     gracePeriodDays: 7,
//     allowDowngrade: true,
//   },
//   platformEmail: {
//     smtpHost: 'smtp.mun-c.com',
//     smtpPort: 587,
//     smtpUsername: 'noreply@mun-c.com',
//     fromName: 'MUN-C',
//     fromEmail: 'noreply@mun-c.com',
//   },
//   auditLogs: {
//     enabled: true,
//     retentionDays: 180,
//   },
//   platformInfo: {
//     platformName: 'MUN-C',
//     supportEmail: 'support@mun-c.com',
//         supportphone: '', // Add this line

//     timezone: 'Asia/Kolkata',
//     dateFormat: 'DD/MM/YYYY',
//   },
 
//       notifications: {
//     emailOnNewRegistration: false, // Changed from true to false
//     emailOnFailedLogin: false,     // Changed from true to false
//     smsAlerts: false,
//   }
// };


// const TABS = [
//   { id: 'maintenance', label: 'Maintenance' },
//   { id: 'loginSecurity', label: 'Login Security' },
//   { id: 'passwordPolicy', label: 'Password Policy' },
//   { id: 'registration', label: 'Registration' },
//   { id: 'subscriptions', label: 'Subscriptions' },
//   { id: 'platformEmail', label: 'Platform Email' },
//   { id: 'auditLogs', label: 'Audit Logs' },
//   { id: 'platformInfo', label: 'Platform Info' },
//   { id: 'notifications', label: 'Notifications' },
// ];

// function loadSettings() {
//   try {
//     const saved = localStorage.getItem(SETTINGS_KEY);
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       const merged = {};
//       Object.keys(defaultSettings).forEach((key) => {
//         merged[key] = { ...defaultSettings[key], ...(parsed[key] || {}) };
//       });
//       return merged;
//     }
//   } catch { /* ignore */ }
//   return JSON.parse(JSON.stringify(defaultSettings));
// }

// function saveSettings(data) {
//   localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
// }

// export default function Maintenance() {
//   const [activeTab, setActiveTab] = useState('maintenance');
//   const [savedSettings, setSavedSettings] = useState(loadSettings);
//   const [settings, setSettings] = useState(loadSettings);
//   const [saved, setSaved] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const s = loadSettings();
//     setSavedSettings(s);
//     setSettings(s);
//   }, []);

//   useEffect(() => {
//     setSaved(false);
//     setError('');
//   }, [activeTab]);

//   const updateField = (section, field, value) => {
//     setSettings((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [field]: value },
//     }));
//   };

//   const handleReset = () => {
//     setSettings((prev) => ({
//       ...prev,
//       [activeTab]: savedSettings[activeTab],
//     }));
//     setError('');
//     setSaved(false);
//   };

//   const handleSave = () => {
//     setError('');

//     if (activeTab === 'passwordPolicy' && settings.passwordPolicy.minLength < 6) {
//       setError('Minimum password length must be at least 6');
//       return;
//     }
//     if (activeTab === 'platformEmail' && !settings.platformEmail.fromEmail) {
//       setError('From email is required');
//       return;
//     }
//     if (activeTab === 'platformInfo' && !settings.platformInfo.platformName.trim()) {
//       setError('Platform name is required');
//       return;
//     }

//     const updated = { ...savedSettings, [activeTab]: settings[activeTab] };
//     saveSettings(updated);
//     setSavedSettings(updated);
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2500);
//   };
// const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//   return (
//     <div className="flex flex-col h-full gap-4 min-h-0 p-5">
    

//       {/* Settings card */}
//       <div className="w-full rounded-[10px] border border-[#00000014] bg-[#FFFFFF] overflow-hidden">
//         <div className="px-4 py-4 sm:px-5 sm:py-5">

//           {/* ── Tabs ── */}
//           <div className="flex items-center gap-6 border-b border-[#E5E7EB] mb-6 overflow-x-auto">
//             {TABS.map((tab) => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`pb-3 text-[14px] font-[500] whitespace-nowrap border-b-2 -mb-px transition-colors cursor-pointer ${
//                   activeTab === tab.id
//                     ? 'text-[#2563EB] border-[#2563EB]'
//                     : 'text-[#6B7280] border-transparent hover:text-[#1C1C1C]'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* ── Tab content ── */}
//           <div className="mb-5">
//             {activeTab === 'maintenance' && (
//               <MaintenanceTab data={settings.maintenance} update={(f, v) => updateField('maintenance', f, v)} />
//             )}
//             {activeTab === 'loginSecurity' && (
//               <LoginSecurityTab data={settings.loginSecurity} update={(f, v) => updateField('loginSecurity', f, v)} />
//             )}
//             {activeTab === 'passwordPolicy' && (
//               <PasswordPolicyTab data={settings.passwordPolicy} update={(f, v) => updateField('passwordPolicy', f, v)} />
//             )}
//             {activeTab === 'registration' && (
//               <RegistrationTab data={settings.registration} update={(f, v) => updateField('registration', f, v)} />
//             )}
//             {activeTab === 'subscriptions' && (
//               <SubscriptionsTab data={settings.subscriptions} update={(f, v) => updateField('subscriptions', f, v)} />
//             )}
//             {activeTab === 'platformEmail' && (
//               <PlatformEmailTab data={settings.platformEmail} update={(f, v) => updateField('platformEmail', f, v)} />
//             )}
//             {activeTab === 'auditLogs' && (
//               <AuditLogsTab data={settings.auditLogs} update={(f, v) => updateField('auditLogs', f, v)} />
//             )}
//             {activeTab === 'platformInfo' && (
//               <PlatformInfoTab data={settings.platformInfo} update={(f, v) => updateField('platformInfo', f, v)} />
//             )}
//             {activeTab === 'notifications' && (
//               <NotificationsTab data={settings.notifications} update={(f, v) => updateField('notifications', f, v)} />
//             )}
//           </div>

//           {/* Error / Success messages */}
//           {error && (
//             <div className="mb-4 px-3.5 py-2.5 rounded-[8px] bg-red-50 border border-red-200 text-red-600 text-[14px] font-[500]">
//               {error}
//             </div>
//           )}
//           {saved && (
//             <div className="mb-4 px-3.5 py-2.5 rounded-[8px] bg-green-50 border border-green-200 text-green-600 text-[14px] font-[500]">
//               Settings saved successfully!
//             </div>
//           )}

//           {/* ── Action Buttons ── */}
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={handleReset}
//               className="px-3 py-1.5 text-[14px] font-[500] w-[71px] h-[44px] text-[#6B7280] bg-white border border-[#E5E7EB] rounded-[10px] cursor-pointer transition-colors hover:bg-gray-50"
//             >
//               Reset
//             </button>
//             <button
//               type="button"
//               onClick={handleSave}
//               className="inline-flex font-body-m-12-a items-center gap-1.5 px-4 py-2 font-medium text-[14px] font-[500] h-[44px] text-white bg-[#2563EB] border-none rounded-[10px] cursor-pointer transition-colors"
//             >
//               Save Detail <CheckIcon />
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// /* ────────────────────────── Shared field components ────────────────────────── */

// function SectionHeader({ title, description }) {
//   return (
//     <div className="mb-2">
//       <h3 className="text-[16px] font-[600] font-semibold text-[#0F1729]">{title}</h3>
//       <p className="text-[14px] font-[400]  text-[#9C9C9C] -mt-[2px] font-sans">{description}</p>
//     </div>
//   );
// }

// function SettingRow({ title, description, children }) {
//   return (
//     <div className="flex items-start justify-between gap-6 py-3 border-b border-[#00000014] last:border-b-0">
//       <div className="max-w-[1200px]">
//         <p className="text-[14px] font-[600] font-semibold text-[#374151] font-Inter">{title}</p>
//         {description && <p className="text-[12px] font-normal font-[400] text-[#9CA3AF] -mt-[1px] mb-[3px] font-Inter">{description}</p>}
//       </div>
//       <div className="flex-shrink-0">{children}</div>
//     </div>
//   );
// }

// function ToggleSwitch({ checked, onChange }) {
//   return (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={checked}
//       onClick={() => onChange(!checked)}
//       className={`relative inline-flex h-4.5 w-10 flex-shrink-0 items-center rounded-full transition-colors cursor-pointer ${
//         checked ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'
//       }`}
//     >
//       <span
//         className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
//           checked ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );
// }

// function NumberField({ value, onChange, suffix, min = 0, max }) {
//   return (
//     <div className="flex items-center gap-2">
//       <input
//         type="number"
//         value={value}
//         min={min}
//         max={max}
//         onChange={(e) => onChange(Number(e.target.value))}
//         className=" px-3 py-2 text-[14px] w-[139px] h-[45px] border border-[#E6E6E6] rounded-[12px] outline-none bg-[#FFFFFF] text-[#1C1C1C] text-left"
//       />
//       {suffix && <span className="text-[14px] text-[##1C1C1C] whitespace-nowrap">{suffix}</span>}
//     </div>
//   );
// }


// function TextField({ value, onChange, placeholder, width = 'w-[260px]', type = 'text' }) {
//   return (
//     <input
//       type={type}
//       value={value}
//       placeholder={placeholder}
//       onChange={(e) => onChange(e.target.value)}
//       className={`${width} px-3.5 py-4 text-[14px] border border-[#E6E6E6] rounded-[8px] outline-none bg-[#FAFBFF] text-[#696969] placeholder-[#696969]`}
//     />
//   );
// }

// function SelectField({ value, onChange, options, width = 'w-[220px]' }) {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className={`${width} px-3.5 py-2.5 text-[14px] border border-[#E5E7EB] rounded-[8px] outline-none bg-white text-[#1C1C1C] cursor-pointer`}
//     >
//       {options.map((opt) => (
//         <option key={opt} value={opt}>{opt}</option>
//       ))}
//     </select>
//   );
// }

// function TextareaField({ value, onChange, maxLength = 500 }) {
//   return (
//     <div className="w-[330px]">
//       <textarea
//         value={value}
//         maxLength={maxLength}
//         onChange={(e) => onChange(e.target.value)}
//         rows={4}
//         className="w-full px-2 py-1 text-[14px] border border-[#E5E7EB] rounded-[4px] outline-none bg-[#FAFBFF] text-[#696969] placeholder-[#696969] resize-none"
//       />
//       <p className="text-[12px] text-[#9CA3AF] text-right mt-0">{value.length}/{maxLength}</p>
//     </div>
//   );
// }

// /* ────────────────────────── Tabs ────────────────────────── */

// function MaintenanceTab({ data, update }) {
//   return (
//     <div>
//       <SectionHeader title="Maintenance Mode" description="Take the platform offline for non-super admin users" />
//       <SettingRow
//         title="Enable Maintenance Mode"
//         description="When enabled, all users except super admin are blocked from logging in and using the platform."
//       >
//         <ToggleSwitch checked={data.enabled} onChange={(v) => update('enabled', v)} />
//       </SettingRow>
//       <SettingRow
//         title="Maintenance Message"
//         description="Message shown to users who try to access the platform while maintenance is active."
//       >
//         <TextareaField value={data.message} onChange={(v) => update('message', v)} maxLength={500} />
//       </SettingRow>
//     </div>
//   );
// }

// function LoginSecurityTab({ data, update }) {
//   return (
//     <div>
//       <SectionHeader title="Login Security" description="Protect accounts from repeated failed login attempts" />
//       <SettingRow
//         title="Max Login Attempts"
//         description="Number of consecutive wrong passwords before the account is temporarily locked."
//       >
//         <NumberField value={data.maxAttempts} onChange={(v) => update('maxAttempts', v)} suffix="attempts" min={1} max={20} />
//       </SettingRow>
//       <SettingRow
//         title="Lockout Duration"
//         description="How long (in minutes) the account stays locked after hitting the attempt limit."
//       >
//         <NumberField value={data.lockoutDuration} onChange={(v) => update('lockoutDuration', v)} suffix="minutes" min={1} />
//       </SettingRow>
//     </div>
//   );
// }

// function PasswordPolicyTab({ data, update }) {
//   return (
//     <div>
//       <SectionHeader title="Password Policy" description="Take the platform offline for non-super admin users" />
//       <SettingRow title="Minimum Password Length" description="Minimum number of characters required for all user passwords.">
//         <NumberField value={data.minLength} onChange={(v) => update('minLength', v)} suffix="characters" min={6} max={32} />
//       </SettingRow>
//       <SettingRow title="Require Strong Password" description="Enforce at least one uppercase letter, one number, and one special character in every password.">
//         <ToggleSwitch checked={data.requireUppercase} onChange={(v) => update('requireUppercase', v)} />
//       </SettingRow>
//       {/* <SettingRow title="Require Number" description="Passwords must contain at least one numeral.">
//         <ToggleSwitch checked={data.requireNumber} onChange={(v) => update('requireNumber', v)} />
//       </SettingRow>
//       <SettingRow title="Require Special Character" description="Passwords must contain at least one symbol (e.g. !, @, #).">
//         <ToggleSwitch checked={data.requireSpecialChar} onChange={(v) => update('requireSpecialChar', v)} />
//       </SettingRow>
//       <SettingRow title="Password Expiry" description="How often (in days) users are required to change their password.">
//         <NumberField value={data.expiryDays} onChange={(v) => update('expiryDays', v)} suffix="days" min={0} />
//       </SettingRow>
//       <SettingRow title="Prevent Password Reuse" description="Number of previous passwords a user cannot reuse.">
//         <NumberField value={data.preventReuseCount} onChange={(v) => update('preventReuseCount', v)} suffix="passwords" min={0} max={10} />
//       </SettingRow> */}
//     </div>
//   );
// }

// function RegistrationTab({ data, update }) {
//   return (
//     <div>
//       <SectionHeader title="Registration & Onboarding" description="Control how new organizations join the platform" />
//       <SettingRow title="Allow Public Registration" description="Let new organizations self-register via the public sign-up page. Disabling this closes the door to new sign-ups.">
//         <ToggleSwitch checked={data.allowPublicRegistration} onChange={(v) => update('allowPublicRegistration', v)} />
//       </SettingRow>
//       <SettingRow title="Auto-verify New Organizations" description="Skip manual verification — new orgs go live immediately after registering without waiting for super admin approval.">
//         <ToggleSwitch checked={data.requireEmailVerification} onChange={(v) => update('requireEmailVerification', v)} />
//       </SettingRow>
//       <SettingRow title="Default Single Browser Login" description="New organizations will have single-session enforcement enabled by default (can be changed per org).">
//         <ToggleSwitch checked={data.autoApprove} onChange={(v) => update('autoApprove', v)} />
//       </SettingRow>
//       <SettingRow title="Default Trial Days" description="Number of trial days given to new organizations that register on a trial plan. Changing this applies to FUTURE signups automatically — use “Apply to existing trials” to recalculate active trials too..">
//         {/* <SelectField
//           value={data.defaultRole}
//           onChange={(v) => update('defaultRole', v)}
//           options={['School Admin', 'Staff', 'Viewer']}
//         /> */}
//          <NumberField value={data.minLength} onChange={(v) => update('minLength', v)} suffix="days" min={6} max={32} />
//       </SettingRow>
//       <SettingRow title="Partner / Reseller Program" description="Enable the partner program. When OFF, all partner pages and routes are removed (partner login, registration & portal) and partner APIs are blocked. Existing partners can't sign in until it's re-enabled.">
        
//         <ToggleSwitch checked={data.requireEmailVerification} onChange={(v) => update('requireEmailVerification', v)} />
//       </SettingRow>
//     </div>
//   );
// }

// function SubscriptionsTab({ data, update }) {
//   return (
//     <div>
//       <SectionHeader title="Subscriptions & Billing" description="Grace periods, auto-suspension, and expiry warnings" />
//       <SettingRow title="Grace Period After Expiry" description="Days an organization can continue using the platform after their subscription expires before being auto-suspended.">
//         <NumberField value={data.trialDays} onChange={(v) => update('trialDays', v)} suffix="days" min={0} />
//       </SettingRow>
//       <SettingRow title="Auto-suspend Expired Organizations" description="Automatically suspend organizations that have exceeded the grace period. Requires the daily cron to run.">
//         <ToggleSwitch checked={data.allowDowngrade} onChange={(v) => update('allowDowngrade', v)} />
//       </SettingRow>
//       <SettingRow title="Expiry Warning Days" description="Mark subscriptions as 'near expiry' this many days before they expire. Used for alerts and banners.">
//         <NumberField value={data.gracePeriodDays} onChange={(v) => update('gracePeriodDays', v)} suffix="days" min={0} />
//       </SettingRow>
      
//     </div>
//   );
// }

// function PlatformEmailTab({ data, update }) {
// const [showSmtpPassword, setShowSmtpPassword] = useState(false);
// const [showFromPassword, setShowFromPassword] = useState(false);
//   const [testEmail, setTestEmail] = useState('');

//   return (
//     <div>
//       <SectionHeader title="Platform Email (SMTP)" description="Outbound SMTP used for system emails like registration alerts and notifications" />

//       <SettingRow
//         title="Enable Platform SMTP"
//         description="Use this SMTP to send platform-level system emails (registration alerts, plan expiry notices)."
//       >
//         <ToggleSwitch checked={data.enabled} onChange={(v) => update('enabled', v)} />
//       </SettingRow>

//       <SettingRow title="SMTP Host" description="Address of the outgoing mail server.">
//         <div className="flex items-center gap-2 w-[260px] px-3.5 border border-[#E6E6E6] rounded-[12px] bg-[#FFFFFF]">
//           <img src={server} className="w-4 h-4 flex-shrink-0 opacity-60" />
//           <input
//             type="text"
//             value={data.smtpHost}
//             onChange={(e) => update('smtpHost', e.target.value)}
//             placeholder="smtp.example.com"
//             className="flex-1 min-w-0 py-2.5 text-[16px] outline-none bg-transparent text-[#9C9C9C] placeholder-[#9C9C9C]"
//           />
//         </div>
//       </SettingRow>

//       <SettingRow title="Port" description="">
//         <NumberField value={data.smtpPort} onChange={(v) => update('smtpPort', v)} suffix="Port" min={1} max={65535} />
//       </SettingRow>

//       <SettingRow title="Use SSL/TLS" description="Enable for port 465. Leave off for port 587 (STARTTLS).">
//         <ToggleSwitch checked={data.useSSL} onChange={(v) => update('useSSL', v)} />
//       </SettingRow>

//       <SettingRow title="SMTP Username" description="">
//         <div className="flex items-center gap-2 w-[260px] px-3.5 border border-[#E6E6E6] rounded-[12px] bg-[#FFFFFF]">
//           <img src={email} className="w-4 h-4 flex-shrink-0 opacity-60" />
//           <input
//             type="text"
//             value={data.smtpUsername}
//             onChange={(e) => update('smtpUsername', e.target.value)}
//             placeholder="noreply@example.com"
//             className="flex-1 min-w-0 py-2.5 text-[16px] outline-none bg-transparent text-[#9C9C9C] placeholder-[#9C9C9C]"
//           />
//         </div>
//       </SettingRow>

//  <SettingRow title="SMTP Password" description="Password is saved. Enter a new value to replace it.">
//   <div className="flex items-center gap-2 w-[260px] px-3.5 border border-[#E6E6E6] rounded-[12px] bg-[#FFFFFF]">
//     <input
//       type={showSmtpPassword ? 'text' : 'password'}
//       value={data.smtpPassword}
//       onChange={(e) => update('smtpPassword', e.target.value)}
//       placeholder="••••••••"
//       className="flex-1 min-w-0 py-2.5 text-[16px] outline-none bg-transparent text-[#1C1C1C] placeholder-[#9C9C9C]"
//     />
//     <button
//       type="button"
//       onClick={() => setShowSmtpPassword((s) => !s)}  // Changed here
//       className="flex-shrink-0 text-[#9C9C9C] cursor-pointer"
//       tabIndex={-1}
//     >
//       {showSmtpPassword ? <EyeOffIcon /> : <EyeIcon />}
//     </button>
//   </div>
// </SettingRow>

// <SettingRow title="From Name" description="Name shown in the 'From' field of outbound emails.">
//   <div className="flex items-center gap-2 w-[260px] px-3.5 border border-[#E6E6E6] rounded-[12px] bg-[#FFFFFF]">
//     <input
//       type={showFromPassword ? 'text' : 'password'}
//       value={data.fromPassword}
//       onChange={(e) => update('fromPassword', e.target.value)}
//       placeholder="••••••••"
//       className="flex-1 min-w-0 py-2.5 text-[16px] outline-none bg-transparent text-[#1C1C1C] placeholder-[#9C9C9C]"
//     />
//     <button
//       type="button"
//       onClick={() => setShowFromPassword((s) => !s)}  // Changed here
//       className="flex-shrink-0 text-[#9C9C9C] cursor-pointer"
//       tabIndex={-1}
//     >
//       {showFromPassword ? <EyeOffIcon /> : <EyeIcon />}
//     </button>
//   </div>
// </SettingRow>

//       <SettingRow title="From Email Address" description="">
//         <div className="flex items-center gap-2 w-[260px] px-3.5 border border-[#E6E6E6] rounded-[12px] bg-[#FFFFFF]">
//           <img src={email} className="w-4 h-4 flex-shrink-0 opacity-60" />
//           <input
//             type="text"
//             value={data.fromEmail}
//             onChange={(e) => update('fromEmail', e.target.value)}
//             placeholder="noreply@example.com"
//             className="flex-1 min-w-0 py-2.5 text-[16px] outline-none bg-transparent text-[#9C9C9C] placeholder-[#9C9C9C]"
//           />
//         </div>
//       </SettingRow>

//       {/* Send test email */}
//       <div className="pt-1  mt-1 pb-1">
//         <p className="text-[14px] font-[600] text-[#1C1C1C] mb-2">Send test email to</p>
//         <div className="flex items-center gap-3">
//           <input
//             type="email"
//             value={testEmail}
//             onChange={(e) => setTestEmail(e.target.value)}
//             placeholder="you@example.com"
//             className="flex-1 px-3.5 py-2.5 text-[14px] border border-[#E5E7EB] rounded-[10px] outline-none bg-white text-[#1C1C1C] placeholder-[#9CA3AF]"
//           />
//           <button
//             type="button"
//             className="inline-flex items-center gap-4 px-3 py-2.5 text-[14px] font-[500] font-body-m-12-a text-[#374151] bg-white border border-[#374151] rounded-[10px] cursor-pointer whitespace-nowrap"
//           >
//             Send Test <SendIcon />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AuditLogsTab({ data, update }) {
//   return (
//     <div>
//       <SectionHeader title="Audit Logs" description="Control audit log recording and data retention" />
//       <SettingRow title="Enable Audit Logging" description="Record all significant user and admin actions across the platform in the audit log..">
//         <ToggleSwitch checked={data.enabled} onChange={(v) => update('enabled', v)} />
//       </SettingRow>
//       <SettingRow title="Log Retention Period" description="Audit log entries older than this many days may be cleaned up by scheduled maintenance tasks.">
//         <NumberField value={data.retentionDays} onChange={(v) => update('retentionDays', v)} suffix="days" min={1} />
//       </SettingRow>
//     </div>
//   );
// }

// function PlatformInfoTab({ data, update }) {
//   return (
//     <div>
//       <SectionHeader title="Platform Info" description="General information about this platform instance" />
// <SettingRow 
//   title="Brand Logo" 
//   description="Shown on the marketing site, login, and 404 pages. PNG, JPG, WEBP, or SVG up to 5MB. Leave empty to use the default mark."
// >
//   <div className="flex items-center gap-2">
//     {/* Logo preview */}
//     <div className="w-15 h-15 flex items-center justify-center border-1 border-[#E6E6E6] rounded-[10px] bg-[#FFFFFF] overflow-hidden">
//       <img 
//         src={brandlogo} 
//         alt="Brand logo" 
//         className="w-full h-full object-contain"
//       />
//     </div>

//     {/* Upload button */}
//     <label className="flex items-center gap-1.5 px-4 py-2.5 font-body-m-12-a border border-[#E6E6E6] rounded-[10px] bg-[#FFFFFF] text-[14px] text-[#696969] cursor-pointer hover:bg-[#F7F7F7]">
//       Upload
     
//       <Upload className="w-4 h-4" /> 
//       <input
//         type="file"
//         accept=".png,.jpg,.jpeg,.webp,.svg"
//         className="hidden"
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (!file) return;
//           if (file.size > 5 * 1024 * 1024) {
//             alert('File must be under 5MB');
//             return;
//           }
//           const url = URL.createObjectURL(file);
//           update('brandlogo', url);
//         }}
//       />
//     </label>

//     {/* Remove button */}
//     <button
//       type="button"
//       onClick={() => update('brandlogo', '')}
//       className="flex items-center gap-1.5 px-4 py-2.5 font-body-m-12-a border border-[#EF4343] rounded-[10px] bg-[#FFFFFF] text-[14px] text-[#EF4343] cursor-pointer hover:bg-[#FDF2F2]"
//     >
//       Remove

//       <Trash2 className="w-4 h-4" />
//     </button>
//   </div>
// </SettingRow>
//       <SettingRow title="Platform Name" description="Brand name shown across the app and in the subject and body of outbound system emails..">
//        <div className="flex items-center gap-2 w-[260px] px-3.5 border border-[#E6E6E6] rounded-[12px] bg-[#FFFFFF]">
//           <img src={server} className="w-4 h-4 flex-shrink-0 opacity-60" />
//           <input
//             type="text"
//             value={data.platformname}
//             onChange={(e) => update('platformname', e.target.value)}
//             placeholder="smtp.example.com"
//             className="flex-1 min-w-0 py-2.5 text-[16px] outline-none bg-transparent text-[#9C9C9C] placeholder-[#9C9C9C]"
//           />
//         </div>
//       </SettingRow>
//       <SettingRow title="Support Email" description="Super admin receives registration and expiry alerts at this address.">
//         {/* <SelectField
//           value={data.timezone}
//           onChange={(v) => update('timezone', v)}
//           options={['Asia/Kolkata', 'UTC', 'America/New_York', 'Europe/London']}
//         /> */}
//          <div className="flex items-center gap-2 w-[260px] px-3.5 border border-[#E6E6E6] rounded-[12px] bg-[#FFFFFF]">
//           <img src={server} className="w-4 h-4 flex-shrink-0 opacity-60" />
//           <input
//             type="text"
//             value={data.supportemail}
//             onChange={(e) => update('supportemail', e.target.value)}
//             placeholder="smtp.example.com"
//             className="flex-1 min-w-0 py-2.5 text-[16px] outline-none bg-transparent text-[#9C9C9C] placeholder-[#9C9C9C]"
//           />
//         </div>
//       </SettingRow>
//       <SettingRow title="Support Phone" description="Support Phone">
//         {/* <SelectField
//           value={data.dateFormat}
//           onChange={(v) => update('dateFormat', v)}
//           options={[
          
//           'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']}
//         /> */}
//         <div className="flex items-center gap-2 w-[260px] px-3.5 border border-[#E6E6E6] rounded-[12px] bg-[#FFFFFF]">
      
//           <input
//     type="text"
//     value={data.supportphone || ''}
//     onChange={(e) => {
//       // Remove any non-digit characters
//       const onlyNumbers = e.target.value.replace(/\D/g, '').slice(0,10);
//       update('supportphone', onlyNumbers);
//     }}
//     onInput={(e) => {
//       // Remove any non-digit characters on input
//       e.target.value = e.target.value.replace(/\D/g, '').slice(0,10);
//     }}
//     placeholder="9565468788"
//     className="flex-1 min-w-0 py-2.5 text-[16px] outline-none bg-transparent text-[#9C9C9C] placeholder-[#9C9C9C]"
//   />
//         </div>
//       </SettingRow>
//     </div>
//   );
// }

// function NotificationsTab({ data, update }) {
//   return (
//     <div>
//       <SectionHeader title="Notifications" description="Email alerts sent to the platform support address" />
//       <SettingRow title="New Registration Alert" description="Send an email to the support address whenever a new organization registers on the platform.">
//         <ToggleSwitch checked={data.emailOnNewRegistration} onChange={(v) => update('emailOnNewRegistration', v)} />
//       </SettingRow>
//       <SettingRow title="Plan Expiry Alert" description="Send an email to the support address when an organization's subscription is about to expire.">
//         <ToggleSwitch checked={data.emailOnFailedLogin} onChange={(v) => update('emailOnFailedLogin', v)} />
//       </SettingRow>
  
//     </div>
//   );
// }

// /* ── Inline SVG Icons ── */
// function CheckIcon() {
//   return (
//     <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.05" className="w-4 h-5">
//       <path d="M2.5 7.5l3 3L11.5 4" />
//     </svg>
//   );
// }


// function EyeIcon() {
//   return (
//     <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4">
//       <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
//       <circle cx="8" cy="8" r="2" />
//     </svg>
//   );
// }

// function EyeOffIcon() {
//   return (
//     <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4">
//       <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
//       <circle cx="8" cy="8" r="2" />
//       <path d="M2 2l12 12" />
//     </svg>
//   );
// }

// function SendIcon() {
//   return (
// <img   src={send} />
//   );
// }