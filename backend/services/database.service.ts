import { utils } from '~/backend/utils';
import { getRepository } from 'typeorm';
import { DataSource } from 'apollo-datasource';

import { UserEntity } from '~/backend/schema/user/user.entity';
import { PostEntity } from '~/backend/schema/post/post.entity';

utils.db.connect([UserEntity, PostEntity]);

export class DatabaseService extends DataSource {
  newUser() {
    return new UserEntity();
  }

  getUserRepo() {
    return getRepository(UserEntity);
  }

  newPost() {
    return new PostEntity();
  }

  getPostRepo() {
    return getRepository(PostEntity);
  }
}
