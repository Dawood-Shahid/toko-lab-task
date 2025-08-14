import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(text.trim());
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search GitHub Users..."
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});
