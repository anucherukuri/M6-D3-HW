import { Sequelize } from "sequelize";

//GETTING DATA FRON .env FILE
const { PGHOST, PGUSER, PGPORT, PGPASSWORD, PGDATABASE } = process.env;

//TO CONNECT TO DATABASE
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
});

//TO TEST CONNECTION
export const testDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(error);
  }
};

//TO SYNCHRONIZE MODELS
export const syncDB = async () => {
  try {
    await sequelize.sync({ logging: false });
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;