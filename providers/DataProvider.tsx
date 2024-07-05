import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Bill } from "@/entities/Bill";
import { useSnackbar } from "@/hooks/useSnackbar";
import BillService from "@/services/bill";

export const DataContext = createContext({
  bills: [] as Bill[],
  currentBills: [] as Bill[],
  outstandingBills: [] as Bill[],
  reloadCurrentMonthBills: () => {},
  reloadAllBills: () => {},
});

const DataProvider = ({ children }: PropsWithChildren) => {
  const db = useSQLiteContext();
  const billService = new BillService(db);
  const { showSnackbar } = useSnackbar();

  const [bills, setBills] = useState<Bill[]>([]);
  const [currentBills, setCurrentBills] = useState<Bill[]>([]);
  const [outstandingBills, setOutstandingBills] = useState<Bill[]>([]);

  const loadAllBills = async () => {
    try {
      const bills = await billService.getAllBills();
      setBills(bills);
    } catch (error) {
      showSnackbar({ variant: "error", message: "Failed to load bills" });
    }
  };

  const loadCurrentMonthBills = async () => {
    try {
      const bills = await billService.getCurrentMonthBills();
      setCurrentBills(bills);
    } catch (error) {
      showSnackbar({ variant: "error", message: "Failed to load bills" });
    }
  };

  const loadOutstandingBills = async () => {
    try {
      const outstandingBills = await billService.getAllOutstandingBills();
      setOutstandingBills(outstandingBills);
    } catch (error) {
      showSnackbar({
        variant: "error",
        message: "Failed to load outstanding bills",
      });
    }
  };

  useEffect(() => {
    loadCurrentMonthBills();
    loadOutstandingBills();
    loadAllBills();
  }, []);

  useEffect(() => {
    loadOutstandingBills();
  }, [bills, currentBills]);

  return (
    <DataContext.Provider
      value={{
        bills,
        currentBills,
        outstandingBills,
        reloadCurrentMonthBills: loadCurrentMonthBills,
        reloadAllBills: loadAllBills,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
