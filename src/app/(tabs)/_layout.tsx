import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(bills)"
        options={{
          title: "Bills",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="dollar" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
