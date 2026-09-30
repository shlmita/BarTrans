import React, { useState, useEffect } from 'react';
import { X, Save, MapPin, Building, Target, Activity } from 'lucide-react';

export default function LokasiFormModal({ isOpen, onClose, onSave, editData }) {
  const [formData, setFormData] = useState({
    nama: '', kota: '', tipe: 'Penjemputan', status: 'Aktif'
  });

  useEffect(() => {
    if (editData) {
      // Cek apakah ini mode "Tambah Baru" tapi bawa default tipe dari tombol luar
      if (editData.isNewMode) {
        setFormData({ nama: '', kota: '', tipe: editData.tipe, status: 'Aktif' });
      } else {
        // Mode Edit asli
        setFormData(editData);
      }
    } else {
      setFormData({ nama: '', kota: '', tipe: 'Penjemputan', status: 'Aktif' });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isEditMode = editData && !editData.isNewMode;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00437a]/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl relative border border-white/50 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f8f9fa]">
          <div>
            <h3 className="font-extrabold text-xl text-[#00437a] tracking-tight">
              {isEditMode ? 'Edit Lokasi Travel' : 'Tambah Lokasi Baru'}
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">Kelola titik penjemputan dan destinasi tujuan.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-100 shadow-sm rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 bg-white">
          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <MapPin size={14} className="text-[#f26e22]" /> Nama Lokasi (Titik)
            </label>
            <input 
              type="text" name="nama" required 
              value={formData.nama} onChange={handleChange}
              placeholder="Contoh: Terminal Pati / Pool BarTrans"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Building size={14} className="text-[#00437a]" /> Kota / Wilayah
            </label>
            <input 
              type="text" name="kota" required 
              value={formData.kota} onChange={handleChange}
              placeholder="Contoh: Jakarta Selatan"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Target size={14} className="text-gray-400" /> Tipe Lokasi
              </label>
              <select 
                name="tipe" value={formData.tipe} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all font-semibold cursor-pointer"
              >
                <option value="Penjemputan">Penjemputan (Asal)</option>
                <option value="Tujuan">Destinasi (Tujuan)</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Activity size={14} className={formData.status === 'Aktif' ? 'text-emerald-500' : 'text-red-500'} /> Status Operasional
              </label>
              <select 
                name="status" value={formData.status} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all font-semibold cursor-pointer"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>

          <div className="pt-4 mt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
              Batal
            </button>
            <button type="submit" className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#00437a] to-[#005a9e] hover:from-[#003057] hover:to-[#00437a] rounded-xl transition-all shadow-lg hover:shadow-[#00437a]/30 flex items-center gap-2">
              <Save size={18} /> Simpan Data
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}