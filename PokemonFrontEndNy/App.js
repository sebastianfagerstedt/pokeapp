import * as React from "react";
import { Provider } from "react-redux";
import AppNavigator from "./AppNavigator";
import store from "./store";
import { disableConsoleMethods } from "./utils";

const disableLogs = false; //(process.env.NODE_ENV === "production")

export default function App() {
  if (disableLogs) {
    disableConsoleMethods();
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
