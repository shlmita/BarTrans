import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Eye, EyeOff, Trash2, Star, User } from 'lucide-react';
import axios from 'axios';
import API_URL from '../../config';

export default function ReviewManager() {
  const [testimoni, setTestimoni] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const fetchTestimoni = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/api/testimoni`);
      setTestimoni(res.data);
    } catch (error) {
      console.error("Gagal mengambil data testimoni:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/testimoni/${id}/status`, { status: newStatus });
      fetchTestimoni();
    } catch (error) {
      alert("Gagal mengupdate status ulasan.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus ulasan ini secara permanen?")) {
      try {
        await axios.delete(`${API_URL}/api/testimoni/${id}`);
        setTestimoni(prev => prev.filter(t => t.id !== id));
      } catch (error) {
        alert("Gagal menghapus ulasan.");
      }
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
            <MessageSquareHeart className="text-[#f26e22]" size={28} /> Kelola Ulasan
          </h3>
          <p className="text-gray-500 text-sm mt-1 ml-9">Sembunyikan ulasan yang mengandung kata kotor / spam.</p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10 text-[#00437a] font-bold">Memuat data ulasan...</div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-sm text-left border-separate border-spacing-y-3">
            <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="py-2 px-4 font-bold">Pengguna & Layanan</th>
                <th className="py-2 px-4 font-bold">Rating</th>
                <th className="py-2 px-4 font-bold max-w-xs">Komentar</th>
                <th className="py-2 px-4 text-center font-bold">Status Beranda</th>
                <th className="py-2 px-4 text-center font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {testimoni.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400 italic bg-gray-50 rounded-xl">Belum ada ulasan masuk.</td>
                </tr>
              ) : (
                testimoni.map(t => (
                  <tr key={t.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl">
                    <td className="py-4 px-4 rounded-l-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                          {t.gambar ? <img src={t.gambar} alt={t.nama} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center bg-blue-100 text-[#00437a]"><User size={20}/></div>}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#00437a]">{t.nama}</span>
                          <span className="text-xs text-gray-500 font-medium">{t.layanan} • {t.role || 'User'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex text-yellow-400">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 italic text-xs max-w-xs truncate" title={t.comment}>
                      "{t.comment}"
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        t.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {t.status === 'Approved' ? 'Tampil' : 'Disembunyikan'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center rounded-r-2xl">
                      <div className="flex items-center justify-center gap-2">
                        {t.status !== 'Approved' && (
                          <button onClick={() => handleUpdateStatus(t.id, 'Approved')} title="Tampilkan" className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                            <Eye size={16} />
                          </button>
                        )}
                        {t.status === 'Approved' && (
                          <button onClick={() => handleUpdateStatus(t.id, 'Rejected')} title="Sembunyikan" className="p-2 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-sm">
                            <EyeOff size={16} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(t.id)} title="Hapus Permanen" className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}