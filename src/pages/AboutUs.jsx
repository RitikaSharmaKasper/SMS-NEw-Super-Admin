import { useState, useRef } from 'react';

import HeroSection from './AboutUs/HeroSection';
import StatsSection from './AboutUs/StatsSection';
import MissionSection from './AboutUs/MissionSection';
import VisionSection from './AboutUs/VisionSection';
import WhyChooseSection from './AboutUs/WhyChooseSection';
import PeopleSection from './AboutUs/PeopleSection';

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState('hero');

  const [toggles, setToggles] = useState({
    hero: true,
    stats: true,
    mission: true,
    vision: true,
    whyChoose: true,
    people: true,
  });

  const [hero, setHero] = useState({
    badgeText: 'About MUN-C',
    designation: 'Empowering School, Enriching Education',
    subtitle: 'MUN-C School Management System is a smart, modern and comprehensive platform that simplifies school operations, enhances communication, and helps educators focus on what matters most-student success.',
    ctaLabel: 'Get Started Free',
    ctaPath: '/book-demo',
    image: '',
    attachments: [
     
    ],
  });

  const [fileError, setFileError] = useState('');

  const [stats, setStats] = useState([
    { id: 1, value: '1,000+' },
    { id: 2, value: '150,000+' },
    { id: 3, value: '98%' },
    { id: 4, value: '5+' },
  ]);

  const [mission, setMission] = useState({
    title: 'Our Mission',
    description: 'To revolutionize educational institution management by delivering innovative, scalable, and intuitive technology solutions.',
  });

  const [vision, setVision] = useState({
    title: 'Our Vision',
    description: 'To be the most trusted global platform empowering schools to achieve operational excellence and academic success.',
  });

  const [whyChoose, setWhyChoose] = useState([
    { id: 1, title: 'All-in-One Platform', description: 'Comprehensive suite for all school management needs.' },
    { id: 2, title: 'Secure & Reliable', description: 'Bank-grade encryption and 99.9% uptime guarantee.' },
    { id: 3, title: '24/7 Dedicated Support', description: 'Round-the-clock support to assist your institution anytime.' },
  ]);

  const [people, setPeople] = useState([
    { id: 1, name: 'Dr. Rajesh Sharma', designation: 'Founder & CEO', photo: '' },
    { id: 2, name: 'Anita Verma', designation: 'Head of Product', photo: '' },
  ]);

  const galleryInputRef = useRef(null);

  const toggleAccordion = (key) => {
    setActiveSection((prev) => (prev === key ? null : key));
  };

  const toggleSectionActive = (key, e) => {
    e.stopPropagation();
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setFileError('');

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setFileError('Each image must be under 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setHero((h) => ({ ...h, attachments: [...h.attachments, reader.result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAttachment = (idx) => {
    setHero((h) => ({ ...h, attachments: h.attachments.filter((_, i) => i !== idx) }));
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto gap-4 p-6 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">About Us Page</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Edit all sections of the public About Us page.</p>
        </div>
      </div>

      {/* ── Separate Cards Container with gap-4 ── */}
      <div className="flex flex-col gap-3">
        <HeroSection
          hero={hero}
          setHero={setHero}
          isOpen={activeSection === 'hero'}
          onToggle={() => toggleAccordion('hero')}
          isActive={toggles.hero}
          onToggleActive={(e) => toggleSectionActive('hero', e)}
          galleryInputRef={galleryInputRef}
          fileError={fileError}
          handleAttachmentUpload={handleAttachmentUpload}
          removeAttachment={removeAttachment}
        />

        <StatsSection
          stats={stats}
          setStats={setStats}
          isOpen={activeSection === 'stats'}
          onToggle={() => toggleAccordion('stats')}
          isActive={toggles.stats}
          onToggleActive={(e) => toggleSectionActive('stats', e)}
        />

        <MissionSection
          mission={mission}
          setMission={setMission}
          isOpen={activeSection === 'mission'}
          onToggle={() => toggleAccordion('mission')}
          isActive={toggles.mission}
          onToggleActive={(e) => toggleSectionActive('mission', e)}
        />

        <VisionSection
          vision={vision}
          setVision={setVision}
          isOpen={activeSection === 'vision'}
          onToggle={() => toggleAccordion('vision')}
          isActive={toggles.vision}
          onToggleActive={(e) => toggleSectionActive('vision', e)}
        />

        <WhyChooseSection
          whyChoose={whyChoose}
          setWhyChoose={setWhyChoose}
          isOpen={activeSection === 'whyChoose'}
          onToggle={() => toggleAccordion('whyChoose')}
          isActive={toggles.whyChoose}
          onToggleActive={(e) => toggleSectionActive('whyChoose', e)}
        />

        <PeopleSection
          people={people}
          setPeople={setPeople}
          isOpen={activeSection === 'people'}
          onToggle={() => toggleAccordion('people')}
          isActive={toggles.people}
          onToggleActive={(e) => toggleSectionActive('people', e)}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="px-6 py-2.5 text-[16px] font-[600] rounded-[8px] bg-[#0DA2E7] text-white border-none cursor-pointer transition-colors shadow-sm hover:bg-[#0b8fcb]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
