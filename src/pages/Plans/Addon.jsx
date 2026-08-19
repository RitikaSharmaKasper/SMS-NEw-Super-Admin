
import { addOnsData } from "../../data/Plans";
import { Link, useNavigate } from 'react-router-dom';
import { useraddOnsData} from "../../data/Plans";
import { useState, useEffect } from 'react';


import PLUS from "../../assets/images/PLUS.svg";

export default function AddOn() {

 const navigate = useNavigate();
  // merge statically-defined addOnsData with add-ons saved from Create/Edit forms
  const [allAddOns, setAllAddOns] = useState(addOnsData);
   const [alluserAddOns, setAllUserAddOns] = useState(useraddOnsData);

  useEffect(() => {
    try {
      const customAddOns = JSON.parse(localStorage.getItem('customAddOns') || '[]');

      const merged = addOnsData.map((staticAddOn) => {
        const override = customAddOns.find((ca) => String(ca.id) === String(staticAddOn.id));
         return override ? { ...staticAddOn, ...override } : staticAddOn;
      });
       const brandNew = customAddOns.filter(
         (ca) => !addOnsData.some((sa) => String(sa.id) === String(ca.id))
      );

      setAllAddOns([...merged, ...brandNew]);
     } catch (err) {
    console.error('Failed to load custom add-ons from localStorage', err);
      setAllAddOns(addOnsData);
     }
   }, []);

 useEffect(() => {
    try {
      const customuserAddOns = JSON.parse(localStorage.getItem('customuserAddOns') || '[]');

      const merged = useraddOnsData.map((staticAddOn) => {
        const override = customuserAddOns.find((ca) => String(ca.id) === String(staticAddOn.id));
         return override ? { ...staticAddOn, ...override } : staticAddOn;
      });
       const brandNew = customuserAddOns.filter(
         (ca) => !useraddOnsData.some((sa) => String(sa.id) === String(ca.id))
      );

      setAllUserAddOns([...merged, ...brandNew]);
     } catch (err) {
    console.error('Failed to load custom add-ons from localStorage', err);
      setAllUserAddOns(useraddOnsData);
     }
   }, []);





  return (
    <div className="flex flex-col h-full overflow-y-auto gap-4 min-h-0 p-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Add-On Plan</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Manage Add On subscription plans for schools</p>
        </div>

     {/* Plans / Add-Ons tab switch */}
<div className="flex items-center bg-[#EEEEEE] rounded-[12px] py-1.5 px-3 gap-1 self-start sm:self-auto">
  <Link
    to="/plans"
    className="px-6 py-1 text-[15px] font-medium font-[500]  rounded-[8px] text-[#6B7280]"
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    Plans
  </Link>
  <Link
    to="/plans/add-ons"
    className="px-7 py-1 text-[15px] font-medium font-[500] rounded-[8px] bg-[#F5F7F7] border border-[#FFFFFF] text-[#0F1729]"
  style={{
      fontFamily: "'Inter', sans-serif",
      boxShadow: '0 1px 2px 0 rgba(10, 19, 9, 0.12)'
    }}
>
  
    Add-Ons
  </Link>
</div>
      </div>




 <p className="text-[20px] font-[600] font-semibold text-[#0F1729] mb-0">User</p>

      {/* ── Add-on cards (repeats — equal size per row automatically) ── */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 items-stretch -mt-[9px]">
  {alluserAddOns.slice(0, 2).map((addon) => (
    <div
      key={addon.id}
      className="flex flex-col items-center text-center w-full rounded-[16px] border border-[#E6E6E6] bg-[#FFFFFF] p-4 gap-2"
    >
      <p className="text-[16px] font-[700] font-[bold] font-segoe text-[#1C1C1C]">{addon.name}</p>
      <p className="text-[16px] font-[600] font-semibold text-[#00B241] font-segoe mt-0">₹{addon.price}/user</p>

      <button 
        className="-mt-[2px] w-full py-3 text-[14px] font-semibold font-[600] rounded-[8px] border border-[#E5E7EB] bg-[#F6F7F9] text-[#0F1729] cursor-pointer transition-colors"
        onClick={() => navigate(`/plans/add-ons/edit/${addon.id}?type=user`)}
      >
        Edit Plan
      </button>
    </div>
  ))}
</div>



















      <p className="text-[20px] font-[600] font-semibold text-[#0F1729] mb-0">Storage</p>

      {/* ── Add-on cards (repeats — equal size per row automatically) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch -mt-[9px]">
    {allAddOns.map((addon) => (
          <div
            key={addon.id}
        className="flex flex-col items-center text-center w-full rounded-[16px] border border-[#E6E6E6] bg-[#FFFFFF] p-4 gap-2"
          >
            <p className="text-[16px] font-[700]  font-[bold] font-segoe text-[#1C1C1C]">{addon.size}</p>
            <p className="text-[16px] font-[600] font-semibold text-[#00B241] font-segoe mt-0">₹{addon.price}</p>

            <button className="-mt-[3px] w-full py-2 text-[14px] font-semibold font-[600] rounded-[8px] border border-[#E5E7EB] bg-[#F6F7F9] text-[#0F1729] cursor-pointer  transition-colors"
            
               onClick={() => navigate(`/plans/add-ons/edit/${addon.id}`)}
            
            >
         
         
         
              Edit Plan
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => {/* your add add-on handler */}}
        className="fixed bottom-6 right-6 w-11 h-11 flex items-center justify-center bg-[#0DA2E7] text-white rounded-full border-none cursor-pointer transition-colors z-50"
        title="Add Add-On"
         onClick={() => navigate('/plans/add-ons/create')}
      >
        <img src={PLUS} alt="" className="w-7 h-7" />
      </button>
    </div>
  );
}