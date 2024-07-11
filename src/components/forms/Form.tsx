import { PropsWithChildren } from "react";
import { View, Button } from "react-native";

type Props = {
  buttonText?: string;
  form: any;
  onSubmit: (v: any) => void;
};

export default function Form({
  children,
  buttonText,
  form,
  onSubmit,
}: PropsWithChildren<Props>) {
  return (
    <View style={{ padding: 10, gap: 20 }}>
      {children}
      <Button
        title={buttonText || "Submit"}
        onPress={form.handleSubmit(onSubmit)}
      />
    </View>
  );
}
