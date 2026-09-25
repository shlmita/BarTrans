import React, { useState } from 'react';
import { Edit2, Plus, Bus, MapPin, Trash2 } from 'lucide-react';
import TravelFormModal from './TravelFormModal'; 
import LokasiFormModal from './LokasiFormModal'; 
import TravelSubNav from './TravelSubNav';

const initialData = [
  { 
    id: 1, rute: 'Pati - Jakarta (Executive)', unit: 'Toyota Hiace 1', kursiTotal: 10, kursiTersedia: 4, harga: 350000,
    gambar: '', // state awal gambar
    seatMap: Array.from({length: 10}, (_, i) => ({ id: i+1, isReady: i >= 6 }))
  },
];

const initialLokasi = [
  { id: 1, nama: 'Pool BarTrans Pati', kota: 'Pati', tipe: 'Penjemputan', status: 'Aktif' },
  { id: 2, nama: 'Terminal Lebak Bulus', kota: 'Jakarta Selatan', tipe: 'Tujuan', status: 'Aktif' },
];

export default function TravelManager() {
  const [activeSubTab, setActiveSubTab] = useState('armada'); 

  const [travelData, setTravelData] = useState(initialData);
  const [isArmadaModalOpen, setIsArmadaModalOpen] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState(null);

  const [lokasiData, setLokasiData] = useState(initialLokasi);
  const [isLokasiModalOpen, setIsLokasiModalOpen] = useState(false);
  const [selectedLokasi, setSelectedLokasi] = useState(null);

  const handleSaveArmada = (formData) => {
    if (selectedTravel) {
      setTravelData(prev => prev.map(item => item.id === formData.id ? formData : item));
    } else {
      setTravelData(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsArmadaModalOpen(false); 
  };

  const handleAddLokasi = (tipeBawaan) => {
    setSelectedLokasi({ isNewMode: true, tipe: tipeBawaan }); 
    setIsLokasiModalOpen(true);
  };

  const handleSaveLokasi = (formData) => {
    if (formData.id) {
      setLokasiData(prev => prev.map(item => item.id === formData.id ? formData : item));
    } else {
      const { isNewMode, ...dataFix } = formData;
      setLokasiData(prev => [...prev, { ...dataFix, id: Date.now() }]);
    }
    setIsLokasiModalOpen(false); 
  };

  return (
    <div className="space-y-6">
      <TravelSubNav activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />

      {activeSubTab === 'armada' && (
        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
                <Bus className="text-[#f26e22]" size={28} /> Rute & Armada Travel
              </h3>
              <p className="text-gray-500 text-sm mt-1 ml-9">Kelola visualisasi kursi, foto armada, dan harga tiket travel.</p>
            </div>
            <button 
              onClick={() => { setSelectedTravel(null); setIsArmadaModalOpen(true); }}
              className="group flex items-center gap-2 bg-gradient-to-r from-[#f26e22] to-[#f58b4c] text-white px-5 py-3 text-sm font-bold rounded-xl shadow-lg transition-all"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Tambah Armada
            </button>
          </div>
          
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
                {travelData.map(t => {
                  const persentaseKursi = (t.kursiTersedia / t.kursiTotal) * 100;
                  return (
                    <tr key={t.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl">
                      <td className="py-4 px-4 rounded-l-2xl font-bold text-[#00437a]">{t.rute}</td>
                      
                      {/* 🔥 Ditambah Thumbnail Gambar 🔥 */}
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
                      <td className="py-4 px-4 font-bold text-gray-800">Rp {t.harga.toLocaleString('id-ID')}</td>
                      <td className="py-4 px-4 text-center rounded-r-2xl">
                        <button 
                          onClick={() => { setSelectedTravel(t); setIsArmadaModalOpen(true); }}
                          className="p-2 bg-white border border-gray-200 text-[#00437a] rounded-xl hover:bg-[#00437a] hover:text-white transition-all shadow-sm mx-auto"
                        >
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <TravelFormModal 
            isOpen={isArmadaModalOpen}
            onClose={() => setIsArmadaModalOpen(false)}
            onSave={handleSaveArmada}
            editData={selectedTravel} 
          />
        </div>
      )}

      {/* Bagian TAB 2 (Lokasi) tetep sama persis kaya sebelumnya */}
      {activeSubTab === 'lokasi' && (
        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight flex items-center gap-2">
                <MapPin className="text-[#f26e22]" size={28} /> Master Titik Jemput & Tujuan
              </h3>
              <p className="text-gray-500 text-sm mt-1 ml-9">Kelola daftar wilayah penjemputan dan kota destinasi.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAddLokasi('Penjemputan')}
                className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-3 text-sm font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Tambah Jemputan
              </button>
              <button 
                onClick={() => handleAddLokasi('Tujuan')}
                className="group flex items-center gap-2 bg-gradient-to-r from-[#f26e22] to-[#f58b4c] text-white px-5 py-3 text-sm font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Tambah Tujuan
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto pb-4">
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
                        onClick={() => { setSelectedLokasi(l); setIsLokasiModalOpen(true); }}
                        className="p-2 bg-white border border-gray-200 text-[#00437a] rounded-xl hover:bg-[#00437a] hover:text-white transition-all shadow-sm mx-auto"
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
            isOpen={isLokasiModalOpen}
            onClose={() => setIsLokasiModalOpen(false)}
            onSave={handleSaveLokasi}
            editData={selectedLokasi} 
          />
        </div>
      )}
    </div>
  );
}