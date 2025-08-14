import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDispatch } from "react-redux";

import { setSelectedUser } from "../../store/user.slice";

export default function UserItem({ user }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => dispatch(setSelectedUser(user.login))}
    >
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{user.login}</Text>
        <TouchableOpacity
          style={styles.linkContainer}
          activeOpacity={0.7}
          onPress={() => Linking.openURL(user.html_url)}
        >
          <Text style={styles.link}>{user.html_url}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  linkContainer: { width: "65%" },
  link: { color: "#1e90ff", textDecorationLine: "underline" },
});
