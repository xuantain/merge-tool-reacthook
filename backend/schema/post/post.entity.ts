import { Entity, Column, PrimaryColumn, Generated, ManyToOne, RelationId } from 'typeorm';
import { Post } from '~/backend/types/schema.type';
import { UserEntity } from '../user/user.entity';

@Entity('post')
export class PostEntity implements Post {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(type => UserEntity, { nullable: false })
  author: UserEntity;

  @RelationId((post: Post) => post.author)
  authorId: string;
}
