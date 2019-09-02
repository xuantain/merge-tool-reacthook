import { allModules } from 'apollo-modulizer';

import { Query } from './query/query.module';
import { Mutation } from './mutation/mutation.module';
import { User } from './user/user.module';
import { Post } from './post/post.module';

export const { typeDefs, resolvers } = allModules([Query, Mutation, User, Post]);
