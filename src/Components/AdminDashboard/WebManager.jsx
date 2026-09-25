import React, { useState } from 'react';
import { Globe, LayoutTemplate, Building2, Save } from 'lucide-react';
import WebHeroSection from './WebHeroSection';
import WebCompanySection from './WebCompanySection';

export default function WebManager() {
  const [activeSubTab, setActiveSubTab] = useState('hero');

  // State untuk Hero Section
  const [heroData, setHeroData] = useState({
    badge: "Indonesia's Finest",
    heading1: "Redefine Your",
    heading2: "Travel Experience.",
    subtext: "Momen liburan itu mahal, jangan sampai dirusak itinerary yang berantakan. Biar kami yang atur, kamu tinggal nikmati perjalanannya.",
    btnText: "Eksplor Sekarang",
    gambar: ""
  });

  // State untuk Company Section
  const [companyData, setCompanyData] = useState({
    heading1: "Crafting Memories",
    heading2: "Since 2015",
    subtext: "Berawal dari hobi jalan-jalan, BarTrans Travel kini hadir sebagai travel partner terpercaya buat lo yang anti-ribet dan butuh pengalaman liburan premium.",
    stat1Value: "5K+", stat1Label: "HAPPY TRAVELERS",
    stat2Value: "50+", stat2Label: "DESTINATIONS",
    gambar: ""
  });

  const [isSaving, setIsSaving] = useState(false);

  // Handlers untuk Hero
  const handleHeroChange = (e) => setHeroData({ ...heroData, [e.target.name]: e.target.value });
  const handleHeroImage = (e) => processImage(e.target.files[0], setHeroData);
  const handleRemoveHeroImage = () => setHeroData({ ...heroData, gambar: '' });

  // Handlers untuk Company
  const handleCompanyChange = (e) => setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  const handleCompanyImage = (e) => processImage(e.target.files[0], setCompanyData);
  const handleRemoveCompanyImage = () => setCompanyData({ ...companyData, gambar: '' });

  // Fungsi utilitas baca gambar
  const processImage = (file, setter) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(prev => ({ ...prev, gambar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSaveData = () => {
    setIsSaving(true);
    // Simulasi hit API Backend
    setTimeout(() => {
      setIsSaving(false);
      alert('Data Website berhasil diperbarui ke server!');
    }, 800);
  };

  return (
    <div className="relative">
      
      {/* HEADER & NAVIGASI */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
            <Globe className="text-[#f26e22]" size={28} /> CMS Manajemen Web
          </h3>
          <p className="text-gray-500 text-sm mt-1 ml-9">Kelola teks copywriting dan gambar yang tampil di website pelanggan.</p>
        </div>
        
        <button 
          onClick={handleSaveData}
          disabled={isSaving}
          className="group flex items-center gap-2 bg-gradient-to-r from-[#00437a] to-[#005a9e] text-white px-6 py-3.5 text-sm font-bold rounded-xl shadow-[0_8px_20px_rgba(0,67,122,0.25)] hover:shadow-[0_10px_25px_rgba(0,67,122,0.4)] transition-all hover:-translate-y-1 disabled:opacity-70"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save size={18} className="group-hover:scale-110 transition-transform" />
          )}
          {isSaving ? 'Menyimpan...' : 'Simpan Website'}
        </button>
      </div>

      {/* SUB-TABS */}
      <div className="flex gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        <button
          onClick={() => setActiveSubTab('hero')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
            activeSubTab === 'hero'
              ? 'bg-white text-[#00437a] shadow-md border border-gray-100'
              : 'bg-transparent text-gray-500 hover:bg-white hover:shadow-sm'
          }`}
        >
          <LayoutTemplate size={18} className={activeSubTab === 'hero' ? 'text-[#f26e22]' : ''} /> 
          Hero Section (Home)
        </button>
        <button
          onClick={() => setActiveSubTab('company')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${
            activeSubTab === 'company'
              ? 'bg-white text-[#00437a] shadow-md border border-gray-100'
              : 'bg-transparent text-gray-500 hover:bg-white hover:shadow-sm'
          }`}
        >
          <Building2 size={18} className={activeSubTab === 'company' ? 'text-[#f26e22]' : ''} /> 
          Company Section (About)
        </button>
      </div>

      {/* AREA RENDER FORM */}
      <div className="min-h-[500px]">
        {activeSubTab === 'hero' && (
          <WebHeroSection 
            data={heroData} 
            handleChange={handleHeroChange} 
            handleImageUpload={handleHeroImage} 
            handleRemoveImage={handleRemoveHeroImage} 
          />
        )}
        
        {activeSubTab === 'company' && (
          <WebCompanySection 
            data={companyData} 
            handleChange={handleCompanyChange} 
            handleImageUpload={handleCompanyImage} 
            handleRemoveImage={handleRemoveCompanyImage} 
          />
        )}
      </div>

    </div>
  );
}