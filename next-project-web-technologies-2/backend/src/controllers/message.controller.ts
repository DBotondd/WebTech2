import type { Request, Response } from 'express';
import * as messageService from '../services/message.service.js';

export const create = async (req: Request, res: Response) => {
  try {
    const message = await messageService.createMessage(req.body);

    res.status(201).json({
      message: 'Message sent successfully',
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to send message',
    });
  }
};

export const getAll = async (_: Request, res: Response) => {
  try {
    const messages = await messageService.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};
