import "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import UserList from "../components/userList/UserList";
import { store } from "../store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ minHeight: "100%" }}>
        <UserList />
      </SafeAreaView>
    </Provider>
  );
}
