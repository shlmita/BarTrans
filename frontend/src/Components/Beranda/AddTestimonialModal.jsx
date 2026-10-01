import React, { useState } from 'react';
import { X, Star, User, Briefcase, MessageSquare, ImagePlus, Tag, CheckCircle } from 'lucide-react';
import axios from 'axios';
import API_URL from '../../config';

export default function AddTestimoniModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nama: '', role: '', layanan: 'Travel Reguler', rating: 5, comment: '', gambar: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // 🔥 STATE BARU UNTUK TAMPILAN SUKSES

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, gambar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/api/testimoni`, formData);
      // 🔥 HAPUS ALERT JADUL, GANTI JADI TAMPILAN SUKSES 🔥
      setIsSuccess(true);
      setFormData({ nama: '', role: '', layanan: 'Travel Reguler', rating: 5, comment: '', gambar: '' });
    } catch (error) {
      alert('Gagal mengirim ulasan. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAndReset = () => {
    setIsSuccess(false);
    onClose();
  };

  // 🔥 TAMPILAN JIKA BERHASIL KIRIM ULASAN 🔥
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={handleCloseAndReset}></div>
        <div className="bg-white border border-gray-200 rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
             <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-[#00437a] mb-2">Ulasan Terkirim!</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Terima kasih! Ulasan Anda berhasil dikirim dan akan langsung tampil di beranda kami.
          </p>
          <button 
            onClick={handleCloseAndReset} 
            className="w-full py-3.5 bg-gradient-to-r from-[#00437a] to-[#005a9e] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-[#00437a]/30 hover:-translate-y-0.5"
          >
             Selesai
          </button>
        </div>
      </div>
    );
  }

  // TAMPILAN FORM NORMAL
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={handleCloseAndReset}></div>

      <div className="bg-white border border-gray-200 rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f8f9fa] shrink-0">
          <div>
            <h3 className="font-extrabold text-xl text-[#00437a] tracking-tight">Tulis Ulasan</h3>
            <p className="text-gray-500 text-xs mt-0.5">Bagikan pengalaman liburan atau sewa armada Anda.</p>
          </div>
          <button onClick={handleCloseAndReset} className="p-2 text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-100 shadow-sm rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5">
          <div className="flex flex-col items-center justify-center mb-2">
            <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">Penilaian Anda</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star} type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="transition-transform hover:scale-125"
                >
                  <Star size={32} className={`${(hoverRating || formData.rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} transition-colors`} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <User size={14} className="text-[#00437a]" /> Nama Lengkap
              </label>
              <input type="text" name="nama" required value={formData.nama} onChange={handleChange} placeholder="Contoh: Budi Santoso"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Briefcase size={14} className="text-[#f26e22]" /> Pekerjaan / Peran
                </label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Contoh: Traveler"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all" />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Tag size={14} className="text-emerald-500" /> Jasa yang Digunakan
                </label>
                <select name="layanan" value={formData.layanan} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all font-bold cursor-pointer text-[#00437a]">
                  <option value="Travel">Travel Reguler</option>
                  <option value="Sewa Mobil">Sewa Mobil</option>
                  <option value="Jasa Angkut">Jasa Angkut Truk</option>
                  <option value="Paket Wisata">Paket Wisata</option>
                  <option value="Penginapan">Penginapan / Villa</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <MessageSquare size={14} className="text-[#00437a]" /> Komentar / Ulasan
              </label>
              <textarea name="comment" required rows="3" value={formData.comment} onChange={handleChange} placeholder="Ceritakan pengalaman Anda di sini..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#00437a] outline-none transition-all resize-none custom-scrollbar" />
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <ImagePlus size={14} className="text-gray-400" /> Foto Profil <span className="text-gray-400 normal-case lowercase font-medium">(Opsional)</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                  {formData.gambar ? <img src={formData.gambar} alt="Preview" className="w-full h-full object-cover" /> : <User size={20} className="text-gray-400" />}
                </div>
                <label className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 cursor-pointer transition-all shadow-sm">
                  Pilih Foto
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>
          </div>
          
          <button type="submit" disabled={isLoading} className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#00437a] to-[#005a9e] text-white font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-[#00437a]/30 hover:-translate-y-0.5 disabled:opacity-50">
            {isLoading ? 'Mengirim...' : 'Kirim Ulasan'}
          </button>
        </form>
      </div>
    </div>
  );
}