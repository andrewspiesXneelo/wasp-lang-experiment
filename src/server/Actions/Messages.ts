import { Context, Message } from '../serverTypes';

interface CreateArgs {
  author: string;
  text: string;
  channelId: number;
  userId: number;
}

export async function storeMessage({ text, channelId, userId, author }: CreateArgs, context: Context): Promise<Message> {
  return context.entities.Message.create({
    data: {
      channelId,
      text,
      userId,
      author,
    }
  });
}