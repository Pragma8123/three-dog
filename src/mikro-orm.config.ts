import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config = {
  type: 'sqlite',
  dbName: 'db/three-dog.sqlite3',
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
};

export default config;
