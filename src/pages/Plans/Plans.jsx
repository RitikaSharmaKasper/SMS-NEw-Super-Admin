import { Link } from 'react-router-dom';
import { plansData } from "../../data/Plans";
import PLUS from "../../assets/images/PLUS.svg";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {  Trash2 } from 'lucide-react';
export default function Plans() {
  const navigate = useNavigate();

  // merge statically-defined plansData with plans saved from the Create Plan form
  const [allPlans, setAllPlans] = useState(plansData);

  useEffect(() => {
    try {
      const customPlans = JSON.parse(localStorage.getItem('customPlans') || '[]');
      const deletedIds = new Set(JSON.parse(localStorage.getItem('deletedStaticPlanIds') || '[]'));
      const customMap = new Map(customPlans.map((p) => [String(p.id), p]));
      const staticIds = new Set(plansData.map((p) => String(p.id)));

      // Walk static plans in their original order:
      //   - skip deleted ones
      //   - replace with custom override in-place (keeps position, keeps Popular badge position)
      const merged = plansData
        .filter((p) => !deletedIds.has(String(p.id)))
        .map((p) => (customMap.has(String(p.id)) ? customMap.get(String(p.id)) : p));

      // Append truly new plans (not overrides of static plans) at the end
      const newCustom = customPlans.filter((p) => !staticIds.has(String(p.id)));

      setAllPlans([...merged, ...newCustom]);
    } catch (err) {
      console.error('Failed to load custom plans from localStorage', err);
      setAllPlans(plansData);
    }
  }, []);

  const handleDeletePlan = (planId) => {
    const idStr = String(planId);

    // Remove from UI immediately
    setAllPlans((prev) => prev.filter((p) => String(p.id) !== idStr));

    try {
      const customPlans = JSON.parse(localStorage.getItem('customPlans') || '[]');
      const isCustom = customPlans.some((p) => String(p.id) === idStr);

      if (isCustom) {
        // Remove from customPlans
        const updated = customPlans.filter((p) => String(p.id) !== idStr);
        localStorage.setItem('customPlans', JSON.stringify(updated));
        // If this was originally a static plan (saved as override), also mark as deleted
        // so the original static version doesn't reappear on next load
        if (plansData.some((p) => String(p.id) === idStr)) {
          const deleted = JSON.parse(localStorage.getItem('deletedStaticPlanIds') || '[]');
          if (!deleted.includes(idStr)) {
            localStorage.setItem('deletedStaticPlanIds', JSON.stringify([...deleted, idStr]));
          }
        }
      } else {
        // Pure static plan: track id so it doesn't reappear on reload
        const deleted = JSON.parse(localStorage.getItem('deletedStaticPlanIds') || '[]');
        if (!deleted.includes(idStr)) {
          localStorage.setItem('deletedStaticPlanIds', JSON.stringify([...deleted, idStr]));
        }
      }
    } catch (err) {
      console.error('Failed to delete plan', err);
    }
  };


  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto gap-4 pt-6 pl-6 pr-0 pb-5">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Plans</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Manage subscription plans for schools</p>
        </div>

        {/* Plans / Add-Ons tab switch */}
    {/* Plans / Add-Ons tab switch */}
<div className="flex items-center bg-[#EEEEEE] rounded-[12px] py-1.5 px-3 gap-1 self-start sm:self-auto mr-6">
  <Link
    to="/plans"
className="px-7 py-1 text-[15px] font-medium font-[500]  rounded-[8px] bg-[#F5F7F7] border border-[#FFFFFF] text-[#1C1C1C]"
   style={{
      fontFamily: "'Inter', sans-serif",
      boxShadow: '0 1px 2px 0 rgba(10, 19, 9, 0.12)'
    }}
>
    Plans
  </Link>
  <Link
    to="/plans/add-ons"
    className="px-6 py-1 text-[15px] font-medium  font-[500] rounded-[8px] text-[#6B7280]"
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    Add-Ons
  </Link>
</div>
      </div>

      {/*
        ── Plans grid ──
        mobile: 1 card
        sm (640+): 2 cards
        lg (1024+) through xl (1440 sits here too): 3 cards
        2xl (1536+): 4 cards
      */}
      <div className="flex flex-wrap gap-4">
        {allPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] 2xl:w-[calc(25%-18px)] rounded-[16px] bg-[#FFFFFF] py-4.5 px-5 gap-2 ${
              plan.popular
                ? 'border-[2px] border-[#0DA2E7] pt-8'
                : 'border border-[#E5E7EB]'
            }`}
          >
            {plan.popular && (
              <span className="absolute left-1/2 -translate-x-1/2 top-0 px-4.5 py-1  mb-5 rounded-b-[19px]  bg-[#0DA2E7] text-[#FFFFFF] text-[16px] font-[400] whitespace-nowrap">
                Popular
              </span>
            )}

            <p className="text-[18px] font-[700] font-bold text-[#000000]">{plan.name}</p>

            <div className="flex items-baseline gap-1">
              <span className="text-[24px] font-[700] text-[#0F1729]">₹{plan.price.toLocaleString()}</span>
              <span className="text-[16px] text-[#6B7280] font-[400]">/mo</span>
            </div>
            <p className="text-[14px] text-[#6B7280] -mt-[10px]">₹{plan.yearlyPrice.toLocaleString()}/year</p>

            <div className="flex items-center justify-between text-[14px] mt-2  ">
              <span className="text-[#6B7280] text-[16px] font-[400]">Students</span>
              <span className="text-[#0F1729] text-[16px]  font-[600] ">{plan.students}</span>
            </div>
            <div className="flex items-center justify-between text-[14px] -mt-[3px] -mb-[6px]">
              <span className="text-[#6B7280] text-[16px] font-[400]">Teachers</span>
              <span className="text-[#0F1729] text-[16px] font-[600]">{plan.teachers}</span>
            </div>

            <p className="text-[16px]  font-semibold text-[#6B7280] font-[600] mt-2 mb-0 border-t border-[#E5E7EB] pt-3">Modules</p>
            <ul className="flex flex-col gap-1 mb-4">
              {plan.modules.map((m) => (
                <li key={m} className="flex items-center gap-1.5 text-[16px] font-[400] text-[#0F1729]">
                  <CheckIcon />
                  {m}
                </li>
              ))}
            </ul>

            {/* Bottom action buttons: Edit Plan (wider) & Delete Plan side-by-side */}
            <div className="mt-auto flex items-center gap-2 w-full">
              <button
                onClick={() => navigate(`/plans/edit/${plan.id}`)}
                className={`flex-1 py-2 text-[14px] font-[600] font-semibold rounded-[8px] border cursor-pointer transition-colors ${
                  plan.popular
                    ? 'bg-[#0DA2E7] border-[#0DA2E7] text-white hover:bg-[#0b8fcb]'
                    : 'bg-white border-[#DDDDDD] text-[#0F1729] hover:bg-gray-50'
                }`}
              >
                Edit Plan
              </button>
              <button
                type="button"
                onClick={() => handleDeletePlan(plan.id)}
                title="Delete Plan"
                className="px-3 py-2 text-[14px] font-[600] font-semibold rounded-[8px] border border-[#FECACA] bg-[#FEF2F2] text-[#EF4444] hover:bg-[#EF4444] hover:text-white cursor-pointer transition-colors whitespace-nowrap"
              >
                Delete Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add button */}
      <button
         onClick={() => navigate('/plans/create')}
      
        className="fixed bottom-6 right-6 w-11 h-11 flex items-center justify-center bg-[#0DA2E7] text-white rounded-full border-none cursor-pointer transition-colors z-50"
        title="Add Plan"
      >
        <img src={PLUS} alt="" className="w-8 h-8" />
      </button>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-[#21C45D] flex-shrink-0">
      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Same XIcon as used in CreatePlan / EditPlan – taken from your existing code
function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
    </svg>
  );
}