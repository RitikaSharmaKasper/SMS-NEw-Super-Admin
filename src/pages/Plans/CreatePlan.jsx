import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px] outline-none bg-[#FFFFFF] text-[#1C1C1C] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#374151] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[18px] font-[700] font-bold text-[#000000] mb-1 font-sans";
const sectionSubClass = "text-[13px] text-[#6B7280] font-[400] mb-4";

export default function CreatePlan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    planName: '',
    planType: '',
    availability: '',
    description: '',
    displayOrder: '',
    status: 'Active',
    currency: 'INR',
    monthlyPrice: '',
    quarterlyPrice: '',
    yearlyPrice: '',
    yearlyDiscount: '',
    billingMonthly: true,
    billingQuarterly: false,
    billingYearly: true,
    taxApplicable: true,
    taxName: 'GST',
    taxPercentage: '',
    priceIncludesTax: false,
    trialDuration: '',
    trialStudentLimit: '',
    trialStaffLimit: '',
    trialStorage: '',
    trialCurrency: 'INR',
    trialPrice: '',
    trialTaxApplicable: true,
    trialTaxName: 'GST',
    trialTaxPercentage: '',
    trialPriceIncludesTax: false,
    studentLimit: '',
    userLimit: '',
    storage: '',
    classLimit: '',
    sectionLimit: '',
    academicYearLimit: '',
    studentMobileApp: false,
    teacherMobileApp: false,
    driverMobileApp: false,
  });

  const [features, setFeatures] = useState(['', '']);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const updateFeature = (i, value) => {
    setFeatures((prev) => prev.map((f, idx) => (idx === i ? value : f)));
  };
  const removeFeature = (i) => {
    setFeatures((prev) => prev.filter((_, idx) => idx !== i));
  };
  const addFeature = () => setFeatures((prev) => [...prev, '']);

  const handleCreatePlan = () => {
    console.log('Create plan payload:', { ...form, features });
  
    navigate('/plans');
  };
 
//   const[features,setFeatures]=useState(['','']);
//   const update=(key,value)=>setForm((f)=>({...f,[key]:value}));
//   const updateFeature=(i,value)=>{
//     setFeatures((prev)=>prev.map((f,idx)=>(idx===i? value:f)));

//   };
//   const removeFeature=(i)=>{
//     setFeatures((prev)=>prev.filter((_,idx)=>idx!==i));

//   };
//   const addFeature=()=>setFeatures((prev)=>[...prev,'']);
//   const handleCreatePlan=()=>{console.log('Create plan payload:',{...form , features});
//   navigate('/plans');





// }

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto gap-4 p-6 pb-24">
  
      <button
        type="button"
        onClick={() => navigate('/plans')}
        className="flex items-center gap-1.5 text-[14px] font-[400] text-[#6B7280] bg-transparent border-none cursor-pointer w-fit transition-colors"
      >
        <BackIcon /> Back
      </button>

    
   
    
      <div className="w-full rounded-[16px] border border-[#00000014] bg-[#FFFFFF]">
           <div className="flex-shrink-0 -mt-1 pt-5 pl-5 pb-1 pr-5">
        <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Create Plan</h1>
        <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-Public-Sans">
          Define pricing, limits and feature access for a new plan.
        </p>
      </div>

        <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col gap-6">

        
          <section>
            <h3 className={sectionTitleClass}>Plan Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y- mt-4">
              <div>
                <label className={labelClass}>Plan Name</label>
                <input
                  type="text"
                  placeholder="e.g. beginner, enterprise"
                  className={inputClass}
                  value={form.planName}
                  onChange={(e) => update('planName', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Plan Type</label>
                <select
                  className={inputClass}
                  value={form.planType}
                  onChange={(e) => update('planType', e.target.value)}
                >
                  <option value="" className="">Select Type (Paid/Trial)</option>
                  <option value="Paid">Paid</option>
                  <option value="Trial">Trial</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Availability</label>
                <select
                  className={inputClass}
                  value={form.availability}
                  onChange={(e) => update('availability', e.target.value)}
                >
                  <option value="">(Public/Custom)</option>
                  <option value="Public">Public</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className={labelClass}>Description</label>
              <textarea
                rows={3}
                placeholder="e.g. beginner, enterprise"
                className={`${inputClass} resize-none`}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
              />
              <p className="text-[14px] text-[#9CA3AF] -mt-[2px]">This will be shown on plan cards.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mt-4">
              <div>
                <label className={labelClass}>Display Order</label>
                <input
                  type="text"
                  placeholder="order no"
                  className={inputClass}
                  value={form.displayOrder}
                  onChange={(e) => update('displayOrder', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select
                  className={inputClass}
                  value={form.status}
                  onChange={(e) => update('status', e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="border-[#E5E7EB]" />

     
          <section>
            <h3 className={sectionTitleClass}>Pricing & Billing</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4 mt-5">
              <div>
                <label className={labelClass}>Currency</label>
                <select className={inputClass} value={form.currency} onChange={(e) => update('currency', e.target.value)}>
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Monthly Price</label>
                <input type="text" placeholder="₹ 0" className={inputClass} value={form.monthlyPrice} onChange={(e) => update('monthlyPrice', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Quarterly Price</label>
                <input type="text" placeholder="₹ 0" className={inputClass} value={form.quarterlyPrice} onChange={(e) => update('quarterlyPrice', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Yearly Price</label>
                <input type="text" placeholder="₹ 0" className={inputClass} value={form.yearlyPrice} onChange={(e) => update('yearlyPrice', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Yearly Discount</label>
                <input type="text" placeholder="₹ 0" className={inputClass} value={form.yearlyDiscount} onChange={(e) => update('yearlyDiscount', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Billing Options</label>
                <div className="flex items-center gap-4 h-[42px]">
           {[
  ['billingMonthly', 'Monthly'],
  ['billingQuarterly', 'Quarterly'],
  ['billingYearly', 'Yearly'],
].map(([key, label]) => (
  <label key={key} className="flex items-center gap-1.5 text-[13px] text-[#374151] cursor-pointer select-none">
    <input
      type="checkbox"
      checked={form[key]}
      onChange={(e) => update(key, e.target.checked)}
      className="billing-checkbox cursor-pointer"
    />
    {label}
  </label>
))}
                </div>
              </div>
            </div>

            <ToggleRow
              title="Tax applicable"
              subtitle="Apply tax on invoices generated for this plan."
              checked={form.taxApplicable}
              onChange={(v) => update('taxApplicable', v)}
            />

            {form.taxApplicable && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 mt-4">
                <div>
                  <label className={labelClass}>Tax name</label>
                  <input type="text" className={inputClass} value={form.taxName} onChange={(e) => update('taxName', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Tax percentage</label>
                  <input type="text" placeholder="%" className={inputClass} value={form.taxPercentage} onChange={(e) => update('taxPercentage', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>&nbsp;</label>
                  <ToggleRow inline title="Price includes tax" checked={form.priceIncludesTax} onChange={(v) => update('priceIncludesTax', v)} />
                </div>
              </div>
            )}
          </section>

          <hr className="border-[#E5E7EB]" />

          {/* ── Trial & Subscription Rules ── */}
          <section>
            <h3 className={sectionTitleClass}>Trial & Subscription Rules</h3>
            <p className={sectionSubClass}>Only shown when Plan Type is Trial</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
              <div>
                <label className={labelClass}>Trial duration</label>
                <div className="relative">
                  <input type="text" placeholder="14" className={inputClass} value={form.trialDuration} onChange={(e) => update('trialDuration', e.target.value)} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#9CA3AF] pointer-events-none">Days</span>
                </div>
              </div>
              <div>
                <label className={labelClass}>Trial student limit</label>
                <input type="text" placeholder="50" className={inputClass} value={form.trialStudentLimit} onChange={(e) => update('trialStudentLimit', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Trial staff limit</label>
                <input type="text" placeholder="10" className={inputClass} value={form.trialStaffLimit} onChange={(e) => update('trialStaffLimit', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Trial storage</label>
                <select className={inputClass} value={form.trialStorage} onChange={(e) => update('trialStorage', e.target.value)}>
                  <option value="">Select Storage</option>
                  <option value="1GB">1 GB</option>
                  <option value="5GB">5 GB</option>
                  <option value="10GB">10 GB</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <select className={inputClass} value={form.trialCurrency} onChange={(e) => update('trialCurrency', e.target.value)}>
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Price</label>
                <input type="text" placeholder="₹ 0" className={inputClass} value={form.trialPrice} onChange={(e) => update('trialPrice', e.target.value)} />
              </div>
            </div>

            <ToggleRow
              title="Tax applicable"
              subtitle="Apply tax on invoices generated for this plan."
              checked={form.trialTaxApplicable}
              onChange={(v) => update('trialTaxApplicable', v)}
            />

            {form.trialTaxApplicable && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 mt-4">
                <div>
                  <label className={labelClass}>Tax name</label>
                  <input type="text" className={inputClass} value={form.trialTaxName} onChange={(e) => update('trialTaxName', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Tax percentage</label>
                  <input type="text" placeholder="%" className={inputClass} value={form.trialTaxPercentage} onChange={(e) => update('trialTaxPercentage', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>&nbsp;</label>
                  <ToggleRow inline title="Price includes tax" checked={form.trialPriceIncludesTax} onChange={(v) => update('trialPriceIncludesTax', v)} />
                </div>
              </div>
            )}
          </section>

          <hr className="border-[#E5E7EB]" />

          {/* ── Usage Limits ── */}
          <section>
            <h3 className={sectionTitleClass}>Usage Limits</h3>
            <p className={sectionSubClass}>Not shown when Plan Type is Trial</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
              {[
                ['studentLimit', 'Student limit'],
                ['userLimit', 'User limit'],
                ['classLimit', 'Class limit'],
                ['sectionLimit', 'Section limit'],
                ['academicYearLimit', 'Academic year limit'],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input type="text" placeholder="e.g. 1000" className={inputClass} value={form[key]} onChange={(e) => update(key, e.target.value)} />
                </div>
              ))}
              <div>
                <label className={labelClass}>Storage</label>
                <select className={inputClass} value={form.storage} onChange={(e) => update('storage', e.target.value)}>
                  <option value="">Select Storage</option>
                  <option value="10GB">10 GB</option>
                  <option value="50GB">50 GB</option>
                  <option value="100GB">100 GB</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="border-[#E5E7EB]" />

          {/* ── Platform Features ── */}
          <section>
            <h3 className={sectionTitleClass}>Platform Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 mt-3">
              <ToggleRow title="Student mobile app" checked={form.studentMobileApp} onChange={(v) => update('studentMobileApp', v)} />
              <ToggleRow title="Teacher mobile app" checked={form.teacherMobileApp} onChange={(v) => update('teacherMobileApp', v)} />
              <ToggleRow title="Driver mobile app" checked={form.driverMobileApp} onChange={(v) => update('driverMobileApp', v)} />
            </div>
          </section>

          <hr className="border-[#E5E7EB]" />

          {/* ── Features ── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className={sectionTitleClass + ' mb-0'}>Features</h3>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1 text-[13px] font-[600] text-[#0DA2E7] bg-transparent border-none cursor-pointer"
              >
                <PlusIcon /> Add Feature
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <input
                    type="text"
                    placeholder="Feature name"
                    className={inputClass}
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-[8px] bg-[#FDECEC] text-[#EF4343] border-none cursor-pointer hover:bg-[#fbdada] transition-colors"
                    title="Remove feature"
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 text-[13px] font-[600] text-[#0DA2E7] bg-transparent border-none cursor-pointer underline w-fit"
            >
              Manage Module Permissions
            </button>
          </section>
        </div>
      </div>

      {/* ── Sticky Create Plan action ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={handleCreatePlan}
          className="px-5 py-2.5 text-[14px] font-[600] rounded-[8px] bg-[#2563EB] text-white border-none cursor-pointer shadow-md hover:bg-[#1d4ed8] transition-colors"
        >
          Create Plan
        </button>
      </div>
    </div>
  );
}

/* ── Toggle switch (checked = blue pill, matches your app's toggle style) ── */
function ToggleRow({ title, subtitle, checked, onChange, inline }) {
  return (
    <div className={inline ? 'flex items-center justify-between h-[42px]' : 'flex items-center justify-between mt-4'}>
      <div>
        <p className="text-[14px] font-[500] text-[#1C1C1C]">{title}</p>
        {subtitle && <p className="text-[12px] text-[#9CA3AF] mt-0.5">{subtitle}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 border-none cursor-pointer ${
          checked ? 'bg-[#0DA2E7]' : 'bg-[#D1D5DB]'
        }`}
        style={{ width: '40px', height: '22px' }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white transition-transform"
          style={{ transform: checked ? 'translateX(18px)' : 'translateX(0)' }}
        />
      </button>
    </div>
  );
}

/* ── Icons ── */
function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
      <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5">
      <path d="M8 3v10M3 8h10" strokeLinecap="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
    </svg>
  );
}