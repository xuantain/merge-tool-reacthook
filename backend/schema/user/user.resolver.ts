import bcrypt from 'bcrypt';
import { utils } from '~/backend/utils';
import { Resolvers } from '~/backend/types/schema.type';

export const resolvers: Resolvers = {
  User: {
    posts: async (parent, args, context) => {
      const { getPostRepo } = context.dataSources.database;
      const { take, skip } = utils.db.paginate(args);

      return getPostRepo().find({ where: { authorId: parent.id }, take, skip });
    }
  },
  Mutation: {
    signUpToGetToken: async (parent, args, context) => {
      const { getUserRepo, newUser } = context.dataSources.database;
      const password = bcrypt.hashSync(args.input.password, bcrypt.genSaltSync(8));
      const user = Object.assign(newUser(), args.input, { password });

      await utils.db.validate(user);

      const { id } = await getUserRepo().save(user);

      return utils.auth.createToken(id);
    },
    signInToGetToken: async (parent, args, context) => {
      const { getUserRepo } = context.dataSources.database;
      const user = await getUserRepo().findOne({ email: args.input.email });
      const valid = bcrypt.compareSync(args.input.password, user.password);
      const token = utils.auth.createToken(user.id);

      return valid ? token : null;
    }
  },
  Query: {
    user: async (parent, args, context) => {
      const { getUserRepo } = context.dataSources.database;
      return getUserRepo().findOne({ where: { id: args.id } });
    }
  }
};
