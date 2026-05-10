export interface IProduct {
  _id?: string;        // A MongoDB azonosítóhoz (opcionális, mert mentés előtt még nincs)
  name: string;        // pl. "Core i9-14900K" vagy "GeForce RTX 4080"
  brand: string;       // pl. "Intel", "AMD", "ASUS", "Nvidia"
  category: string;    // pl. "CPU", "GPU", "Motherboard", "RAM"
  series: string;      // pl. "Ryzen 7000", "RTX 40-series"
  
  // Modern Hardver Specifikációk
  socket?: string;     // Foglalat (pl. AM5, LGA1700)
  cores?: string;      // Magok száma (pl. "16 Cores / 32 Threads")
  clockSpeed?: string; // Órajel (pl. "5.4 GHz")
  vram?: string;       // Videómemória (pl. "16GB GDDR6X")
  ramType?: string;    // Memória típusa (pl. "DDR5", "LPDDR5X")
  tdp?: string;        // Fogyasztás (pl. "65W", "450W")
  description?: string; // Rövid leírás a termékről

  // Kereskedelmi adatok
  price: number;
  stock: number;
  url: string;         // Gyártói specifikációs oldal
  
  createdAt?: Date;    // A timestamps: true miatt
  updatedAt?: Date;
}