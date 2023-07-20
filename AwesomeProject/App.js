import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

const App = () => {
  const routing = useRoute(false);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default App;
