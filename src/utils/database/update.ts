import { SQLiteDatabase } from "expo-sqlite";

type UpdateParams = {
  column: string;
  id: number;
  value: any;
};

export const updateColumnStatement = async (
  db: SQLiteDatabase,
  table: string,
  { id, column, value }: UpdateParams
) => {
  const statement = await db.prepareAsync(
    `UPDATE ${table} SET ${column} = $value WHERE id = $id`
  );

  const execute = async () =>
    await statement.executeAsync({
      $id: id,
      $value: value,
    });

  return { execute, statement };
};
