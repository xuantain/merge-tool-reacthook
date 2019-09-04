import 'reflect-metadata';
import _ from 'lodash';
import * as env from './env.util';
import * as validator from 'class-validator';
import { createConnection, getConnection, ConnectionOptions } from 'typeorm';

const options: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: env.get('DB_HOST'),
  port: parseInt(env.get('DB_PORT')),
  username: env.get('DB_USERNAME'),
  password: env.get('DB_PASSWORD'),
  database: env.get('DB_DATABASE'),
  entities: [],
  synchronize: true,
  logging: false
};

export async function connect(entities: any[]) {
  try {
    const connection = await getConnection(options.name);
    await connection.close();

    await createConnection({ ...options, entities });
  } catch (error) {
    try {
      await createConnection({ ...options, entities });
    } catch (error) {
      console.log(`TypeORM Error: ${error.message}`);
    }
  }
}

export function paginate({ take, skip }: { take?: number; skip?: number }) {
  if (take > 100) {
    const message = 'take argument must be less than or equal to 100.';

    const details = {
      argument: 'take',
      value: take,
      constraint: message
    };

    throw Object.assign(new Error(message), { details });
  }

  return {
    take: take || 10,
    skip: skip || 0
  };
}

export async function validate(input: Object) {
  const errors = await validator.validate(input);

  if (errors.length === 0) return;

  let details = errors.map(({ property, value, constraints }) => {
    return { property, value, constraints };
  });

  _.forIn(details[0].constraints, message => {
    throw Object.assign(new Error(message), { details });
  });
}
