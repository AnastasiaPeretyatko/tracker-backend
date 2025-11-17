import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('DATABASE_URL =', process.env.DATABASE_URL);

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/domains/**/*.entity.{ts,js}'], // все сущности
  migrations: ['src/migrations/*.{ts,js}'], // все миграции
  synchronize: true,
});
