import { Context, Message } from '../serverTypes'

export { Message } from '@prisma/client';

interface GetArgs {
  channelId: number;
}

export async function getMessages({ channelId }: GetArgs, context: Context): Promise<Message[]> {
  return context.entities.Message.findMany({ where: { channelId } });
};