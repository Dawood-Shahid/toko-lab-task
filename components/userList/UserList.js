import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  useGetSearchUsersServiceQuery,
  useGetUsersServiceQuery,
} from "../../service/user.service";
import { clearSelectedUser } from "../../store/user.slice";
import SearchBar from "../searchBar/SearchBar";
import UserItem from "../userItem/UserItem";
import UserModal from "../userModal/UserModal";

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users, error, isLoading } = useGetUsersServiceQuery();
  const { data: searchResults, isLoading: searching } =
    useGetSearchUsersServiceQuery(searchTerm, {
      skip: searchTerm.length === 0,
    });

  const dataToRender = searchTerm.length > 0 ? searchResults?.items : users;

  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);

  if (error) {
    return <Text style={styles.error}>Failed to load users</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onSearch={setSearchTerm} />
      {isLoading | searching ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={dataToRender}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserItem user={item} />}
        />
      )}
      {selectedUser && (
        <UserModal
          username={selectedUser}
          onClose={() => dispatch(clearSelectedUser())}
        />
      )}
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
