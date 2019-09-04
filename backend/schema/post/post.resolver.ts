import { utils } from '~/backend/utils';
import { Resolvers } from '~/backend/types/schema.type';

export const resolvers: Resolvers = {
  Post: {
    author: async (parent, args, context) => {
      const { getUserRepo } = context.dataSources.database;
      const { authorId }: any = parent;

      return getUserRepo().findOne({ where: { id: authorId } });
    }
  },
  Mutation: {
    createPost: async (parent, args, context) => {
      const { getPostRepo, newPost } = context.dataSources.database;

      if (!context.user) throw new Error("You don't have permission to create posts.");

      const post = Object.assign(newPost(), args.input, { author: context.user });

      return getPostRepo().save(post);
    },

    updatePost: async (parent, args, context) => {
      const { getPostRepo } = context.dataSources.database;
      const post = await getPostRepo().findOne({ id: args.id });

      if (!context.user || context.user.id !== post.authorId) {
        throw new Error("You don't have permission to update this post.");
      }

      const updatedPost = Object.assign(post, args.input);

      return getPostRepo().save(updatedPost);
    },

    deletePost: async (parent, args, context) => {
      const { getPostRepo } = context.dataSources.database;
      const post = await getPostRepo().findOne({ id: args.id });

      if (!context.user || context.user.id !== post.authorId) {
        throw new Error("You don't have permission to delete this post.");
      }

      const { affected } = await getPostRepo().delete(post.id);

      return affected > 0;
    }
  },
  Query: {
    post: async (parent, args, context) => {
      const { getPostRepo } = context.dataSources.database;

      return getPostRepo().findOne({ where: { id: args.id } });
    },

    posts: async (parent, args, context) => {
      const { take, skip } = utils.db.paginate(args);
      const { getPostRepo } = context.dataSources.database;

      return getPostRepo().find({ take, skip });
    }
  }
};
