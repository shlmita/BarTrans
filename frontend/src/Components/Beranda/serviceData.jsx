import React from 'react';
import { Palmtree, Car, BusFront, Truck, Hotel } from 'lucide-react';

export const tabs = [
  { id: 'mobil', label: 'Sewa Mobil', icon: <Car size={18} /> },
  { id: 'travel', label: 'Travel', icon: <BusFront size={18} /> },
  { id: 'angkut', label: 'Jasa Angkut', icon: <Truck size={18} /> },
  { id: 'paket', label: 'Paket Wisata', icon: <Palmtree size={18} /> },
  { id: 'inap', label: 'Penginapan', icon: <Hotel size={18} /> }
];

export const products = {
  paket: [
    { id: 1, title: 'Bali Escapade', desc: '4 Hari 3 Malam • Private Villa', price: 'Rp 3.500.000', tag: 'Best Seller', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
    { id: 2, title: 'Jogja Culture', desc: '3 Hari 2 Malam • Boutique Hotel', price: 'Rp 2.100.000', img: 'https://images.unsplash.com/photo-1584852952895-714041b6be94' },
    { id: 3, title: 'Labuan Bajo Phinisi', desc: '3 Hari 2 Malam • Liveaboard', price: 'Rp 6.800.000', tag: 'Exclusive', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2' },
    { id: 4, title: 'Bromo Sunrise', desc: '2 Hari 1 Malam • Jeep Tour', price: 'Rp 1.500.000', img: 'https://images.unsplash.com/photo-1623058866170-c752671231f4' },
    { id: 5, title: 'Raja Ampat Explorer', desc: '5 Hari 4 Malam • Island Hopping', price: 'Rp 9.500.000', tag: 'Premium', img: 'https://images.unsplash.com/photo-1516690553959-71a414d6b9b6' },
    { id: 6, title: 'Lombok Gili Getaway', desc: '3 Hari 2 Malam • Snorkeling', price: 'Rp 2.800.000', img: 'https://images.unsplash.com/photo-1573790387438-4da905039392' },
    { id: 7, title: 'Sumba Wild Adventure', desc: '4 Hari 3 Malam • Savana Tour', price: 'Rp 4.200.000', tag: 'Trending', img: 'https://images.unsplash.com/photo-1596404326514-6997e0db9668' },
    { id: 8, title: 'Danau Toba Retreat', desc: '3 Hari 2 Malam • Lake View', price: 'Rp 2.300.000', img: 'https://images.unsplash.com/photo-1604928148816-1f630de8842c' },
    { id: 9, title: 'Nusa Penida Day Trip', desc: '1 Hari Full • Fastboat PP', price: 'Rp 850.000', tag: 'One Day Trip', img: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b' }
  ],
  mobil: [
    { id: 1, title: 'Toyota Innova Zenix', desc: 'Automatic / 7 Kursi / Nyaman', price: 'Rp 800.000', tag: 'Family Choice', img: 'https://images.unsplash.com/photo-1606550294154-f06b6eb2a36b' },
    { id: 2, title: 'Honda Brio RS', desc: 'Automatic / 5 Kursi / City Car', price: 'Rp 350.000', tag: 'Hemat', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d' },
    { id: 3, title: 'Toyota Alphard', desc: 'Automatic / VIP Luxury', price: 'Rp 2.500.000', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2' },
    { id: 4, title: 'Mitsubishi Pajero', desc: 'Automatic / SUV Tangguh', price: 'Rp 1.200.000', img: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb' },
    { id: 5, title: 'Toyota Avanza', desc: 'Manual / 7 Kursi / Ekonomis', price: 'Rp 400.000', tag: 'Terlaris', img: 'https://images.unsplash.com/photo-1659081515234-a21808eb5519' },
    { id: 6, title: 'Honda HR-V', desc: 'Automatic / 5 Kursi / Crossover', price: 'Rp 700.000', img: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5' },
    { id: 7, title: 'Toyota Fortuner', desc: 'Automatic / SUV Diesel', price: 'Rp 1.250.000', tag: 'Premium', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24' },
    { id: 8, title: 'Suzuki Ertiga Hybrid', desc: 'Automatic / 7 Kursi / Irit', price: 'Rp 450.000', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2' },
    { id: 9, title: 'Hyundai Creta', desc: 'Automatic / 5 Kursi / Fitur Lengkap', price: 'Rp 650.000', img: 'https://images.unsplash.com/photo-1673891404107-00994f31cfa5' }
  ],
  travel: [
    { id: 1, title: 'Semarang - Jakarta', desc: 'Executive Class • Reclining Seat', price: 'Rp 250.000', tag: 'Rute Populer', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957' },
    { id: 2, title: 'Surabaya - Malang', desc: 'Premium Shuttle • Tepat Waktu', price: 'Rp 120.000', img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e' },
    { id: 3, title: 'Bandung - Jogja', desc: 'Sleeper Class • Free Snack', price: 'Rp 350.000', tag: 'Comfort', img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4' },
    { id: 4, title: 'Jakarta - Bandung', desc: 'Fast Shuttle • Keberangkatan Tiap Jam', price: 'Rp 150.000', tag: 'Tiap Jam', img: 'https://images.unsplash.com/photo-1571439284206-8fbce56cc3cb' },
    { id: 5, title: 'Jogja - Semarang', desc: 'Executive Class • Antar Jemput', price: 'Rp 160.000', img: 'https://images.unsplash.com/photo-1558980394-0a37b34b1767' },
    { id: 6, title: 'Surabaya - Bali (Denpasar)', desc: 'Sleeper Bus • Include Kapal Ferry', price: 'Rp 450.000', tag: 'Long Trip', img: 'https://images.unsplash.com/photo-1563299796-b729d0af5efc' },
    { id: 7, title: 'Malang - Jogja', desc: 'Executive Class • Free Makan 1x', price: 'Rp 280.000', img: 'https://images.unsplash.com/photo-1506869640319-ce1a44f51e06' },
    { id: 8, title: 'Jakarta - Purwokerto', desc: 'VIP Class • Super Lebar', price: 'Rp 220.000', img: 'https://images.unsplash.com/photo-1563212046-249cb6e48102' }
  ],
  angkut: [
    { id: 1, title: 'Pick Up Bak Terbuka', desc: 'Kapasitas 1 Ton • Dalam Kota', price: 'Mulai Rp 150.000', tag: 'Pindahan', img: 'https://images.unsplash.com/photo-1558223616-e414c55a29c1' },
    { id: 2, title: 'Truk Engkel Box', desc: 'Kapasitas 2 Ton • Aman dari Hujan', price: 'Mulai Rp 350.000', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7' },
    { id: 3, title: 'Truk Fuso', desc: 'Kapasitas 5 Ton • Luar Kota', price: 'Mulai Rp 800.000', tag: 'Kargo Besar', img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c' },
    { id: 4, title: 'Grand Max Blind Van', desc: 'Kapasitas 800 Kg • Paket Kecil', price: 'Mulai Rp 200.000', img: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd' },
    { id: 5, title: 'Truk CDD Box (Double)', desc: 'Kapasitas 4 Ton • Muatan Banyak', price: 'Mulai Rp 550.000', tag: 'Terlaris', img: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8' },
    { id: 6, title: 'Truk Tronton Bak', desc: 'Kapasitas 15 Ton • Alat Berat/Pabrik', price: 'Mulai Rp 1.500.000', img: 'https://images.unsplash.com/photo-1593361864119-a1b7e44654ed' },
    { id: 7, title: 'Pick Up Box', desc: 'Kapasitas 1 Ton • Terlindung Cuaca', price: 'Mulai Rp 250.000', img: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18' },
    { id: 8, title: 'Truk Wingbox', desc: 'Kapasitas 20 Ton • Bongkar Samping', price: 'Mulai Rp 2.200.000', tag: 'B2B Logistik', img: 'https://images.unsplash.com/photo-1612630741022-b29ec18d0982' }
  ],
  inap: [
    { id: 1, title: 'Villa Kaca Bandung', desc: '3 Kamar Tidur • Private Pool', price: 'Rp 2.000.000', tag: 'Staycation', img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf' },
    { id: 2, title: 'Cabin Resort Puncak', desc: '1 Kamar Tidur • View Pegunungan', price: 'Rp 800.000', tag: 'Romantic', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607' },
    { id: 3, title: 'City Hotel Jogja', desc: 'Standard Room • Dekat Malioboro', price: 'Rp 450.000', img: 'https://images.unsplash.com/photo-1551882547-ff40c61fe60f' },
    { id: 4, title: 'Glamping Danau Kintamani', desc: 'Tenda Mewah • Sunrise View', price: 'Rp 650.000', tag: 'Nature', img: 'https://images.unsplash.com/photo-1533873984035-25970ab07461' },
    { id: 5, title: 'Beachfront Resort Bali', desc: 'Ocean View Suite • Private Access', price: 'Rp 3.200.000', tag: 'Luxury', img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2' },
    { id: 6, title: 'Bamboo House Ubud', desc: '2 Kamar Tidur • Eco Friendly', price: 'Rp 1.100.000', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d' },
    { id: 7, title: 'Apartemen Pusat Jakarta', desc: 'Studio Room • Akses MRT', price: 'Rp 550.000', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267' },
    { id: 8, title: 'Boutique Hotel Semarang', desc: 'Deluxe Room • Heritage Style', price: 'Rp 600.000', img: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972' }
  ]
};

export const getPriceLabel = (tabId) => {
  switch (tabId) {
    case 'mobil': return '/hari';
    case 'travel': return '/kursi';
    case 'angkut': return '/trip';
    case 'inap': return '/malam';
    default: return '/pax'; 
  }
};

export const getButtonText = (tabId) => {
  switch (tabId) {
    case 'mobil': return 'Rental Sekarang';
    case 'travel': return 'Pesan Tiket';
    case 'angkut': return 'Pesan Truk';
    case 'inap': return 'Booking Kamar';
    default: return 'Lihat Detail';
  }
};