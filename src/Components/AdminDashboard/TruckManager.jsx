import React, { useState, useEffect } from 'react';
import { Edit2, Plus, Truck, Trash2 } from 'lucide-react';
import TrukFormModal from './TrukFormModal';

export default function TrukManager() {
  const [trukData, setTrukData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTruk, setSelectedTruk] = useState(null);

  // Sesuaikan dengan port backend Node.js kamu (contoh port 5000)
  const API_URL = 'http://localhost:5000/api/truk';

  // Fetch Data dari Node.js API
  const fetchTruk = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      if (result.status === 'success') {
        setTrukData(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTruk();
  }, []);

  const handleAddClick = () => {
    setSelectedTruk(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedTruk(item);
    setIsModalOpen(true);
  };

  // 🔥 DELETE DATA KE NODE.JS API 🔥
  const handleDeleteClick = async (id) => {
    if (window.confirm('Yakin ingin menghapus armada truk ini?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.status === 'success') {
          fetchTruk(); // Refresh data dari DB
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  // 🔥 SIMPAN/EDIT DATA KE NODE.JS API 🔥
  const handleSaveData = async (formData) => {
    try {
      const isEdit = !!formData.id;
      const url = isEdit ? `${API_URL}/${formData.id}` : API_URL;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      
      if (result.status === 'success') {
        fetchTruk(); // Refresh data dari DB
        setIsModalOpen(false);
      } else {
        alert('Gagal menyimpan data armada');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
            <Truck className="text-[#f26e22]" size={28} /> Manajemen Armada Jasa Angkut
          </h3>
          <p className="text-gray-500 text-sm mt-1 ml-9">Kelola daftar truk, kapasitas muatan, dan tarif dasar logistik.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="group flex items-center gap-2 bg-gradient-to-r from-[#f26e22] to-[#f58b4c] hover:from-[#d95d1a] hover:to-[#f26e22] text-white px-5 py-3 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#f26e22]/30 hover:-translate-y-0.5"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Tambah Armada
        </button>
      </div>
      
      {/* TABEL DATA */}
      <div className="overflow-x-auto custom-scrollbar pb-4">
        <table className="w-full text-sm text-left border-separate border-spacing-y-3">
          <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-4 font-bold">Jenis Truk & Nopol</th>
              <th className="py-2 px-4 font-bold">Spesifikasi Muatan</th>
              <th className="py-2 px-4 font-bold">Status</th>
              <th className="py-2 px-4 font-bold">Tarif Dasar / KM</th>
              <th className="py-2 px-4 text-center font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {trukData.map(t => (
              <tr key={t.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl">
                
                {/* Kolom 1: Unit & Nopol */}
                <td className="py-4 px-4 rounded-l-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 border border-gray-300 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                      {t.gambar ? (
                        <img src={t.gambar} alt={t.jenis} className="w-full h-full object-cover" />
                      ) : (
                        <Truck size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-[#00437a] text-base">{t.jenis}</div>
                      <div className="text-gray-500 font-mono text-xs mt-0.5 bg-white border border-gray-200 shadow-sm inline-block px-2 py-0.5 rounded">
                        {t.nopol}
                      </div>
                    </div>
                  </div>
                </td>
                
                {/* Kolom 2: Muatan */}
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1.5 text-xs text-gray-600 font-medium">
                    <span>Maks: <span className="font-bold text-gray-800">{t.kapasitas}</span></span>
                    <span>Vol: <span className="font-bold text-gray-800">{t.volume}</span></span>
                  </div>
                </td>
                
                {/* Kolom 3: Status */}
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold w-max block ${
                    t.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-700' : 
                    t.status === 'Jalan' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {t.status}
                  </span>
                </td>
                
                {/* Kolom 4: Tarif */}
                <td className="py-4 px-4 font-bold text-gray-800">
                  Rp {Number(t.tarif).toLocaleString('id-ID')}
                </td>
                
                {/* Kolom 5: Aksi (Edit & Hapus) */}
                <td className="py-4 px-4 text-center rounded-r-2xl">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleEditClick(t)} 
                      title="Edit Armada"
                      className="p-2 bg-white border border-gray-200 text-[#00437a] rounded-xl hover:bg-[#00437a] hover:text-white transition-all shadow-sm group-hover:shadow-md"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(t.id)} 
                      title="Hapus Armada"
                      className="p-2 bg-white border border-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm group-hover:shadow-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}

            {trukData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                    <Truck size={40} className="text-gray-300 opacity-50" />
                    <p className="font-medium">Belum ada armada truk yang terdaftar.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TrukFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveData}
        editData={selectedTruk} 
      />
      
    </div>
  );
}