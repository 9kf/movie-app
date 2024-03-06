import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { appStyles } from "../styles";

const DEBOUNCE_TIMEOUT = 500;

interface ISearchInputProps {
  searchValue?: string;
  onChangeSearchTextCallback?: (text: string) => void;
}

export default function SearchInput({
  searchValue,
  onChangeSearchTextCallback,
}: ISearchInputProps) {
  const [value, setValue] = useState(searchValue ?? "");

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onChangeSearchTextCallback?.(value);
    }, DEBOUNCE_TIMEOUT);

    return () => clearTimeout(delayedSearch);
  }, [value]);

  const handleChangeText = (newText: string) => {
    setValue(newText);
  };

  return (
    <View style={styles.searchInputContainer}>
      <AntDesign name="search1" size={24} color="black" />
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        placeholder="search movie title"
        style={[appStyles.normal, { marginLeft: 8 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    padding: 12,
    margin: 12,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
});
