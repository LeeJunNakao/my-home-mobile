import { useState } from "react";
import { View, TouchableHighlight } from "react-native";
// import { useSnackbar } from "@/hooks/useSnackbar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Typography from "@/components/Typography";
import { Bill } from "@/entities/Bill";
import { useStyle } from "@/hooks/useStyle";
import { maskCurrency } from "@/utils/parser";
import Switch from "@/components/Switch";
// import * as BillService from "@/services/bill";
// import DeleteModal from "@/components/modals/DeleteModal";
// import { useData } from "@/hooks/useData";
import { isCurrentMonth } from "@/utils/date-parser";

type Props = {
  data: Bill;
  mode: "display" | "edit";
};

const BillCard = ({ data, mode }: Props) => {
  const { styles, colors } = useStyle();
  //   const { showSnackbar } = useSnackbar();
  //   const { reloadAllBills, reloadCurrentMonthBills } = useData();

  const [isPaid, setIsPaid] = useState(data.isPaid);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isOverdue = !data.isPaid && data.dueDate < new Date();

  const handlePaymentStatusChange = async (status: boolean) => {
    try {
      //   await BillService.updatePaymentStatus(data.id, status);
      setIsPaid(status);

      //   if (isCurrentMonth(data.dueDate)) {
      //     reloadCurrentMonthBills();
      //   } else {
      //     reloadAllBills();
      //   }
    } catch (error) {
      //   showSnackbar({
      //     variant: "error",
      //     message: "Failed to update the payment status",
      //   });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      //   await BillService.deleteBill(id);
      //   if (isCurrentMonth(data.dueDate)) {
      //     reloadCurrentMonthBills();
      //   } else {
      //     reloadAllBills();
      //   }
    } catch (error) {
      //   showSnackbar({
      //     variant: "error",
      //     message: "Failed to delete the bill",
      //   });
    }
  };

  return (
    <View
      style={[
        styles.border,
        styles.itemBox,
        {
          borderColor: isOverdue ? colors.border.error : colors.border.primary,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Typography>{data.name}</Typography>
        <Typography>{data.dueDate.toLocaleDateString()}</Typography>
        <Typography>$ {maskCurrency(data.paymentValue)}</Typography>
      </View>
      {mode === "edit" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableHighlight>
            <FontAwesome
              size={28}
              name="trash"
              color={colors.palette.critical}
              onPress={() => setShowConfirmModal(true)}
            />
          </TouchableHighlight>
          <Switch
            onChange={handlePaymentStatusChange}
            value={isPaid}
            isOnText="Paid"
            isOffText="Not paid"
          />
        </View>
      )}

      {/* <DeleteModal
        id={data.id}
        message="Are you sure you want to delete this bill?"
        showConfirmModal={showConfirmModal}
        handleDelete={handleDelete}
        setShowConfirmModal={setShowConfirmModal}
      /> */}
    </View>
  );
};

export default BillCard;
