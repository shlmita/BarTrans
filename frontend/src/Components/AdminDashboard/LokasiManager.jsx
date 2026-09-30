import React, { useState } from 'react';
import { Edit2, Plus, MapPin } from 'lucide-react';
import LokasiFormModal from './LokasiFormModal'; 

const initialLokasi = [
  { id: 1, nama: 'Pool BarTrans Pati', kota: 'Pati', tipe: 'Penjemputan', status: 'Aktif' },
  { id: 2, nama: 'Terminal Jati Kudus', kota: 'Kudus', tipe: 'Penjemputan', status: 'Aktif' },
  { id: 3, nama: 'Terminal Lebak Bulus', kota: 'Jakarta Selatan', tipe: 'Tujuan', status: 'Aktif' },
  { id: 4, nama: 'Bandara Soekarno Hatta', kota: 'Tangerang', tipe: 'Tujuan', status: 'Nonaktif' },
];

export default function LokasiManager() {
  const [lokasiData, setLokasiData] = useState(initialLokasi);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLokasi, setSelectedLokasi] = useState(null);

  const handleAddClick = () => {
    setSelectedLokasi(null); 
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedLokasi(item); 
    setIsModalOpen(true);
  };

  const handleSaveData = (formData) => {
    if (selectedLokasi) {
      setLokasiData(prev => prev.map(item => item.id === formData.id ? formData : item));
    } else {
      setLokasiData(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false); 
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
            <MapPin className="text-[#f26e22]" size={28} /> Titik Jemput & Tujuan
          </h3>
          <p className="text-gray-500 text-sm mt-1 ml-9">Master data lokasi penjemputan dan destinasi armada travel.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="group flex items-center gap-2 bg-gradient-to-r from-[#f26e22] to-[#f58b4c] hover:from-[#d95d1a] hover:to-[#f26e22] text-white px-5 py-3 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#f26e22]/30 hover:-translate-y-0.5"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Tambah Lokasi
        </button>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar pb-4">
        <table className="w-full text-sm text-left border-separate border-spacing-y-3">
          <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="py-2 px-4 font-bold">Nama Lokasi</th>
              <th className="py-2 px-4 font-bold">Kota / Wilayah</th>
              <th className="py-2 px-4 font-bold">Tipe</th>
              <th className="py-2 px-4 font-bold">Status</th>
              <th className="py-2 px-4 text-center font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {lokasiData.map(l => (
              <tr key={l.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl">
                <td className="py-4 px-4 rounded-l-2xl font-bold text-[#00437a]">{l.nama}</td>
                <td className="py-4 px-4 font-medium text-gray-600">{l.kota}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${l.tipe === 'Penjemputan' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {l.tipe}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${l.status === 'Aktif' ? 'text-emerald-600' : 'text-red-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${l.status === 'Aktif' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    {l.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center rounded-r-2xl">
                  <button 
                    onClick={() => handleEditClick(l)} 
                    title="Edit Lokasi"
                    className="p-2 bg-white border border-gray-200 text-[#00437a] rounded-xl hover:bg-[#00437a] hover:text-white transition-all shadow-sm group-hover:shadow-md mx-auto"
                  >
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LokasiFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveData}
        editData={selectedLokasi} 
      />
      
    </div>
  );
}