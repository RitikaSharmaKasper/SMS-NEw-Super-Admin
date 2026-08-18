import { useState } from 'react';
import { faq } from '../data/faq';
import ActionMenu from '../components/layout/ActionMenu';
import PLUS from '../assets/images/PLUS.svg';

export default function FAQ() {
  const [items] = useState(faq);

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] font-sans">FAQ Management</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Manage frequently asked questions for your website</p>
        </div>
      </div>

      {/* FAQ card */}
<div className="w-full rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] flex flex-col overflow-hidden ">

  <div className="flex items-center justify-between  mb-4 border-b border-[#E5E7EB] bg-[#F9F9FA] px-4 pt-3 pb-3">
    <h2 className="text-[14px] font-[600] font-semibold text-[#6B7280] font-semibold font-sans">Current FAQs</h2>
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-[600] font-semibold bg-[#DBD2FA] text-[#7F2FBD] whitespace-nowrap">
      {items.length} FAQs
    </span>
  </div>

        <div className="flex flex-col ">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">No FAQs found</div>
          ) : items.map((f, idx) => (
            <div
              key={f.id}
              className="flex items-start justify-between gap-3 pt-3 px-2 pb-4 border-b border-[#F2F3F5]  last:border-b-0"
            >
              <div className="flex items-start gap-3 min-w-0 px-2 ">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0DA2E7] text-white text-[14px] font-sans font-[700] font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <div className="min-w-0  ">
                  <p className="font-bold text-[#0F1729]  font-[700] text-[14px]">{f.question}</p>
                  <p className="text-[12px] text-[#6B7280] font-[400] mt-1 ">{f.answer}</p>
                </div>
              </div>

              <div className="flex-shrink-0 pr-17 pt-3">
                <ActionMenu
                  actions={[
                    { label: 'Edit',   icon: <EditIcon />,  onClick: () => {} },
                    { label: 'Delete', icon: <TrashIcon />, onClick: () => {}, danger: true },
                  ]}
                  align="right"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {/* your add FAQ handler */}}
        className="fixed bottom-17 right-6 w-11 h-11 flex items-center justify-center bg-[#0DA2E7] text-white rounded-full border-none cursor-pointer transition-colors z-50"
        title="Add FAQ"
      >
        <img src={PLUS} alt="" className="w-8 h-8" />
      </button>
    </div>
  );
}

function EditIcon()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M11 2l3 3-9 9H2v-3l9-9z" /></svg>; }
function TrashIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" /></svg>; }