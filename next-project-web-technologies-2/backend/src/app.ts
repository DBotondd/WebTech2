import express from 'express';
import type { Request, Response, NextFunction } from 'express'; // <--- type-only import
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/product.routes.js';
import messageRoutes from './routes/message.routes.js';

const app = express();

// --- Middleware-ek ---
app.use(cors());
app.use(express.json());

// ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// STATIC FILES - Képek és egyéb fájlok kiszolgálása
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// --- API Útvonalak ---
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);

// Health Check végpont
app.get('/', (_req: Request, res: Response) => {
  res.json({ 
    status: 'online', 
    system: 'HardwareCore API v1.0',
    timestamp: new Date().toISOString() 
  });
});

// --- Globális Hibakezelő Middleware ---
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('⚠️ Rendszerhiba:', err instanceof Error ? err.stack : err);
  
  res.status(500).json({ 
    success: false,
    message: 'Belső szerverhiba történt a hardver-adatbázis elérésekor.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;