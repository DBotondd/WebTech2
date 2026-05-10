import Message from '../models/message.model.js';
import type { IMessage } from '../types/message.types.js';

/**
 * Új üzenet (kapcsolatfelvétel vagy hibajelentés) mentése
 */
export const createMessage = async (data: IMessage) => {
  return await Message.create(data);
};

/**
 * Összes üzenet lekérése, a legfrissebbekkel az élen
 * Admin felülethez vagy logoláshoz hasznos
 */
export const getMessages = async () => {
  return await Message.find().sort({ createdAt: -1 });
};