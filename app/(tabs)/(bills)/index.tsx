import { RootView } from "@/components/display/RootView";
import { useStyle } from "@/hooks/useStyle";
import { router } from "expo-router";
import { View, Button } from "react-native";

const Bills = () => {
  const { styles } = useStyle();

  return (
    <RootView>
      <View style={styles.rootBox}>
        <Button
          title="Insert a bill"
          onPress={() => router.push("/insert-bill")}
        />

        <Button
          title="Current bills"
          onPress={() => router.push("/current-bills")}
        />

        <Button
          title="Previous months bills"
          onPress={() => router.push("/previous-bills")}
        />

        <Button
          title="Next months bills"
          onPress={() => router.push("/next-bills")}
        />
      </View>
    </RootView>
  );
};

export default Bills;
