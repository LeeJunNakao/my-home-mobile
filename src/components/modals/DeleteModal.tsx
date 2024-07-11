import { View, Modal, Button } from "react-native";
import Typography from "@/components/Typography";
import { useStyle } from "@/hooks/useStyle";

type Props = {
  id: number;
  message: string;
  showConfirmModal: boolean;
  handleDelete: (id: number) => void;
  setShowConfirmModal: (v: boolean) => void;
};

const DeleteModal = ({
  id,
  message,
  showConfirmModal,
  handleDelete,
  setShowConfirmModal,
}: Props) => {
  const { colors } = useStyle();

  return (
    <Modal animationType="slide" visible={showConfirmModal}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Typography>{message}</Typography>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Button
            title="Delete"
            onPress={() => handleDelete(id)}
            color={colors.palette.critical}
          />
          <Button title="Cancel" onPress={() => setShowConfirmModal(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
