import "react-native-reanimated";
import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useColorScheme } from "@/hooks/useColorScheme";
import { createTables } from "@/utils/database/initializeDatabase";
import DataProvider from "@/providers/DataProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider
      databaseName={process.env.EXPO_PUBLIC_DATABASE as string}
      onInit={createTables}
    >
      <DataProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <NotificationProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ title: "My Home" }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </NotificationProvider>
        </ThemeProvider>
      </DataProvider>
    </SQLiteProvider>
  );
}
