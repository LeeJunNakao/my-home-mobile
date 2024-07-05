import {
  SnackbarContext,
  SnackbarVariants,
} from "@/providers/SnackbarProvider";
import { useContext, useEffect } from "react";

type ShowSnackbarArgs = {
  message: string;
  variant: SnackbarVariants;
};

export const useSnackbar = () => {
  const { visible, setMessage, setVariant, setVisible } =
    useContext(SnackbarContext);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  const showSnackbar = ({ message, variant }: ShowSnackbarArgs) => {
    setMessage(message);
    setVariant(variant);
    setVisible(true);
  };

  return { showSnackbar };
};
