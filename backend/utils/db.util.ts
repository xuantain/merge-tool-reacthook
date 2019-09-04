import _ from 'lodash';
import 'reflect-metadata';
import * as ormconfig from '~/ormconfig.js';
import * as validator from 'class-validator';
import { createConnection, getConnection } from 'typeorm';

export async function connect(entities: any[]) {
  const options: any = ormconfig;

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
