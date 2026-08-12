import { Link } from 'react-router-dom';
import { plansData } from "../../data/Plans";
import PLUS from "../../assets/images/PLUS.svg";
import { useNavigate } from 'react-router-dom';
export default function Plans() {
     const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto gap-4 pt-6 pl-6 pr-0 pb-5">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Plans</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-Public-Sans">Manage subscription plans for schools</p>
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
        {plansData.map((plan) => (
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

            <button
          
              className={`mt-auto w-full py-2 text-[14px] font-[600] font-semibold  rounded-[8px] border cursor-pointer transition-colors ${
                plan.popular
                  ? 'bg-[#0DA2E7] border-[#0DA2E7] text-white hover:bg-[#0b8fcb]'
                  : 'bg-white border-[#DDDDDD] text-[#0F1729] hover:bg-gray-50'
              }`}
            >
              Edit Plan
            </button>
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