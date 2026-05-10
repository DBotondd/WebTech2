import mongoose from 'mongoose';
import type { IMessage } from '../types/message.types.js';

const messageSchema = new mongoose.Schema<IMessage>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IMessage>('Message', messageSchema);
