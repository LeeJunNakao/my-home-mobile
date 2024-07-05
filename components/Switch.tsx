import { useEffect, useState } from "react";
import { Switch as SwitchComponent, View } from "react-native";
import Typography from "./Typography";

type Props = {
  isOnText: string;
  isOffText: string;
  value?: boolean;
  onChange: (v: boolean) => void;
};

const Switch = ({ isOnText, isOffText, value, onChange }: Props) => {
  const [isOn, setIsOn] = useState(false);

  const switchValue = value ? value : isOn;

  const onHandleChange = (value: boolean) => {
    setIsOn(value);
    onChange(value);
  };

  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
      <SwitchComponent value={switchValue} onValueChange={onHandleChange} />
      <Typography>{switchValue ? isOnText : isOffText}</Typography>
    </View>
  );
};

export default Switch;
