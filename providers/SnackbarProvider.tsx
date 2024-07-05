import { PropsWithChildren, createContext, useState } from "react";
import { Snackbar } from "react-native-paper";

export type SnackbarVariants = "success" | "error";

export const SnackbarContext = createContext({
  message: "",
  visible: false,
  variant: "",
  setVariant: (variant: SnackbarVariants) => {},
  setVisible: (visible: boolean) => {},
  setMessage: (message: string) => {},
});

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<SnackbarVariants>("success");

  return (
    <>
      <SnackbarContext.Provider
        value={{
          message,
          visible,
          variant,
          setMessage,
          setVisible,
          setVariant,
        }}
      >
        {children}
      </SnackbarContext.Provider>

      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        {message}
      </Snackbar>
    </>
  );
};
