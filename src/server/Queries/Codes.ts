import { Context, Code } from '../serverTypes'

export { Code } from '@prisma/client';

interface GetArgs {
  code: string;
}

export async function getCodes({ code }: GetArgs, context: Context): Promise<Code[]> {
  return context.entities.Code.findMany();
};