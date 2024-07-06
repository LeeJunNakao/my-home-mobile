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

export const sumDate = (
  date: Date,
  quantity: number,
  unit: "second" | "minute" | "hour" | "day"
) => {
  let time = quantity * 1000;

  if (unit === "minute") {
    time *= 60;
  }
  if (unit === "hour") {
    time *= 60 * 60;
  }
  if (unit === "day") {
    time *= 60 * 60 * 24;
  }

  return date.getTime() + time;
};
