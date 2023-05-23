import { Context, User } from '../serverTypes'

export { User } from '@prisma/client';

interface GetArgs {
  id: number;
}

export async function getUsers({ id }: GetArgs, context: Context): Promise<User[]> {
  return context.entities.User.findMany();
};