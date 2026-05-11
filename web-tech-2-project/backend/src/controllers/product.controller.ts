// Express kontroller a hardver termékek CRUD műveleteinek, valamint márka és kategória alapú szűrésének kezelésére.

import type { Request, Response } from 'express';
import * as productService from '../services/product.service.js';

/**
 * Új hardver komponens létrehozása
 */
export const create = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Hiba a termék létrehozásakor' });
  }
};

/**
 * Összes hardver lekérése
 */
export const getAll = async (_: Request, res: Response) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Szerverhiba a lekérés során' });
  }
};

/**
 * Adott ID-val rendelkező hardver frissítése (Admin felületről)
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res
        .status(400)
        .json({ message: 'Érvényes azonosító (ID) szükséges' });
    }

    const updatedProduct = await productService.updateProduct(id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ message: 'A keresett hardver nem található' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'A módosítás nem sikerült' });
  }
};

/**
 * Szűrés gyártó (Intel, AMD, NVIDIA, stb.) alapján
 */
export const getByBrand = async (req: Request, res: Response) => {
  try {
    const { brand } = req.params;

    if (!brand || typeof brand !== 'string') {
      return res
        .status(400)
        .json({ message: 'A gyártó megadása kötelező' });
    }

    const products = await productService.getProductsByBrand(brand);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Hiba a márka alapú szűrésnél' });
  }
};

/**
 * Szűrés kategória (CPU, GPU, Motherboard, stb.) alapján
 * Ezt hozzáadtuk a Router-ben, itt a megvalósítás
 */
export const getByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;

    if (!category || typeof category !== 'string') {
      return res
        .status(400)
        .json({ message: 'A kategória megadása kötelező' });
    }

    const products = await productService.getProductsByCategory(category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Hiba a kategória alapú szűrésnél' });
  }
};