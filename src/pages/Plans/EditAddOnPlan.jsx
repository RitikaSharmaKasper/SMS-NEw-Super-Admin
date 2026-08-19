import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { addOnsData, useraddOnsData } from "../../data/Plans";

const inputClass =
  "w-full px-3.5 py-3 text-[16px] border border-[#E6E6E6] rounded-[12px] outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#374151] mb-1 font-segoe font-semibold";
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

export default function EditAddOnPlan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isUserAddOn = searchParams.get('type') === 'user';

  const [form, setForm] = useState({
    name: '',
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

  useEffect(() => {
    try {
      if (isUserAddOn) {
        const customUserAddOns = JSON.parse(localStorage.getItem('customuserAddOns') || '[]');
        const customMatch = customUserAddOns.find((a) => String(a.id) === String(id));
        if (customMatch) {
          if (customMatch.formData) setForm(customMatch.formData);
          else setForm((f) => ({ ...f, name: customMatch.name || '', price: String(customMatch.price ?? '') }));
          return;
        }

        const staticMatch = useraddOnsData.find((a) => String(a.id) === String(id));
        if (staticMatch) {
          setForm((f) => ({
            ...f,
            name: staticMatch.name || '',
            currency: 'INR',
            price: String(staticMatch.price ?? ''),
          }));
        }
      } else {
        const customAddOns = JSON.parse(localStorage.getItem('customAddOns') || '[]');
        const customMatch = customAddOns.find((a) => String(a.id) === String(id));

        if (customMatch) {
          if (customMatch.formData) setForm(customMatch.formData);
          return;
        }

        const staticMatch = addOnsData.find((a) => String(a.id) === String(id));
        if (staticMatch) {
          const [storage, storageType] = String(staticMatch.size || '').split(' ');
          setForm((f) => ({
            ...f,
            storage: storage || '',
            storageType: storageType || 'GB',
            currency: 'INR',
            price: String(staticMatch.price ?? ''),
          }));
        }
      }
    } catch (err) {
      console.error('Failed to load add-on for editing', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isUserAddOn]);

  const validateForm = () => {
    const newErrors = {};
    if (isUserAddOn) {
      if (!form.name.trim()) newErrors.name = 'Name is required';
    } else {
      if (!form.storage.trim()) newErrors.storage = 'Storage is required';
      if (!form.storageType) newErrors.storageType = 'Select a storage type';
    }
    if (!form.price.trim()) newErrors.price = 'Price is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePlan = () => {
    if (!validateForm()) return;

    if (isUserAddOn) {
      const updatedUserAddOn = {
        id,
        name: form.name,
        price: Number(form.price) || 0,
        formData: form,
      };

      try {
        const existing = JSON.parse(localStorage.getItem('customuserAddOns') || '[]');
        const alreadyExists = existing.some((a) => String(a.id) === String(id));
        const updatedList = alreadyExists
          ? existing.map((a) => (String(a.id) === String(id) ? { ...a, ...updatedUserAddOn } : a))
          : [...existing, updatedUserAddOn];

        localStorage.setItem('customuserAddOns', JSON.stringify(updatedList));
      } catch (err) {
        console.error('Failed to update user add-on in localStorage', err);
      }
    } else {
      const updatedAddOn = {
        id,
        size: `${form.storage} ${form.storageType}`,
        price: Number(form.price) || 0,
        formData: form,
      };

      try {
        const existing = JSON.parse(localStorage.getItem('customAddOns') || '[]');
        const alreadyExists = existing.some((a) => String(a.id) === String(id));
        const updatedList = alreadyExists
          ? existing.map((a) => (String(a.id) === String(id) ? { ...a, ...updatedAddOn } : a))
          : [...existing, updatedAddOn];

        localStorage.setItem('customAddOns', JSON.stringify(updatedList));
      } catch (err) {
        console.error('Failed to update add-on in localStorage', err);
      }
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
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Edit Add-On Plan</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">
            Update pricing, limits and feature access for this plan.
          </p>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col gap-6">
          <section>
            <h3 className={sectionTitleClass}>Plan Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
              {isUserAddOn ? (
                <div>
                  <label className={labelClass}> User Type / Name </label>
                  <input
                    type="text"
                    placeholder="e.g. Student, Staff"
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                  {errors.name && <p className="text-[12px] text-[#EF4444] mt-1">{errors.name}</p>}
                </div>
              ) : (
                <>
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
                    
                      <option value="GB">GB</option>
                      <option value="MB">MB</option>
                    </select>
                    {errors.storageType && <p className="text-[12px] text-[#EF4444] mt-1">{errors.storageType}</p>}
                  </div>
                </>
              )}







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




<div className={isUserAddOn ? "w-full col-span-2" : "col-span-1"}>
  <label className={labelClass}>Price</label>
  <input
    type="text"
    placeholder="₹ 0"
    className={`${inputClass} ${isUserAddOn ? "w-full" : ""}`}
    value={form.price}
    onChange={(e) => update('price', e.target.value)}
  />
  {errors.price && <p className="text-[12px] text-[#EF4444] mt-1">{errors.price}</p>}
</div>






{/*              
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
              </div> */}


            </div>
          </section>
        </div>

        <div className="flex justify-end bottom-6 mb-5 mr-6 right-6 z-50">
          <button
            type="button"
            onClick={handleUpdatePlan}
            className="px-4 py-2 text-[16px] font-[400] rounded-[8px] bg-[#0DA2E7] text-white border-none cursor-pointer transition-colors"
          >
            Update Plan
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