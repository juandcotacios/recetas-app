import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Categories from "./Screens/Categories";
import Recipes from "./Screens/Recipes";
import RecipeDetails from "./Screens/RecipeDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Categorías" component={Categories} />
        <Stack.Screen name="Recetas" component={Recipes} />
        <Stack.Screen name="Detalles" component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


