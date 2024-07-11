import { View, TextInput } from "react-native";
import { useStyle } from "@/hooks/useStyle";
import Typography from "../Typography";
import { maskCurrency } from "@/utils/parser";

type Props = {
  label: string;
  value?: string | number;
  placeholder?: string;
  onChange: (v: any) => void;
  inputProps?: any;
  error?: boolean;
  type?: "default" | "currency";
};

export default function TextField({
  label,
  placeholder,
  onChange,
  inputProps,
  error,
  type,
}: Props) {
  const { colors, styles } = useStyle();

  console.log();
  return (
    <View style={{ flexDirection: "column", height: 60 }}>
      <Typography>{label}</Typography>

      <TextInput
        onChangeText={(v) =>
          onChange(type === "currency" ? maskCurrency(v) : v)
        }
        style={{
          ...styles.border,
          paddingLeft: 5,
          borderColor: error ? colors.border.error : styles.border.borderColor,
        }}
        placeholder={placeholder}
        {...inputProps}
      />
    </View>
  );
}
