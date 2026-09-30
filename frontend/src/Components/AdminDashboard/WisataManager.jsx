import React, { useState, useEffect } from 'react';
import { Edit2, Plus, Map, Trash2, MapPin, Clock, Users } from 'lucide-react';
import WisataFormModal from './WisataFormModal';

export default function WisataManager() {
  const [wisataData, setWisataData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWisata, setSelectedWisata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. GET DATA DARI BACKEND
  const fetchWisata = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/wisata');
      const result = await res.json();
      if (result.status === 'success') {
        setWisataData(result.data);
      }
    } catch (err) {
      console.error("Gagal memuat data wisata:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWisata();
  }, []);

  const handleAddClick = () => {
    setSelectedWisata(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    // Petakan kolom backend (tujuan, min_pax) ke state form UI (destinasi, kuota)
    setSelectedWisata({
      ...item,
      destinasi: item.tujuan || '',
      kuota: item.min_pax || ''
    });
    setIsModalOpen(true);
  };

  // 2. DELETE DATA KE BACKEND
  const handleDeleteClick = async (id) => {
    if (!window.confirm('Yakin ingin menghapus paket wisata ini?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/wisata/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.status === 'success') {
        setWisataData(prev => prev.filter(item => item.id !== id));
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  // 3. POST / PUT DATA KE BACKEND
  const handleSaveData = async (formData) => {
    const isEdit = !!selectedWisata;
    const url = isEdit ? `http://localhost:5000/api/wisata/${formData.id}` : 'http://localhost:5000/api/wisata';
    const method = isEdit ? 'PUT' : 'POST';

    // Sesuaikan payload Frontend UI dengan struktur tabel Backend
    const payload = {
      ...formData,
      tujuan: formData.destinasi, // Form UI pakai 'destinasi', DB pakai 'tujuan'
      minPax: formData.kuota      // Form UI pakai 'kuota', DB pakai 'min_pax'
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      
      if (result.status === 'success') {
        fetchWisata(); // Refresh data tabel setelah berhasil simpan
        setIsModalOpen(false);
      } else {
        alert("Gagal menyimpan data: " + result.message);
      }
    } catch (err) {
      console.error("Error save:", err);
      alert("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
            <Map className="text-[#f26e22]" size={28} /> Manajemen Paket Wisata
          </h3>
          <p className="text-gray-500 text-sm mt-1 ml-9">Kelola open trip, private tour, dan promo perjalanan liburan.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="group flex items-center gap-2 bg-gradient-to-r from-[#f26e22] to-[#f58b4c] hover:from-[#d95d1a] hover:to-[#f26e22] text-white px-5 py-3 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#f26e22]/30 hover:-translate-y-0.5"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Tambah Paket
        </button>
      </div>
      
      {/* TABEL DATA */}
      <div className="overflow-x-auto custom-scrollbar pb-4">
        <table className="w-full text-sm text-left border-separate border-spacing-y-3">
          <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-4 font-bold">Nama Paket & Tipe</th>
              <th className="py-2 px-4 font-bold">Destinasi & Durasi</th>
              <th className="py-2 px-4 font-bold">Status & Kuota</th>
              <th className="py-2 px-4 font-bold">Harga / Pax</th>
              <th className="py-2 px-4 text-center font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" className="text-center py-10 text-gray-400 font-bold">Memuat data dari server...</td></tr>
            ) : wisataData.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-10 text-gray-400 font-bold">Belum ada data paket wisata.</td></tr>
            ) : (
              wisataData.map(item => (
                <tr key={item.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl">
                  
                  {/* Kolom 1: Nama, Thumbnail & Tipe */}
                  <td className="py-4 px-4 rounded-l-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-200 border border-gray-300 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                        {item.gambar ? (
                          <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover" />
                        ) : (
                          <Map size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-[#00437a] text-base">{item.nama}</div>
                        <span className={`text-[10px] font-extrabold uppercase mt-1 px-2 py-0.5 rounded flex w-max ${
                          item.tipe === 'Open Trip' ? 'bg-blue-100 text-blue-700' : 
                          item.tipe === 'Private Tour' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {item.tipe || 'Paket Wisata'}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Kolom 2: Destinasi & Durasi */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1.5 text-xs font-medium text-gray-600">
                      {/* Mapping tampilan DB 'tujuan' */}
                      <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#f26e22]"/> {item.tujuan || item.destinasi || '-'}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#00437a]"/> {item.durasi}</span>
                    </div>
                  </td>
                  
                  {/* Kolom 3: Status & Kuota */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold w-max block ${
                        item.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-700' : 
                        item.status === 'Selesai' ? 'bg-gray-200 text-gray-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status || 'Tersedia'}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
                        {/* Mapping tampilan DB 'min_pax' */}
                        <Users size={12} /> Kuota: <span className="text-gray-800">{item.min_pax || item.kuota || 1} Pax</span>
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
                        title="Edit Paket Wisata"
                        className="p-2 bg-white border border-gray-200 text-[#00437a] rounded-xl hover:bg-[#00437a] hover:text-white transition-all shadow-sm group-hover:shadow-md"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(item.id)} 
                        title="Hapus Paket"
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

      <WisataFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveData}
        editData={selectedWisata} 
      />
      
    </div>
  );
}