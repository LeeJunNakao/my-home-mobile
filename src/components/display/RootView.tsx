import { View } from "react-native";
import Constants from "expo-constants";
import { PropsWithChildren } from "react";

export const RootView = ({ children }: PropsWithChildren) => {
  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      {children}
    </View>
  );
};
