import React, { useState, useEffect } from 'react';
import { Users, Ban, CheckCircle } from 'lucide-react';
import API_URL from '../../config';

export default function AkunManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL + '/api/auth/users');
      const result = await response.json();
      if (result.status === 'success') {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data akun:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Aktif' ? 'Banned' : 'Aktif';
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await response.json();
      if (result.status === 'success') {
        fetchUsers();
      }
    } catch (error) {
      alert("Gagal mengubah status akun!");
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative animate-fade-in">
      
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3.5 bg-blue-50 text-[#00437a] rounded-2xl shadow-inner">
          <Users size={24} />
        </div>
        <div>
          <h3 className="font-extrabold text-2xl text-[#00437a] tracking-tight">Manajemen Akun</h3>
          <p className="text-gray-500 text-sm mt-0.5">Kelola hak akses dan status pengguna sistem.</p>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar pb-4">
        {loading ? (
          <p className="text-center py-6 text-gray-500">Memuat data akun...</p>
        ) : (
          <table className="w-full text-sm text-left border-separate border-spacing-y-3">
            <thead className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="py-2 px-4 font-bold">Nama Lengkap</th>
                <th className="py-2 px-4 font-bold">No WhatsApp</th>
                <th className="py-2 px-4 font-bold">Email</th>
                <th className="py-2 px-4 font-bold">Role Akses</th>
                <th className="py-2 px-4 font-bold">Status Akun</th>
                <th className="py-2 px-4 text-center font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="bg-gray-50 hover:bg-gray-100/80 transition-colors group shadow-sm rounded-2xl whitespace-nowrap">
                  <td className="py-4 px-4 rounded-l-2xl font-bold text-gray-800">{u.nama}</td>
                  <td className="py-4 px-4 text-gray-600 font-medium">{u.whatsapp || '-'}</td>
                  <td className="py-4 px-4 text-gray-600 font-medium">{u.email}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-[#00437a] bg-blue-50/50 px-3 py-1 rounded-lg border border-blue-100">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center w-max gap-1.5 ${
                      u.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Aktif' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center rounded-r-2xl">
                    <div className="flex items-center justify-center gap-2">
                      {u.role !== 'Superadmin' ? (
                        <button 
                          onClick={() => handleToggleStatus(u.id, u.status)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 border rounded-xl text-xs font-bold transition-all shadow-sm ${
                            u.status === 'Aktif' 
                              ? 'bg-white border-red-100 text-red-500 hover:bg-red-500 hover:text-white' 
                              : 'bg-white border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                          }`}
                        >
                          {u.status === 'Aktif' ? <><Ban size={14} /> Blokir</> : <><CheckCircle size={14} /> Aktifkan</>}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No Action</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}