import { Stack } from "expo-router";

const CurrentBillsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CurrentBillsLayout;
