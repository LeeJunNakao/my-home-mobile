import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Bills", headerShown: false }}
      />
      <Stack.Screen
        name="insert-bill"
        options={{ title: "Insert bill", headerShown: false }}
      />
      <Stack.Screen
        name="current-bills"
        options={{ title: "Current month bills", headerShown: false }}
      />
      <Stack.Screen
        name="previous-bills"
        options={{ title: "Previous month bills", headerShown: false }}
      />
      <Stack.Screen
        name="next-bills"
        options={{ title: "Next month bills", headerShown: false }}
      />
    </Stack>
  );
}
