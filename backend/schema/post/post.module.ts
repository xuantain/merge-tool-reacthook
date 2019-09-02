import { typeDef } from './post.typedef';
import { resolvers } from './post.resolver';
import { createModule } from 'apollo-modulizer';

export const Post = createModule({ typeDef, resolvers });
