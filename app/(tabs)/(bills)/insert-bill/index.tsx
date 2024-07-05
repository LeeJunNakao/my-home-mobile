import { useState } from "react";
import * as yup from "yup";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { View, Button } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import TextField from "@/components/forms/TextField";
import Form from "@/components/forms/Form";
import { useStyle } from "@/hooks/useStyle";
import DateField from "@/components/forms/DateField";
import { dateOutputParser, inputFormAdapter } from "@/utils/form";
import BillService from "@/services/bill";
import { useSnackbar } from "@/hooks/useSnackbar";
import Checkbox from "@/components/forms/Checkbox";
import { useData } from "@/hooks/useData";
import { isCurrentMonth } from "@/utils/date-parser";

const billSchema = yup.object({
  name: yup.string().required("Required field"),
  day: yup.number().required("Required field"),
  month: yup.number().required("Required field"),
  year: yup.number().required().min(1990),
  paymentValue: yup.string().required("Required field"),
  isMonthly: yup.bool(),
});

const InsertBillScreen = () => {
  const db = useSQLiteContext();
  const billService = new BillService(db);

  const { showSnackbar } = useSnackbar();
  const { dimensions } = useStyle();
  const { reloadCurrentMonthBills, reloadAllBills } = useData();

  const [formIdx, setFormIdx] = useState(1);

  const form = useForm({
    resolver: yupResolver(billSchema),
  });

  const resetForm = () => {
    form.reset();
    form.setValue("paymentValue", "0");
    setFormIdx(formIdx + 1);
  };

  const handleSubmit = async (dto: yup.InferType<typeof billSchema>) => {
    try {
      const dueDate = dateOutputParser(dto.year, dto.month, dto.day);

      await billService.createBill({
        name: dto.name,
        dueDate,
        paymentValue: dto.paymentValue,
        isMonthly: !!dto.isMonthly,
        isPaid: false,
      });

      showSnackbar({
        message: "Bill successfully created!",
        variant: "success",
      });

      resetForm();

      if (isCurrentMonth(dueDate)) {
        reloadCurrentMonthBills();
      } else {
        reloadAllBills();
      }
    } catch (error) {
      console.log(error);
      showSnackbar({ message: "Filed to create bill", variant: "error" });
    }
  };

  return (
    <View key={formIdx}>
      <Form form={form} onSubmit={handleSubmit}>
        <View>
          <TextField label="Bill name" {...inputFormAdapter(form, "name")} />
        </View>

        <View
          style={{
            width: "100%",
            height: dimensions.forms.lineHeight,
          }}
        >
          <DateField
            dayProps={inputFormAdapter(form, "day")}
            monthProps={inputFormAdapter(form, "month")}
            yearProps={inputFormAdapter(form, "year")}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextField
              label="Payment value"
              placeholder="R$ 0.00"
              type="currency"
              {...inputFormAdapter(
                form,
                "paymentValue",
                form.watch("paymentValue")
              )}
            />
          </View>

          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: 40,
            }}
          >
            <Checkbox
              text="Monthly"
              {...inputFormAdapter(form, "isMonthly", form.watch("isMonthly"))}
            />
          </View>
        </View>
      </Form>
      <View style={{ paddingHorizontal: 10 }}>
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </View>
  );
};

export default InsertBillScreen;
