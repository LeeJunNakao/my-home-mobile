import { View } from "react-native";
import TextField from "./TextField";
import Select from "./Select";

type Props = {
  dayProps?: any;
  monthProps?: any;
  yearProps?: any;
};

const DateField = ({ dayProps, monthProps, yearProps }: Props) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
        gap: 5,
        height: 500,
      }}
    >
      <View style={{ flex: 1 }}>
        <Select
          title="Day"
          options={[...new Array(31).keys()].map((day) => ({
            label: String(day + 1),
            value: day + 1,
          }))}
          {...dayProps}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Select
          title="Month"
          options={[
            { label: "JAN", value: 0 },
            { label: "FEB", value: 1 },
            { label: "MAR", value: 2 },
            { label: "APR", value: 3 },
            { label: "MAY", value: 4 },
            { label: "JUN", value: 5 },
            { label: "JUL", value: 6 },
            { label: "AUG", value: 7 },
            { label: "SEP", value: 8 },
            { label: "OCT", value: 9 },
            { label: "NOV", value: 10 },
            { label: "DEC", value: 11 },
          ]}
          {...monthProps}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TextField label="Year" {...yearProps} />
      </View>
    </View>
  );
};

export default DateField;
