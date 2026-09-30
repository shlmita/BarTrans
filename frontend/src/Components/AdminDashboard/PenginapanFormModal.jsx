import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import PenginapanFormFields from './PenginapanFormFields.';
import PenginapanChecklist from './PenginapanChecklist';
import PenginapanImageUpload from './PenginapanImageUpload';

export default function PenginapanFormModal({ isOpen, onClose, onSave, editData }) {
  const initialState = {
    nama: '', tipe: 'Kamar Hotel', noKamar: '', lantai: '', jmlKamarTidur: '', kapasitas: '',
    harga: 0, status: 'Tersedia', deskripsi: '', fasilitas: [], gambar: ''
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editData) {
      setFormData({ ...initialState, ...editData, fasilitas: editData.fasilitas || [] });
    } else {
      setFormData(initialState);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (fiturName) => {
    setFormData(prev => {
      const isExist = prev.fasilitas.includes(fiturName);
      if (isExist) {
        return { ...prev, fasilitas: prev.fasilitas.filter(f => f !== fiturName) };
      } else {
        return { ...prev, fasilitas: [...prev.fasilitas, fiturName] };
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, gambar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => setFormData(prev => ({ ...prev, gambar: '' }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, harga: Number(formData.harga) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00437a]/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl relative border border-white/50 overflow-hidden flex flex-col max-h-[95vh]">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f8f9fa] shrink-0">
          <div>
            <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight">
              {editData ? 'Edit Data Penginapan' : 'Tambah Penginapan Baru'}
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">Kelola tipe, nomor kamar, fasilitas, dan sewa villa.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-100 shadow-sm rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
          <div className="p-6 md:p-8 space-y-5 overflow-y-auto custom-scrollbar bg-white">
            <PenginapanImageUpload 
              gambar={formData.gambar} onUpload={handleImageUpload} onRemove={handleRemoveImage}
            />
            <PenginapanFormFields formData={formData} handleChange={handleChange} />
            <PenginapanChecklist fasilitasTerpilih={formData.fasilitas} handleFeatureToggle={handleFeatureToggle} />
          </div>

          <div className="p-5 border-t border-gray-100 bg-[#f8f9fa] flex justify-end gap-3 shrink-0">
            <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all">
              Batal
            </button>
            <button type="submit" className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#00437a] to-[#005a9e] hover:from-[#003057] hover:to-[#00437a] rounded-xl transition-all shadow-lg hover:shadow-[#00437a]/30 flex items-center gap-2">
              <Save size={18} /> {editData ? 'Simpan Perubahan' : 'Tambahkan Unit'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}