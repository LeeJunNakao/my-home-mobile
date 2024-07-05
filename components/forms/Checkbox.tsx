import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useStyle } from "@/hooks/useStyle";

type Props = {
  text: string;
  error?: boolean;
  onChange: (v: boolean) => void;
  value?: boolean;
  inputProps: any;
};

const Checkbox = ({ value, text, error, onChange }: Props) => {
  const { colors } = useStyle();

  return (
    <BouncyCheckbox
      size={25}
      fillColor={colors.fill.primary}
      unFillColor="#FFFFFF"
      text={text}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{
        textDecorationLine: "none",
        color: error ? colors.palette.critical : colors.text,
      }}
      isChecked={value}
      onPress={(isChecked: boolean) => {
        onChange(isChecked);
      }}
    />
  );
};

export default Checkbox;
