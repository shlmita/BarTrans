import React, { useState, useEffect } from 'react';
import { Edit2, Plus, Bus, Trash2 } from 'lucide-react';
import axios from 'axios';
import TravelFormModal from './TravelFormModal'; 
import API_URL from '../../config';

export default function TravelManager() {
  const [travelData, setTravelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState(null);

  // FETCH DATA DARI DATABASE SAAT HALAMAN DIBUKA
  useEffect(() => {
    fetchTravel();
  }, []);

  const fetchTravel = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/api/travel`);
      
      const formattedData = response.data.map(item => ({
        ...item,
        seatMap: typeof item.seatMap === 'string' ? JSON.parse(item.seatMap) : (item.seatMap || [])
      }));
      
      setTravelData(formattedData);
    } catch (error) {
      console.error("Gagal mengambil data travel:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // FUNGSI SIMPAN & UPDATE KE MYSQL
  const handleSaveArmada = async (formData) => {
    try {
      const payload = {
        ...formData,
        seatMap: JSON.stringify(formData.seatMap) 
      };

      if (selectedTravel) {
        await axios.put(`${API_URL}/api/travel/${formData.id}`, payload);
      } else {
        await axios.post(`${API_URL}/api/travel`, payload);
      }
      
      fetchTravel(); 
      setIsModalOpen(false); 
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      alert(`🚨 GAGAL MENYIMPAN!\n\nPesan Error: ${errMsg}`);
    }
  };

  // FUNGSI HAPUS DARI MYSQL
  const handleDeleteArmada = async (id) => {
    if (window.confirm('Yakin ingin menghapus rute armada ini?')) {
      try {
        await axios.delete(`${API_URL}/api/travel/${id}`);
        setTravelData(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        alert("Gagal menghapus data.");
      }
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
            <Bus className="text-[#f26e22]" size={28} /> Manajemen Armada Travel
          </h3>
          <p className="text-gray-500 text-sm mt-1 ml-9">Kelola trayek, foto armada, ketersediaan kursi, dan harga tiket.</p>
        </div>
        <button 
          onClick={() => { setSelectedTravel(null); setIsModalOpen(true); }}
          className="group flex items-center gap-2 bg-gradient-to-r from-[#f26e22] to-[#f58b4c] hover:from-[#d95d1a] hover:to-[#f26e22] text-white px-5 py-3 text-sm font-bold rounded-xl shadow-lg transition-all"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Tambah Armada
        </button>
      </div>
      
      {/* TABEL DATA TRAVEL */}
      {isLoading ? (
        <div className="text-center py-10 text-[#00437a] font-bold">Memuat data armada travel...</div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-sm text-left border-separate border-spacing-y-3">
            <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="py-2 px-4 font-bold">Trayek / Rute</th>
                <th className="py-2 px-4 font-bold">Armada & Unit</th>
                <th className="py-2 px-4 font-bold">Ketersediaan Kursi</th>
                <th className="py-2 px-4 font-bold">Harga Tiket</th>
                <th className="py-2 px-4 text-center font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {travelData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400 italic bg-gray-50 rounded-xl">Belum ada armada travel.</td>
                </tr>
              ) : (
                travelData.map(t => {
                  const persentaseKursi = (t.kursiTersedia / t.kursiTotal) * 100;
                  return (
                    <tr key={t.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl">
                      <td className="py-4 px-4 rounded-l-2xl font-bold text-[#00437a]">{t.rute}</td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-200 border border-gray-300 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                            {t.gambar ? (
                              <img src={t.gambar} alt={t.unit} className="w-full h-full object-cover" />
                            ) : (
                              <Bus size={18} className="text-gray-400" />
                            )}
                          </div>
                          <span className="font-medium text-gray-600">{t.unit}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1.5 pr-8">
                          <div className="flex justify-between text-xs font-extrabold text-emerald-600">
                            <span>{t.kursiTersedia} Tersedia</span>
                            <span className="text-gray-400 font-medium">dari {t.kursiTotal}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${persentaseKursi}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-800">Rp {Number(t.harga).toLocaleString('id-ID')}</td>
                      
                      <td className="py-4 px-4 text-center rounded-r-2xl">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => { setSelectedTravel(t); setIsModalOpen(true); }}
                            title="Edit Armada"
                            className="p-2 bg-white border border-gray-200 text-[#00437a] rounded-xl hover:bg-[#00437a] hover:text-white transition-all shadow-sm"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteArmada(t.id)}
                            title="Hapus Armada"
                            className="p-2 bg-white border border-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL FORM TRAVEL */}
      <TravelFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveArmada}
        editData={selectedTravel} 
      />
    </div>
  );
}