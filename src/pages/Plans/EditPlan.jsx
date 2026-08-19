import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
 import { plansData } from "../../data/Plans";
const inputClass =
  "w-full px-3.5 py-3 text-[16px] border border-[#E6E6E6] rounded-[12px] outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#374151] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[18px] font-[700] font-bold text-[#000000] mb-1 font-sans";
const sectionSubClass = "text-[13px] text-[#6B7280] font-[400] mb-4";

// fields that must only accept numbers (digits + optional single decimal point)
const numericFields = [
  'monthlyPrice',
  'quarterlyPrice',
  'yearlyPrice',
  'yearlyDiscount',
  'taxPercentage',
  'displayOrder',
  'trialDuration',
  'trialStudentLimit',
  'trialStaffLimit',
  'trialPrice',
  'trialTaxPercentage',
  'studentLimit',
  'userLimit',
  'classLimit',
  'sectionLimit',
  'academicYearLimit',
];

const sanitizeNumeric = (value) => {
  // allow digits and a single decimal point only
  let cleaned = value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  return cleaned;
};

export default function EditPlan() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const update = (key, value) => {
    const finalValue = numericFields.includes(key) ? sanitizeNumeric(value) : value;

    setForm((f) => {
      const next = { ...f, [key]: finalValue };

      const m = parseFloat(next.monthlyPrice);
      const y = parseFloat(next.yearlyPrice);

      if (!isNaN(m) && m > 0 && !isNaN(y) && y > 0) {
        const fullYear = m * 12;
        if (y < fullYear) {
          const discountAmt = fullYear - y;
          const pct = Math.round((discountAmt / fullYear) * 100);
          next.yearlyDiscountDisplay = `Save ${pct}%`;
          next.hasDiscount = true;
          next.yearlyDiscount = String(discountAmt);
        } else {
          next.yearlyDiscountDisplay = 'No discount';
          next.hasDiscount = false;
          next.yearlyDiscount = '0';
        }
      } else {
        next.yearlyDiscountDisplay = 'No discount';
        next.hasDiscount = false;
        next.yearlyDiscount = '';
      }

      return next;
    });

    // clear this field's error as soon as the user edits it
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const updateFeature = (i, value) => {
    setFeatures((prev) => prev.map((f, idx) => (idx === i ? value : f)));
  };
  const removeFeature = (i) => {
    setFeatures((prev) => prev.filter((_, idx) => idx !== i));
  };
  const addFeature = () => setFeatures((prev) => [...prev, '']);

  const [errors, setErrors] = useState({});



useEffect(() => {
  try {
    const customPlans = JSON.parse(localStorage.getItem('customPlans') || '[]');
    const customMatch = customPlans.find((p) => String(p.id) === String(id));

    if (customMatch) {
      // full form data was saved previously (created via CreatePlan form)
      if (customMatch.formData) setForm(customMatch.formData);
      if (customMatch.featuresData) setFeatures(customMatch.featuresData);
      if (customMatch.unlimitedData) setUnlimited(customMatch.unlimitedData);
      return;
    }

    // fall back to the static seed data, which has a different shape
    const staticMatch = plansData.find((p) => String(p.id) === String(id));
    if (staticMatch) {
      setForm((f) => ({
        ...f,
        planName: staticMatch.name || '',
        planType: 'Paid',
        availability: 'Public',
        monthlyPrice: String(staticMatch.price ?? ''),
        yearlyPrice: String(staticMatch.yearlyPrice ?? ''),
        studentLimit: staticMatch.students === 'Unlimited' ? '' : String(staticMatch.students ?? ''),
        userLimit: staticMatch.teachers === 'Unlimited' ? '' : String(staticMatch.teachers ?? ''),
      }));
      setFeatures(staticMatch.modules?.length ? staticMatch.modules : ['', '']);
      setUnlimited((u) => ({
        ...u,
        studentLimit: staticMatch.students === 'Unlimited',
        userLimit: staticMatch.teachers === 'Unlimited',
      }));
    }
  } catch (err) {
    console.error('Failed to load plan for editing', err);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.planName.trim()) newErrors.planName = 'Plan name is required';
    if (!form.planType) newErrors.planType = 'Select a plan type';
    if (!form.availability) newErrors.availability = 'Select availability';

    if (form.planType !== 'Trial') {
      if (!form.monthlyPrice.trim()) newErrors.monthlyPrice = 'Monthly price is required';
    }

    if (form.planType === 'Trial') {
      if (!form.trialDuration.trim()) newErrors.trialDuration = 'Trial duration is required';
      if (!form.trialPrice.trim()) newErrors.trialPrice = 'Trial price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePlan = () => {
    if (!validateForm()) return;

    const payload = { ...form, features };
    console.log('Update plan payload:', payload);

    try {
      const existing = JSON.parse(localStorage.getItem('customPlans') || '[]');
      const existsInCustom = existing.some((p) => String(p.id) === String(id));

      // Preserve the original 'popular' flag so editing never strips it
      const originalCustom = existing.find((p) => String(p.id) === String(id));
      const staticMatch = plansData.find((p) => String(p.id) === String(id));
      const preservedPopular = originalCustom?.popular ?? staticMatch?.popular ?? false;

      const updatedPlan = {
        id: String(id), // normalise to string so id comparisons are always reliable
        name: form.planName,
        price: Number(form.monthlyPrice) || 0,
        yearlyPrice: Number(form.yearlyPrice) || 0,
        students: unlimited.studentLimit ? 'Unlimited' : (form.studentLimit || '0'),
        teachers: unlimited.userLimit ? 'Unlimited' : (form.userLimit || '0'),
        modules: features.filter((f) => f.trim() !== ''),
        popular: preservedPopular, // preserve — never hard-code false
        formData: form,
        featuresData: features,
        unlimitedData: unlimited,
      };

      const updatedList = existsInCustom
        // custom plan: replace in-place
        ? existing.map((p) => String(p.id) === String(id) ? { ...p, ...updatedPlan } : p)
        // static plan edited for the first time: append override so Plans page uses this instead
        : [...existing, updatedPlan];
      localStorage.setItem('customPlans', JSON.stringify(updatedList));
    } catch (err) {
      console.error('Failed to update plan in localStorage', err);
    }

    navigate('/plans');
  };
 const [unlimited, setUnlimited] = useState({
  studentLimit: false,
  userLimit: false,
  classLimit: false,
  sectionLimit: false,
  academicYearLimit: false,
});

const toggleUnlimited = (key) => {
  setUnlimited((prev) => {
    const next = { ...prev, [key]: !prev[key] };
    if (next[key]) update(key, ''); // clear the value when switching to unlimited
    return next;
  });
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
        className="flex items-center mb-2 mt-2 gap-1.5 text-[16px] font-[400] text-[#6B7280] bg-transparent border-none cursor-pointer w-fit transition-colors"
      >
        <BackIcon /> Back
      </button>

    
   
    
      <div className="w-full rounded-[16px] border border-[#00000014] bg-[#FFFFFF]">
           <div className="flex-shrink-0 -mt-1 pt-5 pl-5 pb-1 pr-5">
        <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Edit Plan</h1>
        <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">
          Update pricing, limits and feature access for this plan.
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
                {errors.planName && <p className="text-[12px] text-[#EF4444] mt-1">{errors.planName}</p>}
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
                {errors.planType && <p className="text-[12px] text-[#EF4444] mt-1">{errors.planType}</p>}
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
                {errors.availability && <p className="text-[12px] text-[#EF4444] mt-1">{errors.availability}</p>}
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



{form.planType !== 'Trial' && (
  <>

       

     
          <section>
            <h3 className={`${sectionTitleClass} mt-2 ` }>Pricing & Billing</h3>

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
                {errors.monthlyPrice && <p className="text-[12px] text-[#EF4444] mt-1">{errors.monthlyPrice}</p>}
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
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder=""
                    className={`${inputClass} cursor-default`}
                    value=""
                    readOnly
                  />
                  <div className="absolute left-3.5 flex items-center gap-1.5 pointer-events-none">
                    {form.hasDiscount ? (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" stroke="#21C45D" strokeWidth="2" className="w-4 h-4">
                          <path d="M13 11V3M13 3H5M13 3L3 13" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[15px] font-[500] text-[#21C45D]">
                          {form.yearlyDiscountDisplay}
                        </span>
                      </>
                    ) : (
                      <span className="text-[15px] font-[500] text-[#9CA3AF]">
                        No discount
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClass}>Billing Options</label>
                <div className="flex items-center gap-5 h-[48px] border border-[#E5E7EB] rounded-[12px] p-5">
           {[
  ['billingMonthly', 'Monthly'],
  ['billingQuarterly', 'Quarterly'],
  ['billingYearly', 'Yearly'],
].map(([key, label]) => (
  <label key={key} className="flex items-center gap-2 text-[14px] text-[#0F1729] cursor-pointer select-none">
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
<div className="border border-[#E5E7EB] rounded-[12px] mt-8 bg-[#FFFFFF] px-3 py-2">
  <ToggleRow
    title="Tax applicable"
    subtitle="Apply tax on invoices generated for this plan."
    checked={form.taxApplicable}
    onChange={(v) => update('taxApplicable', v)}
  />
</div>
            {form.taxApplicable && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 mt-4 border border-dashed border-[#E5E7EB] rounded-[8px] px-3 py-4 bg-[#F3F4F64D]">
                <div>
                  <label className={labelClass}>Tax name</label>
                  <input type="text" className={inputClass} value={form.taxName} onChange={(e) => update('taxName', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Tax percentage</label>
                  <input type="text" placeholder="%" className={inputClass} value={form.taxPercentage} onChange={(e) => update('taxPercentage', e.target.value)}  
                   onChange={(e) => update('taxPercentage', e.target.value)}  
  style={{ borderRadius: "6px" }}/>
                </div>
                <div>
                  <label className={labelClass}>&nbsp;</label>
                  <ToggleRow className="border border-[#E5E7EB] rounded-[6px]  bg-[#FFFFFF] p-3.5" 
                   title="Price includes tax" checked={form.priceIncludesTax} onChange={(v) => update('priceIncludesTax', v)} />
                </div>
              </div>
            )}
          </section> 
</>)}
        



{form.planType === 'Trial' && (
  <>


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
                {errors.trialDuration && <p className="text-[12px] text-[#EF4444] mt-1">{errors.trialDuration}</p>}
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
                {errors.trialPrice && <p className="text-[12px] text-[#EF4444] mt-1">{errors.trialPrice}</p>}
              </div>
            </div>
<div className="border border-[#E5E7EB] rounded-[12px] mt-8 bg-[#FFFFFF] px-3 py-2">
  <ToggleRow
         
              title="Tax applicable"
              subtitle="Apply tax on invoices generated for this plan."
              checked={form.trialTaxApplicable}
              onChange={(v) => update('trialTaxApplicable', v)}
            />
            </div>

            {form.trialTaxApplicable && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 mt-4  border border-dashed border-[#E5E7EB] rounded-[8px] px-3 py-4 bg-[#F3F4F64D]">
                <div>
                  <label className={labelClass}>Tax name</label>
                  <input type="text" className={inputClass} value={form.trialTaxName} onChange={(e) => update('trialTaxName', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Tax percentage</label>
                  <input type="text" placeholder="%" className={inputClass} value={form.trialTaxPercentage} onChange={(e) => update('trialTaxPercentage', e.target.value)}
                   style={{ borderRadius: "6px" }}/> 
                </div>
                <div>
                  <label className={labelClass}>&nbsp;</label>
                  <ToggleRow className="border border-[#E5E7EB] rounded-[6px]  bg-[#FFFFFF] p-3.5" title="Price includes tax" checked={form.trialPriceIncludesTax} onChange={(v) => update('trialPriceIncludesTax', v)} />
                </div>
              </div>
            )}
          </section>
</>)}


{form.planType !== 'Trial' && (
  <>

          {/* ── Usage Limits ── */}
         <section>
  <h3 className={`${sectionTitleClass} mt-2`}>Usage Limits</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4 mt-5">
    {[
      ['studentLimit', 'Student limit'],
      ['userLimit', 'User limit'],
      ['academicYearLimit', 'Academic year limit'],
      ['classLimit', 'Class limit'],
      ['sectionLimit', 'Section limit'],
    ].map(([key, label]) => (
      <div key={key}>
        <label className={labelClass}>{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="e.g. 1000"
            className={`${inputClass} ${unlimited[key] ? 'opacity-50 cursor-not-allowed' : ''}`}
            value={unlimited[key] ? '' : form[key]}
            disabled={unlimited[key]}
            onChange={(e) => update(key, e.target.value)}
          />
          <button
    type="button"
    onClick={() => toggleUnlimited(key)}
    title="Unlimited"
    className={`relative flex-shrink-0 w-9 h-[17.5px] rounded-full transition-colors border-none cursor-pointer ${
      unlimited[key] ? 'bg-[#0DA2E7]' : 'bg-[#D1D5DB]'
    }`}
  >
    <span
      className="absolute top-0.5 left-0.5 w-[14px] h-[14px] rounded-full bg-white transition-transform"
      style={{ transform: unlimited[key] ? 'translateX(18px)' : 'translateX(0)' }}
    />
  </button>
  <span className="text-[12px] text-[#6B7280] select-none">∞</span>
        </div>
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
</>)}





     

          {/* ── Platform Features ── */}
          <section>
            <h3 className={sectionTitleClass}>Platform Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 mt-6">
              <ToggleRow className="border border-[#E5E7EB] rounded-[8px]  bg-[#FFFFFF] p-3.5" title="Student mobile app" checked={form.studentMobileApp} onChange={(v) => update('studentMobileApp', v)} />
              <ToggleRow className="border border-[#E5E7EB] rounded-[8px]  bg-[#FFFFFF] p-3.5" title="Teacher mobile app" checked={form.teacherMobileApp} onChange={(v) => update('teacherMobileApp', v)} />
              <ToggleRow className="border border-[#E5E7EB] rounded-[8px]  bg-[#FFFFFF] p-3.5" title="Driver mobile app" checked={form.driverMobileApp} onChange={(v) => update('driverMobileApp', v)} />
            </div>
          </section>


          {/* ── Features ── */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className={sectionTitleClass + ' mb-0'}>Features</h3>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1 text-[14px] font-[600] p-1 px-2 text-[#0DA2E7] font-semibold font-[14px]  border  border-[#0DA2E7] rounded-[8px] bg-transparent  cursor-pointer"
              >
                <PlusIcon /> Add Feature
              </button>
            </div>

            <div className="flex flex-col gap-4">
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
                    className="flex-shrink-0 w-12 h-11 flex items-center justify-center rounded-[8px] bg-[#EF4444] text-[white] border-none cursor-pointer transition-colors"
                    title="Remove feature"
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-6 text-[16px] font-sans font-[600] text-[#0DA2E7] p-1.5 px-3   bg-transparent border border-[#0DA2E7] rounded-[8px] cursor-pointer w-fit"
            >
              Manage Module Permission
            </button>
          </section>
        </div>
       <div className="flex justify-end bottom-6 mb-5 mr-6 right-6 z-50">
  <button
    type="button"
    onClick={handleUpdatePlan}
    className="px-4 py-2 text-[16px] font-[400] rounded-[8px]  bg-[#0DA2E7] text-white border-none cursor-pointer  transition-colors"
  > 
    Update Plan
  </button>
</div>
      </div>

      {/* ── Sticky Create Plan action ── */}
    
    </div>
  );
}

/* ── Toggle switch (checked = blue pill, matches your app's toggle style) ── */
function ToggleRow({ title, subtitle, checked, onChange, inline, className = '' }) {
  return (
    <div className={`flex items-center justify-between ${inline ? 'h-[42px]' : ''} ${className}`}>
      <div>
        <p className="text-[14px] font-[500] text-[#1C1C1C]">{title}</p>
        {subtitle && <p className="text-[12px] text-[#9CA3AF] mt-0.5">{subtitle}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-1 rounded-full transition-colors flex-shrink-0 border-none cursor-pointer ${
          checked ? 'bg-[#0DA2E7]' : 'bg-[#D1D5DB]'
        }`}
        style={{ width: '36px', height: '17px' }}
      >
        <span
          className="absolute top-0.25 left-0.5 w-[14px] h-[14px] rounded-full bg-white transition-transform"
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
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"  strokeWidth="1.2" className="w-5 h-5">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
    </svg>
  );
}