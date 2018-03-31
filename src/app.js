import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { registerScreens } from "./screens";
import { store, persistor } from "./store";

registerScreens(store, Provider);

const tabs = [
  {
    label: "Home",
    screen: "phoenixtreasurehunt.HomeScreen",
    icon: require("../icons/home.png")
  },
  {
    label: "Sites",
    screen: "phoenixtreasurehunt.SitesScreen",
    icon: require("../icons/sites.png"),

    title: "Sites"
  },
  {
    label: "Account",
    screen: "phoenixtreasurehunt.AccountScreen",
    icon: require("../icons/user.png"),
    title: "Account"
  }
];

export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));
    this.onStoreUpdate();
  }

  onStoreUpdate() {
    const { isloggedIn } = store.getState().auth;
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.isloggedIn !== isloggedIn) {
      this.isloggedIn = isloggedIn;

      this.startApp(isloggedIn);
    }
  }

  startApp(isloggedIn) {
    if (isloggedIn) {
      Navigation.startTabBasedApp({
        tabs,
        appStyle: {
          navBarBackgroundColor: "#FFFFFF",
          navBarTranslucent: true
        },
        tabsStyle: {
          drawUnderTabBar: false
        },
        passProps: {
          persistor
        },
        animationType: "slide-down"
      });
    } else {
      Navigation.startSingleScreenApp({
        screen: {
          title: "Login",
          screen: "phoenixtreasurehunt.LoginScreen"
        },
        passProps: {
          persistor
        },
        animationType: "slide-down",
        appStyle: {}
      });
    }
  }
}
