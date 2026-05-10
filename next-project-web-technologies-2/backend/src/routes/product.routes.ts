import { Router } from 'express';
import * as controller from '../controllers/product.controller.js';

const router = Router();

/**
 * @route   POST /api/products
 * @desc    Új hardver komponens hozzáadása
 */
router.post('/', controller.create);

/**
 * @route   GET /api/products
 * @desc    Összes hardver lekérése
 */
router.get('/', controller.getAll);

/**
 * @route   GET /api/products/brand/:brand
 * @desc    Hardverek szűrése gyártó (pl. Intel, AMD, Nvidia) alapján
 */
router.get('/brand/:brand', controller.getByBrand);

/**
 * @route   GET /api/products/category/:category
 * @desc    Hardverek szűrése kategória (pl. CPU, GPU) alapján
 * @note    Ezt hozzáadtam, mert a modern weboldaladhoz ez elengedhetetlen!
 */
router.get('/category/:category', controller.getByCategory);

/**
 * @route   PUT /api/products/:id
 * @desc    Adott hardver árának és készletének frissítése (Admin felületről)
 */
router.put('/:id', controller.update);

export default router;