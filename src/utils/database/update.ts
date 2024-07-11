import { SQLiteDatabase } from "expo-sqlite";

export const updateColumnStatement = async (
  db: SQLiteDatabase,
  column: string,
  id: number,
  value: any
) => {
  const statement = await db.prepareAsync(
    `UPDATE bill SET ${column} = $value WHERE id = $id`
  );

  const execute = async () =>
    await statement.executeAsync({
      $id: id,
      $value: value,
    });

  return { execute, statement };
};
