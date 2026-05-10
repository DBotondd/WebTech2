// Szolgáltatási réteg (service) a termékek adatbázis-műveleteihez: kezeli a létrehozást, a listázást, a frissítést, valamint a kis- és nagybetűkre nem érzékeny keresést gyártó és kategória alapján.

import Product from '../models/product.model.js';
import type { IProduct } from '../types/product.types.js';

/**
 * Új hardver rögzítése az adatbázisban
 */
export const createProduct = async (data: IProduct) => {
  return await Product.create(data);
};

/**
 * Az összes tárolt komponens lekérése
 */
export const getProducts = async () => {
  return await Product.find().sort({ createdAt: -1 }); // A legújabbakat hozza előre
};

/**
 * Hardver adatainak frissítése (Ár, Készlet, Specifikáció)
 */
export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true, // A frissített objektumot adja vissza
    runValidators: true, // Ellenőrzi a sémában leírt szabályokat
  });
};

/**
 * Keresés gyártó szerint (Case-insensitive)
 * pl. "nvidia", "NVIDIA", "Nvidia" mind ugyanazt hozza
 */
export const getProductsByBrand = async (brand: string) => {
  return await Product.find({
    brand: { $regex: new RegExp(`^${brand}$`, 'i') },
  });
};

/**
 * Keresés kategória szerint (CPU, GPU, stb.)
 * Ezt a Controller hívja meg az új végponton keresztül
 */
export const getProductsByCategory = async (category: string) => {
  return await Product.find({
    category: { $regex: new RegExp(`^${category}$`, 'i') },
  });
};