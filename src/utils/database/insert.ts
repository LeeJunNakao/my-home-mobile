import { Bill } from "@/entities/Bill";
import { SQLiteDatabase } from "expo-sqlite";

export type BillInsertDTo = Omit<Bill, "id">;

export const insertBillStatement = async (
  db: SQLiteDatabase,
  bill: BillInsertDTo
) => {
  const statement = await db.prepareAsync(
    "INSERT INTO bill (name, paymentValue, dueDate, isMonthly) VALUES ($name, $paymentValue, $dueDate, $isMonthly)"
  );

  const execute = async () =>
    await statement.executeAsync({
      $name: bill.name as string,
      $paymentValue: bill.paymentValue as number,
      $dueDate: bill.dueDate.toISOString(),
      $isMonthly: bill.isMonthly as boolean,
    });

  return { execute, statement };
};

export const insertManyBillsStatement = async (db: SQLiteDatabase) => {
  const statement = await db.prepareAsync(
    `INSERT INTO bill (name, paymentValue, dueDate, isMonthly) VALUES $values`
  );

  const execute = async (bills: BillInsertDTo[]) => {
    const values = bills
      .map((b) => [b.name, b.paymentValue, b.dueDate, b.isMonthly].join(", "))
      .map((value) => `(${value})`)
      .join(", ");

    await statement.executeAsync({
      $values: values,
    });
  };

  return { execute, statement };
};

export type BillsMonthlyReplication = { replicationDate: Date };

export const insertBillsReplicationStatement = async (db: SQLiteDatabase) => {
  const statement = await db.prepareAsync(
    "INSERT INTO bill_monthly_replication (replicationDate) VALUES ($replicationDate)"
  );

  const execute = async (dto: BillsMonthlyReplication) =>
    await statement.executeAsync({
      $replicationDate: dto.replicationDate.toISOString(),
    });

  return { execute, statement };
};
