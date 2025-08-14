import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetUsersServiceQuery } from "../../service/user.service";
import SearchBar from "../searchBar/SearchBar";

export default function UserList() {
  const { data: users, error, isLoading } = useGetUsersServiceQuery();

  const [searchTerm, setSearchTerm] = useState("");
  console.log("🚀 ~ UserList ~ searchTerm:", searchTerm);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>Failed to load users</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onSearch={setSearchTerm} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.login}</Text>
                <View style={styles.linkContainer}>
                  <Text style={styles.link}>{item.html_url}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red", textAlign: "center", marginTop: 20 },
  selectedUser: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clear: { color: "blue" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
});
