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
