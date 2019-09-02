import { typeDef } from './user.typedef';
import { resolvers } from './user.resolver';
import { createModule } from 'apollo-modulizer';

export const User = createModule({ typeDef, resolvers });
