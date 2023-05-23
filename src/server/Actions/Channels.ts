import { Context, Channel } from '../serverTypes';

interface CreateArgs {
  name: string;
  userIds: number[];
}

export async function createChannel({ name, userIds }: CreateArgs, context: Context): Promise<Channel> {

  return context.entities.Channel.create({
    data: {
      name,
      userIds
    }
  });
}