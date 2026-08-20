import { useRef, useState } from "react";
import { Trash2, UploadCloud, GripVertical, ImageIcon } from "lucide-react";
import aboutusicon from "../../assets/images/Aboutusicon.svg";
import about_upload from "../../assets/images/about_upload.svg";
import section from "../../assets/images/section.svg";
import sectiontitle from "../../assets/images/title.svg";



const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px] font-segoe outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#1C1C1C] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[16px] font-[600] font-semibold text-[#0F1729] font-sans";
const errorClass = "text-[12px] text-[#EF4444] mt-1";

let valueIdCounter = 1;
const newValue = () => ({
  id: `value_${valueIdCounter++}`,
  title: "",
  description: "",
  image: "",
});

export default function WhyChooseSection({ whyChoose, setWhyChoose, isOpen, onToggle, isActive, onToggleActive }) {
  const fileInputRefs = useRef({});
  const [errors, setErrors] = useState({});

  const updateItem = (id, key, value) => {
    setWhyChoose((prev) => prev.map((w) => (w.id === id ? { ...w, [key]: value } : w)));
  };

  const addValue = () => setWhyChoose((prev) => [...prev, newValue()]);

  const removeValue = (id) => setWhyChoose((prev) => prev.filter((w) => w.id !== id));

  const handleImageChange = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, [id]: "Please select a valid image file" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [id]: "Image must be under 5MB" }));
      return;
    }

    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });

    const reader = new FileReader();
    reader.onload = () => updateItem(id, "image", reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleDrop = (id, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    handleImageChange(id, { target: { files: [file], value: "" } });
  };

  const removeImage = (id) => updateItem(id, "image", "");

  return (
    <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white overflow-hidden">
      <div
        onClick={onToggle}
        className="flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50/50 cursor-pointer select-none transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <span className="text-[#0DA2E7] flex-shrink-0 bg-[#E6EEFC] rounded-[12px] p-2">
            <img src={aboutusicon} alt="" className="w-4 h-4" />
          </span>
          <h2 className={sectionTitleClass}>Why Choose MUN-C</h2>
          <ToggleSwitch checked={isActive} onChange={onToggleActive} />
        </div>
        <ChevronIcon open={isOpen} />
      </div>

      {isOpen && (
        <div className="px-6 pb-6 pt-3 flex flex-col gap-4 border-t border-[#F2F3F5] bg-[#FFFFFF]">
          {whyChoose.map((item, idx) => (
            <div key={item.id} className="rounded-[12px] border border-[#E5E7EB] bg-[#FBFCFD] overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#FBFCFD] border-b border-[#E5E7EB]">
                <span className="flex items-center gap-2 text-[14px] font-[600] text-[#696969] font-semibold">
                  <GripVertical className="w-4 h-4 text-[#9CA3AF]" />
                  Value {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeValue(item.id)}
                  className="text-[#9CA3AF] hover:text-[#EF4444] bg-transparent border-none cursor-pointer p-1 transition-colors"
                  title="Remove value"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Form fields */}
              <div className="p-4 flex flex-col gap-4 bg-[#FFFFFF]">
                <div>
                 
                  <label className={labelClass}> <img src={sectiontitle} className="inline w-2.5 h-2.5 mr-1 -mt-0.5" />Title</label>
                  <input
                    type="text"
                    placeholder="e.g., All-In-One Platform"
                    className={inputClass}
                    value={item.title}
                    onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}> <ParagraphIcon className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />Content</label>
                  <input
                    type="text"
                    placeholder="e.g., Everything a school needs in one integrated system."
                    className={inputClass}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  />
                </div>

                {/* Image upload + live preview, side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Image</label>
                    <div
                      onClick={() => fileInputRefs.current[item.id]?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(item.id, e)}
                      className="w-full h-[180px] rounded-[16px] border-2 border-dashed border-[#D1D5DB] flex flex-col items-center justify-center cursor-pointer bg-[#FFFFFF] transition-colors"
                    >
                      <div className="flex flex-col items-center gap-2 text-center p-4">
                               <img src={about_upload} alt="Upload" className="w-15 h-15 opacity-90" />
                        <p className="text-[13px] font-[400] text-[#9CA3AF] font-inter mt-0">
                          Drag &amp; Drop your files here
                          <br />
                          <span className="text-[13px] text-[#9CA3AF]">Or</span>
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRefs.current[item.id]?.click();
                          }}
                          className="px-3.5 py-2 text-[12px] font-[500] font-medium bg-[#2563EB] text-white rounded-[10px] border-none cursor-pointer transition-colors"
                        >
                          Browse files
                        </button>
                      </div>
                    </div>
                    <input
                      ref={(el) => (fileInputRefs.current[item.id] = el)}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(item.id, e)}
                      className="hidden"
                    />
                    {errors[item.id] && <p className={errorClass}>{errors[item.id]}</p>}
                  </div>

                  <div>
                    <label className={labelClass}>Preview</label>
                    <div className="relative w-full h-[180px] rounded-[16px] py-5 px-9 bg-[#F1F1F1] border border-[#E5E7EB] flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <>
                          <img src={item.image} alt="Preview" className="w-[150px] h-[150px] object-contain" />
                          <button
                            type="button"
                            onClick={() => removeImage(item.id)}
                            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-[13px] font-normal cursor-pointer shadow-sm border-none"
                            title="Remove image"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <ImageIcon className="w-10 h-10 text-[#C7CBD1]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addValue}
            className="mt-1 text-[14px] font-[600] text-[#0DA2E7] font-sans border border-[#0DA2E7] rounded-[8px] px-3 py-1.5 bg-transparent cursor-pointer w-fit"
          >
            Add Value
          </button>
        </div>
      )}
    </div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-8 h-[15px] rounded-full transition-colors border-none cursor-pointer flex-shrink-0 ${
        checked ? "bg-[#0DA2E7]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-[11px] h-[11.5px] rounded-full bg-white transition-transform"
        style={{ transform: checked ? "translateX(18px)" : "translateX(0)" }}
      />
    </button>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`w-4 h-4 text-[#6B7280] transition-transform duration-200 ${open ? "" : ""}`}
    >
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ParagraphIcon() {
  return (
    <svg 
      className="inline w-3.5 h-3.5 mr-1 -mt-0.5"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h10" />
      <path d="M4 18h6" />
    </svg>
  );
}