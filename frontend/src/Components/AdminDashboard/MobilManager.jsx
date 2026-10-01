import React, { useState, useEffect } from 'react';
import { Edit2, Plus, CarFront, Info, MapPin, Building2, Trash2 } from 'lucide-react';
import MobilFormModal from './MobilFormModal';
import API_URL from '../../config';

export default function MobilManager() {
  const [mobilData, setMobilData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMobil, setSelectedMobil] = useState(null);

  const fetchMobil = async () => {
    try {
      const response = await fetch(`${API_URL}/api/mobil`);
      const result = await response.json();
      if (result.status === 'success') {
        const formattedData = result.data.map(item => ({
          ...item,
          fitur: typeof item.fitur === 'string' ? JSON.parse(item.fitur) : (item.fitur || [])
        }));
        setMobilData(formattedData);
      }
    } catch (error) {
      console.error("Gagal mengambil data dari API:", error);
    }
  };

  useEffect(() => {
    fetchMobil();
  }, []);

  const handleAddClick = () => {
    setSelectedMobil(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedMobil(item);
    setIsModalOpen(true);
  };

  // 🔥 PERUBAHAN: Error handling diperbaiki
  const handleSaveData = async (formData) => {
    try {
      let response;
      if (selectedMobil) {
        response = await fetch(`${API_URL}/api/mobil/${selectedMobil.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch(`${API_URL}/api/mobil`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      const result = await response.json();
      
      if (result.status === 'success') {
        fetchMobil();
        setIsModalOpen(false); // Modal baru tertutup jika benar-benar SUKSES
      } else {
        // Tampilkan pesan error dari backend
        alert("Gagal menyimpan ke database: " + result.message); 
      }
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan jaringan atau server mati!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus armada ini?")) {
      try {
        const response = await fetch(`${API_URL}/api/mobil/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        if (result.status === 'success') fetchMobil();
      } catch (error) {
        console.error("Gagal menghapus data:", error);
      }
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
            <CarFront className="text-[#f26e22]" size={28} /> Manajemen Sewa Mobil
          </h3>
          <p className="text-gray-500 text-sm mt-1 ml-9">Kelola armada mobil, harga sewa, dan spesifikasi kendaraan.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="group flex items-center gap-2 bg-gradient-to-r from-[#f26e22] to-[#f58b4c] hover:from-[#d95d1a] hover:to-[#f26e22] text-white px-5 py-3 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#f26e22]/30 hover:-translate-y-0.5"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Tambah Mobil
        </button>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar pb-4">
        <table className="w-full text-sm text-left border-separate border-spacing-y-3">
          <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-4 font-bold">Unit Mobil & Nopol</th>
              <th className="py-2 px-4 font-bold">Lokasi & Brand</th>
              <th className="py-2 px-4 font-bold">Spesifikasi Singkat</th>
              <th className="py-2 px-4 font-bold">Status & Ready</th>
              <th className="py-2 px-4 font-bold">Harga / Hari</th>
              <th className="py-2 px-4 text-center font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mobilData.map(m => (
              <tr key={m.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl">
                <td className="py-4 px-4 rounded-l-2xl">
                  <div className="flex items-center gap-3">
                    {m.gambar && (
                       <img src={m.gambar} alt={m.unit} className="w-10 h-10 object-cover rounded-lg shadow-sm border border-gray-200" />
                    )}
                    <div>
                      <div className="font-bold text-[#00437a] text-base">{m.unit}</div>
                      <div className="text-gray-500 font-mono text-xs mt-0.5 bg-gray-200 inline-block px-2 py-0.5 rounded">
                        {m.nopol}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#f26e22]" /> {m.lokasi || '-'}
                    </span>
                    {m.brand && (
                      <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1.5 bg-white border border-gray-200 px-2 py-0.5 rounded-md w-max shadow-sm">
                        <Building2 size={12} className="text-[#00437a]" /> {m.brand}
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <Info size={12} className="text-blue-500" /> {m.kondisi}
                    </span>
                    <span className="text-[10px] text-gray-400 truncate max-w-[150px]">
                      {m.fitur && m.fitur.length > 0 ? m.fitur.join(', ') : 'Tanpa fitur khusus'}
                    </span>
                  </div>
                </td>
                
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      m.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-700' : 
                      m.status === 'Disewa' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {m.status}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                      Ready: <span className="text-gray-800">{m.tglReady}</span>
                    </span>
                  </div>
                </td>
                
                <td className="py-4 px-4 font-bold text-gray-800">
                  Rp {Number(m.harga || 0).toLocaleString('id-ID')}
                </td>
                
                <td className="py-4 px-4 text-center rounded-r-2xl">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleEditClick(m)} 
                      title="Edit Unit"
                      className="p-2 bg-white border border-gray-200 text-[#00437a] rounded-xl hover:bg-[#00437a] hover:text-white transition-all shadow-sm group-hover:shadow-md"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(m.id)} 
                      title="Hapus Unit"
                      className="p-2 bg-white border border-gray-200 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm group-hover:shadow-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {mobilData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                    <CarFront size={40} className="text-gray-300 opacity-50" />
                    <p className="font-medium">Belum ada armada mobil yang terdaftar.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <MobilFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveData}
        editData={selectedMobil} 
      />
      
    </div>
  );
}