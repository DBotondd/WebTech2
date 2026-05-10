import mongoose from 'mongoose';
import type { IProduct } from '../types/product.types.js';

const productSchema = new mongoose.Schema<IProduct>(
  {
    // Alapadatok
    name: { type: String, required: true }, // pl. "Core i9-14900K"
    brand: { type: String, required: true }, // pl. "Intel"
    category: { type: String, required: true }, // pl. "CPU", "GPU", "RAM"
    series: { type: String, required: true }, // pl. "RTX 40-series"
    
    // Hardver specifikációk
    socket: String,      // pl. "LGA1700", "AM5"
    cores: String,       // pl. "16 Cores"
    clockSpeed: String,  // pl. "5.2 GHz"
    vram: String,        // pl. "16GB GDDR6X" (GPU-hoz)
    ramType: String,     // pl. "DDR5" (RAM-hoz)
    tdp: String,         // pl. "125W"
    
    // Kereskedelmi adatok
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    url: { type: String, required: true }, // Gyártói specifikáció linkje
    description: String,
  },
  { 
    timestamps: true, // Automatikusan kezeli a createdAt és updatedAt mezőket
    versionKey: false // Opcionális: leveszi a __v mezőt
  },
);

export default mongoose.model<IProduct>('Product', productSchema);