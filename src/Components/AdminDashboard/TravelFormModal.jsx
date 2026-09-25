import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import SeatEditor from './SeatEditor'; 
import TravelFormFields from './TravelFormFields';
import TravelChecklist from './TravelChecklist';
import TravelImageUpload from './TravelImageUpload'; // 🔥 Import komponen gambar

export default function TravelFormModal({ isOpen, onClose, onSave, editData }) {
  const [formData, setFormData] = useState({ 
    asal: '', tujuan: '', unit: '', kursiTotal: 10, harga: 0, gambar: '' 
  });
  const [seats, setSeats] = useState([]);

  const generateSeats = (total, available) => {
    const newSeats = Array.from({ length: total }, (_, i) => ({
      id: i + 1, isReady: i < available 
    }));
    setSeats(newSeats);
  };

  useEffect(() => {
    if (editData) {
      const ruteParts = editData.rute ? editData.rute.split(' - ') : ['', ''];
      setFormData({
        asal: ruteParts[0] || '',
        tujuan: ruteParts[1] || '',
        unit: editData.unit,
        kursiTotal: editData.kursiTotal,
        harga: editData.harga,
        gambar: editData.gambar || '' // 🔥 Set gambar kalau lagi edit
      });
      if (editData.seatMap && editData.seatMap.length === editData.kursiTotal) {
        setSeats(editData.seatMap);
      } else {
        generateSeats(editData.kursiTotal, editData.kursiTersedia);
      }
    } else {
      setFormData({ asal: '', tujuan: '', unit: '', kursiTotal: 10, harga: 0, gambar: '' });
      generateSeats(10, 10); 
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTotalKursiChange = (e) => {
    const newTotal = Math.max(1, Number(e.target.value) || 1);
    setFormData(prev => ({ ...prev, kursiTotal: newTotal }));
    setSeats(prevSeats => {
      if (newTotal > prevSeats.length) {
        const extraSeats = Array.from({ length: newTotal - prevSeats.length }, (_, i) => ({
          id: prevSeats.length + i + 1, isReady: true
        }));
        return [...prevSeats, ...extraSeats];
      } else {
        return prevSeats.slice(0, newTotal);
      }
    });
  };

  const handleToggleSeat = (index) => {
    setSeats(prev => {
      const newSeats = [...prev];
      newSeats[index] = { ...newSeats[index], isReady: !newSeats[index].isReady };
      return newSeats;
    });
  };

  const handleSelectAll = () => setSeats(prev => prev.map(s => ({ ...s, isReady: true })));
  const handleDeselectAll = () => setSeats(prev => prev.map(s => ({ ...s, isReady: false })));

  // 🔥 Fungsi buat nangkep file gambar 🔥
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

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, gambar: '' }));
  };

  const availableSeatsCount = seats.filter(s => s.isReady).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      rute: `${formData.asal} - ${formData.tujuan}`,
      kursiTotal: Number(formData.kursiTotal),
      kursiTersedia: availableSeatsCount,
      harga: Number(formData.harga),
      seatMap: seats 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00437a]/30 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl shadow-2xl relative border border-white/50 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f8f9fa] shrink-0">
          <div>
            <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight">
              {editData ? 'Update Armada & Kursi' : 'Armada Baru'}
            </h3>
            <p className="text-gray-500 text-xs mt-0.5">Atur detail perjalanan, foto armada, lan kursi sing kasedhiya.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-100 shadow-sm rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row flex-grow overflow-hidden">
          
          <div className="w-full md:w-1/2 p-6 md:p-8 space-y-4 overflow-y-auto custom-scrollbar bg-white">
            
            {/* 🔥 Panggil komponen UPLOAD FOTO di sini 🔥 */}
            <TravelImageUpload 
              gambar={formData.gambar} 
              onUpload={handleImageUpload} 
              onRemove={handleRemoveImage} 
            />
            
            <TravelFormFields 
              formData={formData} 
              handleChange={handleChange} 
              handleTotalKursiChange={handleTotalKursiChange} 
            />

            <TravelChecklist 
              seats={seats} 
              formData={formData} 
              availableSeatsCount={availableSeatsCount} 
              handleToggleSeat={handleToggleSeat} 
              handleSelectAll={handleSelectAll} 
              handleDeselectAll={handleDeselectAll} 
            />

            <div className="p-4 mt-2 bg-blue-50/50 rounded-xl border border-blue-100 flex gap-3 items-start">
              <AlertCircle size={18} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Sampeyan bisa nyentang langsung ing dhaptar utawa ngeklik gambar kursi ing layar sisih tengen.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-8 bg-[#f8f9fa] border-l border-gray-200 flex flex-col justify-center">
            <SeatEditor seats={seats} onToggleSeat={handleToggleSeat} />
          </div>

        </form>

        <div className="p-5 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
            Batal
          </button>
          <button type="submit" className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#00437a] to-[#005a9e] hover:from-[#003057] hover:to-[#00437a] rounded-xl transition-all shadow-lg hover:shadow-[#00437a]/30 flex items-center gap-2">
            <Save size={18} /> {editData ? 'Simpan Perubahan' : 'Tambahkan Unit'}
          </button>
        </div>

      </div>
    </div>
  );
}