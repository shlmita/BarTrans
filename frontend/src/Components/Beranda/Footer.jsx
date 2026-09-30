import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import logoBartrans from '../../assets/Bartrans.png'; 

export default function Footer({ data }) {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 pt-16 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* 🔥 UBAH: Bagian Brand Logo, Teks BarTrans & Deskripsi */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logoBartrans} alt="Logo BarTrans" className="h-10 md:h-12 w-auto object-contain" />
            <span className="font-extrabold text-2xl tracking-tight text-[#00437a]">
              Bar<span className="text-[#f26e22]">Trans</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-gray-500">
            {data?.footer_desc || "Solusi terpadu untuk segala kebutuhan mobilitas, sewa kendaraan, penginapan, dan paket wisata terbaik di Indonesia."}
          </p>
        </div>

        <div>
          <h4 className="text-[#00437a] font-semibold text-sm mb-4">Layanan Kami</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#services" className="hover:text-[#f26e22] transition">Sewa Mobil Harian & VIP</a></li>
            <li><a href="#services" className="hover:text-[#f26e22] transition">Tiket Travel Eksekutif</a></li>
            <li><a href="#services" className="hover:text-[#f26e22] transition">Jasa Angkut & Truk Kargo</a></li>
            <li><a href="#services" className="hover:text-[#f26e22] transition">Paket Wisata Eksklusif</a></li>
            <li><a href="#services" className="hover:text-[#f26e22] transition">Booking Penginapan & Villa</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#00437a] font-semibold text-sm mb-4">Tautan Cepat</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#about" className="hover:text-[#f26e22] transition">Tentang Kami</a></li>
            <li><a href="#terms" className="hover:text-[#f26e22] transition">Syarat & Ketentuan</a></li>
            <li><a href="#privacy" className="hover:text-[#f26e22] transition">Kebijakan Privasi</a></li>
            <li><a href="#faq" className="hover:text-[#f26e22] transition">Pusat Bantuan (FAQ)</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#00437a] font-semibold text-sm mb-4">Hubungi Kami</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#f26e22] shrink-0 mt-0.5" />
              <span>{data?.footer_address || "Jl. Raya Perjalanan No. 45, Kota Semarang, Jawa Tengah"}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#f26e22] shrink-0" />
              <span>{data?.footer_phone || "+62 812-3456-7890"}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#f26e22] shrink-0" />
              <span>{data?.footer_email || "support@bartrans.id"}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} BarTrans Indonesia. All rights reserved.</p>
      </div>
    </footer>
  );
}