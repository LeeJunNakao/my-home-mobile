import { Stack } from "expo-router";

const InsertBillLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default InsertBillLayout;
