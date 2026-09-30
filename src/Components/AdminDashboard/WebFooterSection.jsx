import React from 'react';
import { Type, MapPin, Phone, Mail, PanelBottom } from 'lucide-react';

export default function WebFooterSection({ data, handleChange }) {
  return (
    <div className="animate-fade-in w-full max-w-3xl">
      <div className="space-y-5 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <h4 className="font-extrabold text-[#00437a] mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
          <PanelBottom size={20} className="text-[#f26e22]" /> Pengaturan Footer & Kontak
        </h4>

        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Type size={14} className="text-gray-500" /> Deskripsi Perusahaan (Bawah Logo)
          </label>
          <textarea 
            name="desc" rows="3" value={data.desc} onChange={handleChange}
            placeholder="Solusi terpadu untuk segala kebutuhan mobilitas..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all resize-none"
          ></textarea>
        </div>

        <div>
          <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <MapPin size={14} className="text-[#f26e22]" /> Alamat Lengkap
          </label>
          <input 
            type="text" name="address" value={data.address} onChange={handleChange}
            placeholder="Jl. Raya Perjalanan No. 45..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Phone size={14} className="text-[#f26e22]" /> Nomor Telepon / WA
            </label>
            <input 
              type="text" name="phone" value={data.phone} onChange={handleChange}
              placeholder="+62 812-3456-7890"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Mail size={14} className="text-[#f26e22]" /> Email Support
            </label>
            <input 
              type="email" name="email" value={data.email} onChange={handleChange}
              placeholder="support@travelpro.id"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
            />
          </div>
        </div>

      </div>
    </div>
  );
}