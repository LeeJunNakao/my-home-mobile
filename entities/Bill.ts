export type Bill = {
  id: number;
  name: string;
  paymentValue: number;
  dueDate: Date;
  isMonthly: boolean;
  isPaid: boolean;
};
