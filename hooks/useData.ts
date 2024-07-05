import { DataContext } from "@/providers/DataProvider";
import { useContext } from "react";

export const useData = () => {
  const {
    bills,
    currentBills,
    outstandingBills,
    reloadCurrentMonthBills,
    reloadAllBills,
  } = useContext(DataContext);

  return {
    bills,
    currentBills,
    outstandingBills,
    reloadCurrentMonthBills,
    reloadAllBills,
  };
};
