import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const inputClass =
  "w-full px-3.5 py-3 text-[16px] border border-[#E6E6E6] rounded-[12px] outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block  text-[14px] font-[600] text-[#374151] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[18px] font-[700] text-[#0F1729] mb-4 font-sans";

const numericFields = ['price'];

const sanitizeNumeric = (value) => {
  let cleaned = value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  return cleaned;
};

export default function CreateAddOnPlan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    storage: '',
    storageType: '',
    currency: 'INR',
    price: '',
  });

  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    const finalValue = numericFields.includes(key) ? sanitizeNumeric(value) : value;
    setForm((f) => ({ ...f, [key]: finalValue }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.storage.trim()) newErrors.storage = 'Storage is required';
    if (!form.storageType) newErrors.storageType = 'Select a storage type';
    if (!form.price.trim()) newErrors.price = 'Price is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreatePlan = () => {
    if (!validateForm()) return;

    const payload = { ...form };
    console.log('Create add-on payload:', payload);

    const newAddOn = {
      id: Date.now(),
      size: `${form.storage} ${form.storageType}`,
      price: Number(form.price) || 0,
      formData: form,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('customAddOns') || '[]');
      localStorage.setItem('customAddOns', JSON.stringify([...existing, newAddOn]));
    } catch (err) {
      console.error('Failed to save add-on to localStorage', err);
    }

    navigate('/plans/add-ons');
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto gap-4 p-7 pb-30">

      <button
        type="button"
        onClick={() => navigate('/plans/add-ons')}
        className="flex items-center mb-2 mt-2 gap-1.5 text-[16px] font-[400] text-[#6B7280] bg-transparent border-none cursor-pointer w-fit transition-colors"
      >
        <BackIcon /> Back
      </button>

      <div className="w-full rounded-[16px] border border-[#00000014] bg-[#FFFFFF]">
        <div className="flex-shrink-0 -mt-1 pt-5 pl-5 pb-1 pr-5">
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Create Add-On Plan</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">
            Define pricing, limits and feature access for a new plan.
          </p>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col gap-6">
          <section>
            <h3 className={sectionTitleClass}>Plan Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
              <div>
                <label className={labelClass}>Storage</label>
                <input
                  type="text"
                  placeholder="e.g., beginner, enterprise"
                  className={inputClass}
                  value={form.storage}
                  onChange={(e) => update('storage', e.target.value)}
                />
                {errors.storage && <p className="text-[12px] text-[#EF4444] mt-1">{errors.storage}</p>}
              </div>
              <div>
                <label className={labelClass}>Storage Type</label>
                <select
                  className={inputClass}
                  value={form.storageType}
                  onChange={(e) => update('storageType', e.target.value)}
                >
                  <option value="">GB/MB</option>
                  <option value="GB">GB</option>
                  <option value="MB">MB</option>
                </select>
                {errors.storageType && <p className="text-[12px] text-[#EF4444] mt-1">{errors.storageType}</p>}
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <select
                  className={inputClass}
                  value={form.currency}
                  onChange={(e) => update('currency', e.target.value)}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Price</label>
                <input
                  type="text"
                  placeholder="₹ 0"
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => update('price', e.target.value)}
                />
                {errors.price && <p className="text-[12px] text-[#EF4444] mt-1">{errors.price}</p>}
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end  mb-5 mr-6 right-6 z-50 mt-7">
          <button
            type="button"
            onClick={handleCreatePlan}
            className="px-4 py-2 text-[16px] font-[400] rounded-[8px] bg-[#0DA2E7] text-white border-none cursor-pointer transition-colors"
          >
            Create Plan
          </button>
        </div>
      </div>
    </div>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
      <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}