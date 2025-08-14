import React from "react";
import { Text, View } from "react-native";
import { useGetUsersServiceQuery } from "../../service/user.service";

export default function UserList() {
  const { data: users, error, isLoading } = useGetUsersServiceQuery();
  console.log("🚀 ~ UserList ~ users:", { users, error, isLoading });

  return (
    <View style={{ flex: 1 }}>
      <Text>React Native Expo App</Text>
    </View>
  );
}
