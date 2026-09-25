import React from 'react';
import { Compass, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 pt-16 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#00437a] font-bold text-lg">
            <div className="p-2 bg-[#f26e22] rounded-xl text-white">
              <Compass size={20} />
            </div>
            <span>Travel<span className="text-[#f26e22]">Pro</span></span>
          </div>
          <p className="text-xs leading-relaxed text-gray-500">
            Solusi terpadu untuk segala kebutuhan mobilitas, sewa kendaraan, penginapan, dan paket wisata terbaik di Indonesia.
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
              <span>Jl. Raya Perjalanan No. 45, Kota Semarang, Jawa Tengah</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#f26e22] shrink-0" />
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#f26e22] shrink-0" />
              <span>support@travelpro.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} TravelPro Indonesia. All rights reserved.</p>
      </div>
    </footer>
  );
}