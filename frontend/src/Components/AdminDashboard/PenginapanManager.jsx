import React, { useState, useEffect } from 'react';
import { Edit2, Plus, Hotel, Trash2, Home, Bed, Info } from 'lucide-react';
import axios from 'axios';
import PenginapanFormModal from './PenginapanFormModal'; // Sesuaikan path jika berbeda
import API_URL from '../../config';

export default function PenginapanManager() {
  const [inapData, setInapData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInap, setSelectedInap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch data dari MySQL saat komponen pertama kali dimuat
  useEffect(() => {
    fetchPenginapan();
  }, []);

  const fetchPenginapan = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/api/penginapan`);
      
      // Parse kolom 'fasilitas' yang tersimpan sebagai string JSON di database kembali menjadi Array
      const formattedData = response.data.map(item => ({
        ...item,
        fasilitas: typeof item.fasilitas === 'string' ? JSON.parse(item.fasilitas) : (item.fasilitas || [])
      }));
      
      setInapData(formattedData);
    } catch (error) {
      console.error("Gagal mengambil data penginapan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedInap(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedInap(item);
    setIsModalOpen(true);
  };

  // 2. Hapus data ke Backend
  const handleDeleteClick = async (id) => {
    if (window.confirm('Yakin ingin menghapus data penginapan ini?')) {
      try {
        await axios.delete(`${API_URL}/api/penginapan/${id}`);
        // Hapus dari state lokal agar UI langsung update tanpa perlu reload
        setInapData(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        alert("Gagal menghapus data penginapan.");
        console.error(error);
      }
    }
  };

  // 3. Simpan data (Tambah Baru / Update) ke Backend
  const handleSaveData = async (formData) => {
    try {
      // Jadikan array fasilitas menjadi string sebelum dikirim ke MySQL
      const payload = {
        ...formData,
        fasilitas: JSON.stringify(formData.fasilitas)
      };

      if (selectedInap) {
        // UPDATE (PUT)
        await axios.put(`${API_URL}/api/penginapan/${formData.id}`, payload);
      } else {
        // CREATE (POST)
        await axios.post(`${API_URL}/api/penginapan`, payload);
      }
      
      fetchPenginapan(); // Tarik ulang data terbaru dari database
      setIsModalOpen(false);
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
            <Hotel className="text-[#f26e22]" size={28} /> Manajemen Penginapan & Villa
          </h3>
          <p className="text-gray-500 text-sm mt-1 ml-9">Kelola reservasi kamar hotel, persewaan villa, dan fasilitas.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="group flex items-center gap-2 bg-gradient-to-r from-[#f26e22] to-[#f58b4c] hover:from-[#d95d1a] hover:to-[#f26e22] text-white px-5 py-3 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#f26e22]/30 hover:-translate-y-0.5"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Tambah Unit
        </button>
      </div>
      
      {/* TABEL DATA */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20 text-[#00437a] font-bold">
          Mengambil data penginapan...
        </div>
      ) : (
        <div className="overflow-x-auto custom-scrollbar pb-4">
          <table className="w-full text-sm text-left border-separate border-spacing-y-3">
            <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="py-2 px-4 font-bold">Nama Unit & Tipe</th>
                <th className="py-2 px-4 font-bold">Detail Ruangan</th>
                <th className="py-2 px-4 font-bold">Status & Fasilitas</th>
                <th className="py-2 px-4 font-bold">Tarif / Malam</th>
                <th className="py-2 px-4 text-center font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {inapData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400 italic bg-gray-50 rounded-xl">
                    Belum ada data penginapan/villa.
                  </td>
                </tr>
              ) : (
                inapData.map(item => (
                  <tr key={item.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl">
                    
                    {/* Kolom 1: Nama, Thumbnail & Tipe */}
                    <td className="py-4 px-4 rounded-l-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-200 border border-gray-300 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                          {item.gambar ? (
                            <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover" />
                          ) : (
                            item.tipe === 'Villa' ? <Home size={20} className="text-gray-400" /> : <Bed size={20} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-[#00437a] text-base">{item.nama}</div>
                          <span className={`text-[10px] font-extrabold uppercase mt-1 px-2 py-0.5 rounded flex w-max ${
                            item.tipe === 'Villa' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item.tipe}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Kolom 2: Detail Dinamis (Kamar Hotel vs Villa) */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 text-xs font-medium text-gray-600">
                        {item.tipe === 'Kamar Hotel' ? (
                          <>
                            <span className="flex items-center gap-1.5"><Bed size={12} className="text-[#00437a]"/> No. Kamar: <span className="font-bold text-gray-800">{item.noKamar}</span></span>
                            <span className="flex items-center gap-1.5"><Hotel size={12} className="text-[#f26e22]"/> Lantai: <span className="font-bold text-gray-800">{item.lantai}</span></span>
                          </>
                        ) : (
                          <>
                            <span className="flex items-center gap-1.5"><Home size={12} className="text-[#00437a]"/> Total: <span className="font-bold text-gray-800">{item.jmlKamarTidur} Kamar</span></span>
                            <span className="flex items-center gap-1.5"><Info size={12} className="text-[#f26e22]"/> Kapasitas: <span className="font-bold text-gray-800">{item.kapasitas} Org</span></span>
                          </>
                        )}
                      </div>
                    </td>
                    
                    {/* Kolom 3: Status & Checklist Fasilitas */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold w-max block ${
                          item.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-700' : 
                          item.status === 'Disewa' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-[10px] text-gray-400 truncate max-w-[150px]" title={item.fasilitas?.join(', ')}>
                          {item.fasilitas?.length > 0 ? item.fasilitas.join(', ') : 'Tanpa fasilitas'}
                        </span>
                      </div>
                    </td>
                    
                    {/* Kolom 4: Harga */}
                    <td className="py-4 px-4 font-bold text-gray-800">
                      Rp {Number(item.harga).toLocaleString('id-ID')}
                    </td>
                    
                    {/* Kolom 5: Aksi (Edit & Hapus) */}
                    <td className="py-4 px-4 text-center rounded-r-2xl">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEditClick(item)} 
                          title="Edit Penginapan"
                          className="p-2 bg-white border border-gray-200 text-[#00437a] rounded-xl hover:bg-[#00437a] hover:text-white transition-all shadow-sm group-hover:shadow-md"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(item.id)} 
                          title="Hapus Unit"
                          className="p-2 bg-white border border-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm group-hover:shadow-md"
                        >
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

      <PenginapanFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveData}
        editData={selectedInap} 
      />
      
    </div>
  );
}