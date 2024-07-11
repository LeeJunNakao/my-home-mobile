import { NotificationContext } from "@/providers/NotificationProvider";
import { useContext } from "react";

export const useNotification = () => {
  const { notificatePendingBills, removePendingBillsNotification } =
    useContext(NotificationContext);

  return { notificatePendingBills, removePendingBillsNotification };
};
