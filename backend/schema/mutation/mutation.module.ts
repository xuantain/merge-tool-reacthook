import { typeDef } from './mutation.typedef';
import { resolvers } from './mutation.resolver';
import { createModule } from 'apollo-modulizer';

export const Mutation = createModule({ typeDef, resolvers });
