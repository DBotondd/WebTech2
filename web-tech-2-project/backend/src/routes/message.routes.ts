// Express router az üzenetkezelő végpontok definiálásához, amely lehetővé teszi az üzenetek beküldését és lekérését a megfelelő kontroller metódusokhoz rendelve.

import { Router } from 'express';
import * as controller from '../controllers/message.controller.js';

const router = Router();

/**
 * @route   POST /api/messages
 * @desc    Új üzenet rögzítése (pl. termékinformáció kérése vagy támogatás)
 * @access  Public
 */
router.post('/', controller.create);

/**
 * @route   GET /api/messages
 * @desc    Összes beérkezett üzenet lekérése
 * @access  Private/Admin (Ideális esetben middleware-rel védve)
 */
router.get('/', controller.getAll);

export default router;