import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/product.model.js';

// ES Module dirname fix, hogy biztosan megtalálja a .env fájlt
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const products = [
  {
    name: 'Intel Core i9-14900K',
    model: 'i9-14900K',
    brand: 'Intel Core i9-14900K',
    category: 'CPU',
    series: '14900K',
    socket: 'LGA1700',
    price: 0,
    stock: 0,
    url: 'https://www.intel.com/content/www/us/en/products/sku/236773/intel-core-i9-processor-14900k-36m-cache-up-to-6-00-ghz/specifications.html'
  },
  {
    name: 'AMD Ryzen 7 7800X3D',
    model: '7800X3D',
    brand: 'AMD Ryzen 7 7800X3D',
    category: 'CPU',
    series: '7800X3D',
    socket: 'AM5',
    price: 0,
    stock: 0,
    url: 'https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-7-7800x3d.html'
  },
  {
    name: 'NVIDIA RTX 4080 Super',
    model: 'RTX 4080S',
    brand: 'NVIDIA RTX 4080 Super',
    category: 'GPU',
    series: 'Super',
    vram: '16GB GDDR6X',
    price: 0,
    stock: 0,
    url: 'https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4080-family/'
  },
  {
    name: 'ASUS ROG Strix Z790-E',
    model: 'Z790-E GAMING',
    brand: 'ASUS ROG Strix Z790-E',
    category: 'Motherboard',
    series: 'Gaming',
    socket: 'LGA1700',
    price: 0,
    stock: 0,
    url: 'https://rog.asus.com/hu/motherboards/rog-strix/rog-strix-z790-e-gaming-wifi-model/'
  },
  {
    name: 'Corsair Vengeance 32GB',
    model: 'CMK32GX5M2B',
    brand: 'Corsair Vengeance 32GB',
    category: 'RAM',
    series: '32GB',
    ramType: 'DDR5',
    price: 0,
    stock: 0,
    url: 'https://www.corsair.com/us/en/p/memory/cmk32gx5m2e6000c36/vengeance-32gb-2x16gb-ddr5-dram-6000mt-s-cl30-memory-kit-black-cmk32gx5m2b6000c30'
  },
  // --- ÚJ TERMÉKEK ---
  {
    name: 'Samsung 990 Pro 2TB',
    model: 'MZ-V9P2T0BW',
    brand: 'Samsung 990 Pro 2TB',
    category: 'SSD',
    series: '990 Pro',
    capacity: '2TB',
    interface: 'PCIe Gen4 x4',
    price: 0,
    stock: 0,
    url: 'https://www.samsung.com/hu/memory-storage/nvme-ssd/990-pro-2tb-nvme-pcie-gen-4-mz-v9p2t0bw/'
  },
  {
    name: 'Kingston FURY Renegade 1TB',
    model: 'SFYRS/1000G',
    brand: 'Kingston FURY Renegade 1TB',
    category: 'SSD',
    series: 'FURY Renegade',
    capacity: '1TB',
    interface: 'PCIe Gen4 x4',
    price: 0,
    stock: 0,
    url: 'https://www.kingston.com/en/ssd/gaming/fury-renegade'
  },
  {
    name: 'EVGA SuperNOVA 850 G6',
    model: '220-G6-0850-X1',
    brand: 'EVGA SuperNOVA 850 G6',
    category: 'PSU',
    series: 'SuperNOVA',
    wattage: '850W',
    efficiency: '80+ Gold',
    price: 0,
    stock: 0,
    url: 'https://www.evga.com/products/product.aspx?pn=220-G6-0850-X1'
  },
  {
    name: 'Corsair RM1000x 1000W',
    model: 'CP-9020201-EU',
    brand: 'Corsair RM1000x 1000W',
    category: 'PSU',
    series: 'RMx',
    wattage: '1000W',
    efficiency: '80+ Gold',
    price: 0,
    stock: 0,
    url: 'https://www.corsair.com/us/en/p/psu/cp-9020201-na/rmx-series-rm1000x-1000-watt-80-plus-gold-fully-modular-atx-psu-cp-9020201-na'
  },
  {
    name: 'AMD Radeon RX 7900 XTX',
    model: 'RX 7900 XTX',
    brand: 'AMD Radeon RX 7900 XTX',
    category: 'GPU',
    series: '7900 Series',
    vram: '24GB GDDR6',
    price: 0,
    stock: 0,
    url: 'https://www.amd.com/en/products/graphics/desktops/radeon/7000-series/amd-radeon-rx-7900xtx.html'
  },
  {
    name: 'Intel Core i5-13600K',
    model: 'i5-13600K',
    brand: 'Intel Core i5-13600K',
    category: 'CPU',
    series: '13600K',
    socket: 'LGA1700',
    price: 0,
    stock: 0,
    url: 'https://www.intel.com/content/www/us/en/products/sku/230493/intel-core-i513600k-processor-24m-cache-up-to-5-10-ghz/specifications.html'
  },
  {
    name: 'MSI GeForce RTX 4070 Ti',
    model: 'RTX 4070 Ti Ventus',
    brand: 'MSI GeForce RTX 4070 Ti',
    category: 'GPU',
    series: 'Ventus 3X',
    vram: '12GB GDDR6X',
    price: 0,
    stock: 0,
    url: 'https://www.msi.com/Graphics-Card/GeForce-RTX-4070-Ti-VENTUS-3X-12G'
  },
  {
    name: 'Seasonic Focus GX-750',
    model: 'FOCUS-GX-750',
    brand: 'Seasonic Focus GX-750',
    category: 'PSU',
    series: 'Focus',
    wattage: '750W',
    efficiency: '80+ Gold',
    price: 0,
    stock: 0,
    url: 'https://seasonic.com/focus-gx'
  },
  {
    name: 'Crucial P5 Plus 500GB',
    model: 'CT500P5PSSD8',
    brand: 'Crucial P5 Plus 500GB',
    category: 'SSD',
    series: 'P5 Plus',
    capacity: '500GB',
    interface: 'PCIe Gen4 x4',
    price: 0,
    stock: 0,
    url: 'https://www.crucial.com/ssd/p5-plus/ct500p5pssd8'
  },
  {
    name: 'G.Skill Trident Z5 RGB 64GB',
    model: 'F5-6400J3239G32GX2',
    brand: 'G.Skill Trident Z5 RGB 64GB',
    category: 'RAM',
    series: 'Trident Z5',
    ramType: 'DDR5',
    price: 0,
    stock: 0,
    url: 'https://www.gskill.com/product/165/374/1642064699/F5-6400J3239G32GX2-TZ5RK-F5-6400J3239G32GA2-TZ5RK'
  }
];
const seedDB = async () => {
  try {
    // Ha a .env nem töltene be, itt egy biztonsági mentés a kapcsolatra
    const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://boti_:b0tiii@cluster0.zzpzspd.mongodb.net/';
    
    console.log('--- SEED FOLYAMAT INDÍTÁSA ---');
    console.log(`Csatlakozás: ${MONGO_URI}`);

    await mongoose.connect(MONGO_URI);
    console.log('✅ Sikeres kapcsolat a MongoDB-vel.');

    // Törlés
    const deleteResult = await Product.deleteMany({});
    console.log(`🗑️ Régi adatok törölve (${deleteResult.deletedCount} db).`);

    // Beszúrás
    const insertResult = await Product.insertMany(products);
    console.log(`🚀 Sikeresen betöltve ${insertResult.length} új hardver komponens!`);

    console.log('--- SEED KÉSZ ---');
    process.exit(0);
  } catch (error) {
    console.error('❌ HIBA A SEEDELÉS SORÁN:');
    console.error(error);
    process.exit(1);
  }
};

seedDB();