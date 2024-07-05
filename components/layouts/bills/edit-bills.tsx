import { Button, View, FlatList } from "react-native";
import { router } from "expo-router";
import { useData } from "@/hooks/useData";
import Typography from "@/components/Typography";
import { useStyle } from "@/hooks/useStyle";
import BillCard from "@/components/display/BillCard";
import { isNextMonth, isPreviousMonth } from "@/utils/date-parser";
import { sortBy } from "@/utils/array-parser";
import { RootView } from "@/components/display/RootView";
import NoBillMessage from "./components/NoBillMessage";

type Props = {
  mode: "current" | "previous" | "next";
};

const EditBillsLayout = ({ mode }: Props) => {
  const { currentBills, bills } = useData();

  const { styles } = useStyle();

  const getTitle = () => {
    if (mode === "previous") {
      return "Overdued bills";
    }

    if (mode === "next") {
      return "Upcoming bills";
    }

    return `Bills of ${new Date().toLocaleDateString("default", {
      month: "long",
    })}`;
  };

  const getBillsToDisplay = () => {
    if (mode === "previous") {
      return sortBy(
        bills.filter((b) => isPreviousMonth(b.dueDate)),
        "dueDate",
        "DESC"
      );
    }

    if (mode === "next") {
      return sortBy(
        bills.filter((b) => isNextMonth(b.dueDate)),
        "dueDate",
        "ASC"
      );
    }

    return currentBills;
  };

  return (
    <RootView>
      <View style={styles.rootBox}>
        <Typography>{getTitle()}</Typography>
        {currentBills.length ? (
          <FlatList
            data={getBillsToDisplay()}
            renderItem={({ item }) => <BillCard data={item} mode="edit" />}
            contentContainerStyle={{ gap: 10 }}
          />
        ) : (
          <NoBillMessage />
        )}

        <Button title="Back" onPress={() => router.back()} />
      </View>
    </RootView>
  );
};

export default EditBillsLayout;
