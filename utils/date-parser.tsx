export const isCurrentMonth = (date: Date) => {
  const currentMonth = new Date().getMonth();

  return date.getMonth() === currentMonth;
};

export const isPreviousMonth = (date: Date) => {
  const currentMonth = new Date().getMonth();

  return date.getMonth() < currentMonth;
};

export const isNextMonth = (date: Date) => {
  const currentMonth = new Date().getMonth();

  return date.getMonth() > currentMonth;
};
