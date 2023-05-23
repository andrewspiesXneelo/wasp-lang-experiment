import HttpError from '@wasp/core/HttpError.js';
import { Context, Channel } from '../serverTypes'

export { Channel } from '@prisma/client';

interface GetArgs {
  id: number;
}

export async function getChannels({ id }: GetArgs, context: Context): Promise<Channel[]> {
  return context.entities.Channel.findMany({ where: { id } });
};