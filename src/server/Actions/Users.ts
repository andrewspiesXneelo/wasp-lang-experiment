import { Context, User } from '../serverTypes';

interface CreateArgs {
  username: string;
  code: string;
  messageIds: number[];
  channelIds: number[];
}

export async function createUser({ username, code, messageIds, channelIds }: CreateArgs, context: Context): Promise<User> {
  return context.entities.User.create({
    data: {
      username,
      code,
      ...messageIds,
      ...channelIds,
    }
  });
};