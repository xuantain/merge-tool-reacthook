import { typeDef } from './query.typedef';
import { resolvers } from './query.resolver';
import { createModule } from 'apollo-modulizer';

export const Query = createModule({ typeDef, resolvers });
