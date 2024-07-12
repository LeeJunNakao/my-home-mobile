import { SQLiteDatabase } from "expo-sqlite";

export const createTables = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS bill (id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL, paymentValue INTEGER, dueDate DATE NOT NULL, isMonthly BOOLEAN, isPaid BOOLEAN DEFAULT false);
    `);
  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS bill_monthly_replication (id INTEGER PRIMARY KEY NOT NULL, replicationDate DATE NOT NULL);
    `);
};
