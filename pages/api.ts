import { server } from '~/backend/server';

export const config = {
  api: {
    bodyParser: false
  }
};

export default server.createHandler({ path: '/api' });
