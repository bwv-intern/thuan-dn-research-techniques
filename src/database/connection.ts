import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelizeConnection = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST!,
  dialect: 'mysql',
  logging: false
});

export const connectDB = async (): Promise<void> => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelizeConnection;
