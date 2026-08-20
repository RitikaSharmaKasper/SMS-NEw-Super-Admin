import { useRef, useState } from "react";
import { Megaphone, GripVertical, Trash2, ArrowUp } from "lucide-react";
import uploadIcon from "../../assets/images/upload.svg";
const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px] font-segoe outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#1C1C1C] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[16px] font-[600] font-semibold text-[#0F1729] font-sans";
const errorClass = "text-[12px] text-[#EF4444] mt-1";

let memberIdCounter = 1;
const newMember = () => ({
  id: `member_${memberIdCounter++}`,
  name: "",
  role: "",
  photo: null,
});

export default function PeopleSection({ body, setBody, people, setPeople, isOpen, onToggle, isActive, onToggleActive }) {
  const photoInputRefs = useRef({});
  const [errors, setErrors] = useState({});

  const updateMember = (id, key, value) => {
    setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
  };

  const addMember = () => setPeople((prev) => [...prev, newMember()]);

  const removeMember = (id) => setPeople((prev) => prev.filter((p) => p.id !== id));

  const handlePhotoUpload = (id, e) => {
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
    reader.onload = () => updateMember(id, "photo", reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removePhoto = (id) => {
    updateMember(id, "photo", null);
    if (photoInputRefs.current[id]) photoInputRefs.current[id].value = "";
  };

  return (
    <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white overflow-hidden">
      <div
        onClick={onToggle}
        className="flex items-center justify-between px-5 py-4 bg-white cursor-pointer select-none transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <span className="text-[#0DA2E7] flex-shrink-0 bg-[#E6EEFC] rounded-[12px] p-2">
            <Megaphone className="w-4 h-4" />
          </span>
          <h2 className={sectionTitleClass}>The People Behind SMS MUN-C</h2>
          <ToggleSwitch checked={isActive} onChange={onToggleActive} />
        </div>
        <ChevronIcon open={isOpen} />
      </div>

      {isOpen && (
        <div className="px-6 pb-6 pt-3 flex flex-col gap-4 border-t border-[#F2F3F5] bg-[#FFFFFF]">
          <div>
            <label className={labelClass}>Body</label>
            <textarea
              rows={3}
              placeholder="A passionate team of educators, technologists and dreamers working together to build better schools."
              className={`${inputClass} resize-none`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          {people.map((person, idx) => (
            <div key={person.id} className="rounded-[12px] border border-[#E5E7EB] bg-[#FBFCFD] overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#F3F4F6] border-b border-[#E5E7EB]">
                <span className="flex items-center gap-2 text-[14px] font-[600] text-[#696969] font-semibold">
                  <GripVertical className="w-4 h-4 text-[#9CA3AF]" />
                  People {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeMember(person.id)}
                  className="text-[#9CA3AF] hover:text-[#EF4444] bg-transparent border-none cursor-pointer p-1 transition-colors"
                  title="Remove member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Form fields */}
              <div className="p-4 flex flex-col gap-4 bg-[#FFFFFF]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input
                      type="text"
                      placeholder="e.g., rupesh"
                      className={inputClass}
                      value={person.name}
                      onChange={(e) => updateMember(person.id, "name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Role</label>
                    <input
                      type="text"
                      placeholder="e.g., web developer"
                      className={inputClass}
                      value={person.role}
                      onChange={(e) => updateMember(person.id, "role", e.target.value)}
                    />
                  </div>
                </div>

                {/* Circular photo upload, same pattern as CreateTestimonial */}
                <div>
                  <label className={labelClass}>Photo</label>
                  <div className="relative w-fit">
                    <div
                      onClick={() => photoInputRefs.current[person.id]?.click()}
                      className="w-18 h-18 rounded-full border border-[#D1D5DC] flex items-center justify-center cursor-pointer bg-[#FAFAFA] hover:bg-gray-50 transition-colors relative overflow-hidden"
                    >
                      {person.photo ? (
                        <img src={person.photo} alt={person.name || "Photo"} className="w-full h-full object-cover" />
                      ) : (
                     <img src={uploadIcon} alt="Upload" className="w-5 h-6 opacity-70 grayscale" />
                      )}
                    </div>

                    {person.photo && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto(person.id);
                        }}
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#EF4444] text-white text-[16px] flex items-center justify-center hover:bg-[#DC2626] transition-colors shadow-md border-none cursor-pointer"
                        title="Remove photo"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <input
                    ref={(el) => (photoInputRefs.current[person.id] = el)}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(person.id, e)}
                    className="hidden"
                  />
                  {errors[person.id] && <p className={errorClass}>{errors[person.id]}</p>}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            className="text-[14px] font-[600] text-[#0DA2E7] font-sans border border-[#0DA2E7] rounded-[8px] px-3 py-1.5 bg-transparent cursor-pointer w-fit"
          >
            Add Member
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
      className={`relative w-8 h-[16px] rounded-full transition-colors border-none cursor-pointer flex-shrink-0 ${
        checked ? "bg-[#0DA2E7]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-[11px] h-[12px] rounded-full bg-white transition-transform"
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