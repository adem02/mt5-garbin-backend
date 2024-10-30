import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';

const AppDataSource = new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: !(isStaging || isProduction), // DO NOT USE IN PRODUCTION
    entities: [isProduction || isStaging ? 'build/src/**/*.entity.js' : 'src/**/*.entity.ts'],
    migrations: [isProduction || isStaging ? 'build/migrations/*.js' : 'migrations/*.ts'],
    subscribers: [],
});

export default AppDataSource;
