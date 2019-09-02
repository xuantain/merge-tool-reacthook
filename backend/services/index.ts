import { DatabaseService } from './database.service';

export interface DataSources {
  database: DatabaseService;
}

export const dataSources = () => ({
  database: new DatabaseService()
});
