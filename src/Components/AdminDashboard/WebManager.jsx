import React, { useState, useEffect } from 'react';
import { Globe, LayoutTemplate, Building2, PanelBottom, Save } from 'lucide-react';
import WebHeroSection from './WebHeroSection';
import WebCompanySection from './WebCompanySection';
import WebFooterSection from './WebFooterSection'; // Komponen baru yang akan kita buat

export default function WebManager() {
  const [activeSubTab, setActiveSubTab] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    badge: "", heading1: "", heading2: "", subtext: "", btnText: "", gambar: ""
  });

  const [companyData, setCompanyData] = useState({
    heading1: "", heading2: "", subtext: "", stat1Value: "", stat1Label: "", stat2Value: "", stat2Label: "", gambar: ""
  });

  const [footerData, setFooterData] = useState({
    desc: "", address: "", phone: "", email: ""
  });

  // Fetch Data dari API saat pertama dimuat
  useEffect(() => {
    fetch('http://localhost:5000/api/web-settings')
      .then(res => res.json())
      .then(result => {
        if (result.status === 'success' && result.data) {
          const d = result.data;
          setHeroData({
            badge: d.hero_badge || '', heading1: d.hero_heading1 || '', heading2: d.hero_heading2 || '',
            subtext: d.hero_subtext || '', btnText: d.hero_btnText || '', gambar: d.hero_gambar || ''
          });
          setCompanyData({
            heading1: d.company_heading1 || '', heading2: d.company_heading2 || '', subtext: d.company_subtext || '',
            stat1Value: d.company_stat1Value || '', stat1Label: d.company_stat1Label || '',
            stat2Value: d.company_stat2Value || '', stat2Label: d.company_stat2Label || '', gambar: d.company_gambar || ''
          });
          setFooterData({
            desc: d.footer_desc || '', address: d.footer_address || '', phone: d.footer_phone || '', email: d.footer_email || ''
          });
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Handlers
  const handleHeroChange = (e) => setHeroData({ ...heroData, [e.target.name]: e.target.value });
  const handleCompanyChange = (e) => setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  const handleFooterChange = (e) => setFooterData({ ...footerData, [e.target.name]: e.target.value });

  const processImage = (file, setter) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(prev => ({ ...prev, gambar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImage = (e) => processImage(e.target.files[0], setHeroData);
  const handleRemoveHeroImage = () => setHeroData({ ...heroData, gambar: '' });
  const handleCompanyImage = (e) => processImage(e.target.files[0], setCompanyData);
  const handleRemoveCompanyImage = () => setCompanyData({ ...companyData, gambar: '' });

  const handleSaveData = async () => {
    setIsSaving(true);
    const payload = {
      hero_badge: heroData.badge, hero_heading1: heroData.heading1, hero_heading2: heroData.heading2, hero_subtext: heroData.subtext, hero_btnText: heroData.btnText, hero_gambar: heroData.gambar,
      company_heading1: companyData.heading1, company_heading2: companyData.heading2, company_subtext: companyData.subtext, company_stat1Value: companyData.stat1Value, company_stat1Label: companyData.stat1Label, company_stat2Value: companyData.stat2Value, company_stat2Label: companyData.stat2Label, company_gambar: companyData.gambar,
      footer_desc: footerData.desc, footer_address: footerData.address, footer_phone: footerData.phone, footer_email: footerData.email
    };

    try {
      const res = await fetch('http://localhost:5000/api/web-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if(data.status === 'success') alert('Data Website berhasil diperbarui ke server!');
    } catch (error) {
      alert('Gagal menyimpan data.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Memuat Data Website...</div>;

  return (
    <div className="relative">
      {/* HEADER */}
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
          {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={18} className="group-hover:scale-110 transition-transform" />}
          {isSaving ? 'Menyimpan...' : 'Simpan Website'}
        </button>
      </div>

      {/* SUB-TABS */}
      <div className="flex gap-2 sm:gap-4 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        <button onClick={() => setActiveSubTab('hero')} className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${activeSubTab === 'hero' ? 'bg-white text-[#00437a] shadow-md border border-gray-100' : 'bg-transparent text-gray-500 hover:bg-white hover:shadow-sm'}`}>
          <LayoutTemplate size={18} className={activeSubTab === 'hero' ? 'text-[#f26e22]' : ''} /> Hero Section
        </button>
        <button onClick={() => setActiveSubTab('company')} className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${activeSubTab === 'company' ? 'bg-white text-[#00437a] shadow-md border border-gray-100' : 'bg-transparent text-gray-500 hover:bg-white hover:shadow-sm'}`}>
          <Building2 size={18} className={activeSubTab === 'company' ? 'text-[#f26e22]' : ''} /> About Section
        </button>
        <button onClick={() => setActiveSubTab('footer')} className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${activeSubTab === 'footer' ? 'bg-white text-[#00437a] shadow-md border border-gray-100' : 'bg-transparent text-gray-500 hover:bg-white hover:shadow-sm'}`}>
          <PanelBottom size={18} className={activeSubTab === 'footer' ? 'text-[#f26e22]' : ''} /> Footer & Kontak
        </button>
      </div>

      {/* RENDER FORM */}
      <div className="min-h-[500px]">
        {activeSubTab === 'hero' && <WebHeroSection data={heroData} handleChange={handleHeroChange} handleImageUpload={handleHeroImage} handleRemoveImage={handleRemoveHeroImage} />}
        {activeSubTab === 'company' && <WebCompanySection data={companyData} handleChange={handleCompanyChange} handleImageUpload={handleCompanyImage} handleRemoveImage={handleRemoveCompanyImage} />}
        {activeSubTab === 'footer' && <WebFooterSection data={footerData} handleChange={handleFooterChange} />}
      </div>
    </div>
  );
}