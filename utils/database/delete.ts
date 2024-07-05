import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

export const deleteByIdStatement = async (db: SQLiteDatabase, id: number) => {
  const statement = await db.prepareAsync(`DELETE FROM bill WHERE id = $id`);

  const execute = async () =>
    await statement.executeAsync({
      $id: id,
    });

  return { execute, statement };
};
