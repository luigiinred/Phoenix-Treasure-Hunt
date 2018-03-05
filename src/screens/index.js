import { Navigation, ScreenVisibilityListener } from "react-native-navigation";

import LoginScreen from "./login";
import AccountScreen from "./account";
import HomeScreen from "./home";
import SitesScreen from "./sites";

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent(
    "phoenixtreasurehunt.LoginScreen",
    () => LoginScreen,
    store,
    Provider
  );

  Navigation.registerComponent(
    "phoenixtreasurehunt.AccountScreen",
    () => AccountScreen,
    store,
    Provider
  );

  Navigation.registerComponent(
    "phoenixtreasurehunt.SitesScreen",
    () => SitesScreen,
    store,
    Provider
  );

  Navigation.registerComponent(
    "phoenixtreasurehunt.HomeScreen",
    () => HomeScreen,
    store,
    Provider
  );
}
