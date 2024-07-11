import { View, FlatList, Button } from "react-native";
import notifee from "@notifee/react-native";

import SectionDisplay from "@/components/display/SectionDisplay";
import Typography from "@/components/Typography";
import { useStyle } from "@/hooks/useStyle";
import { RootView } from "@/components/display/RootView";
import BillCard from "@/components/display/BillCard";
import { useData } from "@/hooks/useData";
import { useNotification } from "@/hooks/useNotification";
import { useEffect } from "react";

const NoOutstandingBillsMessage = () => {
  const { styles } = useStyle();

  return (
    <View style={[styles.border, styles.rootBox]}>
      <Typography>
        There aren't any outstanding bills for the current month yet
      </Typography>
    </View>
  );
};

const HomeScreen = () => {
  const { dimensions } = useStyle();
  const { outstandingBills } = useData();
  const { notificatePendingBills, removePendingBillsNotification } =
    useNotification();

  const scheduleNotification = async () => {
    if (outstandingBills.length) {
      await notificatePendingBills();
    } else {
      removePendingBillsNotification();
    }
  };

  useEffect(() => {
    scheduleNotification();
  }, [outstandingBills]);

  return (
    <RootView>
      <SectionDisplay title="Outstanding bills">
        {outstandingBills.length ? (
          <FlatList
            data={outstandingBills}
            renderItem={({ item }) => <BillCard data={item} mode="display" />}
            contentContainerStyle={{ gap: dimensions.gap.default }}
          />
        ) : (
          <NoOutstandingBillsMessage />
        )}
      </SectionDisplay>
    </RootView>
  );
};

export default HomeScreen;
