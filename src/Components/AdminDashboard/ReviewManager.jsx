import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ratingData = [
  { name: 'Bintang 1', jumlah: 2 },
  { name: 'Bintang 2', jumlah: 5 },
  { name: 'Bintang 3', jumlah: 15 },
  { name: 'Bintang 4', jumlah: 45 },
  { name: 'Bintang 5', jumlah: 120 },
];

const rawReviews = [
  { id: 1, nama: 'Budi Santoso', layanan: 'Travel', rating: 5, komentar: 'Sopir ramah, mobil wangi Hiace baru!', status: 'Published' },
  { id: 2, nama: 'Andi J.', layanan: 'Sewa Mobil', rating: 2, komentar: 'AC mobil kurang dingin siang hari.', status: 'Hidden' },
];

export default function ReviewManager() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-[#00437a] mb-4">Metrik Kepuasan Pelanggan</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingData}>
              <XAxis dataKey="name" />
              <Tooltip cursor={{ fill: '#f8f9fa' }} />
              <Bar dataKey="jumlah" fill="#f26e22" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-[#00437a] mb-4">Raw Data Komentar</h3>
        <table className="w-full text-sm text-left">
          <thead className="bg-[#f8f9fa] border-b border-gray-200">
            <tr>
              <th className="py-3 px-4">Pelanggan</th>
              <th className="py-3 px-4">Layanan</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Komentar</th>
              <th className="py-3 px-4">Visibilitas</th>
            </tr>
          </thead>
          <tbody>
            {rawReviews.map(r => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{r.nama}</td>
                <td className="py-3 px-4">{r.layanan}</td>
                <td className="py-3 px-4 text-orange-500 font-bold">⭐ {r.rating}</td>
                <td className="py-3 px-4 italic text-gray-600">"{r.komentar}"</td>
                <td className="py-3 px-4">
                  <select defaultValue={r.status} className="border rounded p-1 text-xs">
                    <option value="Published">Show</option>
                    <option value="Hidden">Hide</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}