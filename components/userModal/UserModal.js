import React from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetUserDetailsServiceQuery } from "../../service/user.service";

export default function UserModal({ username, onClose }) {
  const { data, isLoading, error } = useGetUserDetailsServiceQuery(username);

  return (
    <Modal transparent={true} animationType="fade">
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.modalContainer}>
          {isLoading && <Text>Loading...</Text>}
          {error && <Text>Error loading details</Text>}
          {data && (
            <>
              <Image source={{ uri: data.avatar_url }} style={styles.avatar} />
              <Text style={styles.name}>{data.name || "No Name"}</Text>
              <Text>Followers: {data.followers}</Text>
              <Text>Following: {data.following}</Text>
              <Text>Location: {data.location || "N/A"}</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Text style={{ color: "#fff" }}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  closeBtn: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
  },
});
