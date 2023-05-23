import { Prisma } from '@prisma/client';

export { Message, Channel, User, Code } from '@prisma/client';

export type Context = {
  entities: {
    Message: Prisma.MessageDelegate<{}>;
    User: Prisma.UserDelegate<{}>;
    Channel: Prisma.ChannelDelegate<{}>;
    Code: Prisma.CodeDelegate<{}>;
  };
};