import { Bill } from "@/entities/Bill";

export const BillDTO = (bill: Bill): Bill => {
  return {
    ...bill,
    isMonthly: Boolean(bill.isMonthly),
    dueDate: new Date(bill.dueDate),
    isPaid: !!bill.isPaid,
  };
};
