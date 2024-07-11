export const sortBy = <T,>(data: T[], key: keyof T, order: "ASC" | "DESC") => {
  return data.sort((a, b) => {
    const aValue = a[key] as any;
    const bValue = b[key] as any;

    if (order === "ASC") {
      return aValue < bValue ? -1 : 1;
    }

    return aValue > bValue ? -1 : 1;
  });
};
