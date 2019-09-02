import jwt from 'jsonwebtoken';
import * as env from './env.util';
import { getRepository } from 'typeorm';
import { UserEntity } from '~/backend/schema/user/user.entity';

const JWT_SECRET = env.get('JWT_SECRET');

export function createToken(id: string): string {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
}

export async function getUser(token: string): Promise<UserEntity> {
  try {
    const { id }: any = jwt.verify(token || '', JWT_SECRET);
    const user = await getRepository(UserEntity).findOne({ id });

    return user || null;
  } catch (error) {
    return null;
  }
}
