import { View, TouchableOpacity, Text, Modal, FlatList } from "react-native";
import { useStyle } from "@/hooks/useStyle";
import Typography from "../Typography";
import { useState } from "react";

type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  title: string;
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  error?: boolean;
};

const Select = <T,>({ options, value, title, onChange, error }: Props<T>) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | undefined>();

  const { styles, colors } = useStyle();

  const selectedOption = options.find(
    (o) => String(o.value) === String(selectedItem)
  );

  const onItemPress = (item: T) => {
    onChange(item);
    setSelectedItem(item);
    setShowOptions(false);
  };

  return (
    <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <View>
        <Typography>{title}</Typography>
      </View>

      <View
        style={{
          ...styles.border,
          height: 32,
          marginBottom: "auto",
          borderColor: error ? colors.border.error : colors.border.primary,
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#efefef",
            height: "100%",
          }}
          onPress={() => setShowOptions(true)}
        >
          <Text>{selectedOption?.label}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showOptions} transparent animationType="slide">
        <TouchableOpacity
          onPress={() => setShowOptions(false)}
          style={{ backgroundColor: "white" }}
        >
          <View>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onItemPress(item.value)}
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "row",
                    borderBottomWidth: 2,
                    borderColor: colors.border.primary,
                    padding: 5,
                  }}
                >
                  <Typography>{item.label}</Typography>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Select;
