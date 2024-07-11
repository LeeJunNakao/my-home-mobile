import { PropsWithChildren } from "react";
import { Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  fieldTitle: {
    fontSize: 14,
  },
  body: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 24,
  },
});

type Props = {
  variant?: keyof typeof styles;
};

const Typography = ({ variant, children }: PropsWithChildren<Props>) => {
  const selectedStyle = variant ? styles[variant] : styles.body;

  return (
    <View>
      <Text style={selectedStyle}>{children}</Text>
    </View>
  );
};

export default Typography;
