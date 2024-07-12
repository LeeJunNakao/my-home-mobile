import { Bill } from "@/entities/Bill";
import { deleteByIdStatement } from "@/utils/database/delete";
import {
  getCurrentMonthStatement,
  getFilteredByStatement,
  getStatement,
} from "@/utils/database/find";
import { BillInsertDTo, insertBillStatement } from "@/utils/database/insert";
import { updateColumnStatement } from "@/utils/database/update";
import { BillDTO } from "@/utils/entity/bill";
import { maskCurrencyToInt, toCurrencyInteger } from "@/utils/parser";
import { SQLiteDatabase } from "expo-sqlite";

export type ServiceCreateBillDto = Omit<BillInsertDTo, "paymentValue"> & {
  paymentValue: string | number;
};

class BillService {
  constructor(private db: SQLiteDatabase) {}

  async createBill(bill: ServiceCreateBillDto) {
    const parsedBill = {
      ...bill,
      paymentValue:
        typeof bill.paymentValue === "number"
          ? toCurrencyInteger(bill.paymentValue)
          : maskCurrencyToInt(bill.paymentValue),
    };

    const { execute, statement } = await insertBillStatement(
      this.db,
      parsedBill
    );

    try {
      await execute();
    } finally {
      await statement.finalizeAsync();
    }
  }

  async getCurrentMonthBills(): Promise<Bill[]> {
    const currentMonth = new Date();

    const { execute, statement } = await getCurrentMonthStatement(
      this.db,
      "bill",
      { month: currentMonth.getMonth() + 1, column: "dueDate" }
    );

    try {
      const bills = (await execute()) as Bill[];

      return bills.map(BillDTO);
    } finally {
      await statement.finalizeAsync();
    }
  }

  async getAllBills(): Promise<Bill[]> {
    const { execute, statement } = await getStatement(this.db, "bill");

    try {
      const bills = (await execute()) as Bill[];

      return bills.map(BillDTO);
    } finally {
      await statement.finalizeAsync();
    }
  }

  async getAllOutstandingBills(): Promise<Bill[]> {
    const { execute, statement } = await getFilteredByStatement<Bill>(
      this.db,
      "bill",
      {
        where: { isPaid: false },
        orderBy: { field: "dueDate", order: "ASC" },
      }
    );

    try {
      const bills = (await execute()) as Bill[];

      return bills.map(BillDTO);
    } catch (error) {
      return [];
    } finally {
      await statement.finalizeAsync();
    }
  }

  async updatePaymentStatus(id: number, status: boolean) {
    const { execute, statement } = await updateColumnStatement(
      this.db,
      "bill",
      {
        id,
        column: "isPaid",
        value: status,
      }
    );

    try {
      await execute();
    } finally {
      await statement.finalizeAsync();
    }
  }

  async deleteBill(id: number) {
    const { execute, statement } = await deleteByIdStatement(this.db, id);

    try {
      await execute();
    } finally {
      await statement.finalizeAsync();
    }
  }
}

export default BillService;
