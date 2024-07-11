import { PropsWithChildren, createContext, useEffect, useState } from "react";
import notifee, { RepeatFrequency, TriggerType } from "@notifee/react-native";
import { sumDate } from "@/utils/date-parser";

type NotificationIds = {
  billsPending: string | undefined;
};

export const NotificationContext = createContext({
  notificatePendingBills: async () => {},
  removePendingBillsNotification: async () => {},
});

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notificationChannel, setNotificationChannel] =
    useState<NotificationIds>({ billsPending: undefined });
  const [notificationTriggerIds, setNotificationTriggerIds] =
    useState<NotificationIds>({ billsPending: undefined });

  const initiate = async () => {
    try {
      await notifee.requestPermission();
      const billsPending = await notifee.createChannel({
        id: "bills-pending",
        name: "Default Channel",
      });

      setNotificationChannel({ billsPending });
    } catch (error) {
      console.error("Failed to create bills-pending channel");
    }
  };

  useEffect(() => {
    initiate();
  }, []);

  const notificatePendingBills = async () => {
    try {
      const scheduleDate = new Date();
      scheduleDate.setHours(10);
      scheduleDate.setMinutes(0);
      scheduleDate.setSeconds(0);

      if (
        !notificationTriggerIds.billsPending &&
        notificationChannel.billsPending
      ) {
        const notificationId = await notifee.createTriggerNotification(
          {
            id: "schedule-bills-pending",
            title: "Bills with Pending Payments",
            body: "Some bills are awaiting payment. Click to check.",
            android: {
              channelId: notificationChannel.billsPending,
              smallIcon: "ic_my_home_notif",
            },
          },
          {
            type: TriggerType.TIMESTAMP,
            timestamp: sumDate(scheduleDate, 1, "day"),
            repeatFrequency: RepeatFrequency.DAILY,
          }
        );

        setNotificationTriggerIds({ billsPending: notificationId });
      }
    } catch (error) {
      console.error(
        "Failed to create regular pending bill notification",
        error
      );
    }
  };

  const removePendingBillsNotification = async () => {
    if (notificationTriggerIds.billsPending) {
      try {
        await notifee.cancelNotification(notificationTriggerIds.billsPending);
      } catch (error) {
        console.error("Failed to remove pending bills notification");
      }
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notificatePendingBills, removePendingBillsNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
