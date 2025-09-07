import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Categories from "./Screens/Categories";
/*import Recipes from "./Screens/Recipes";*/
/*import RecipeDetails from "./Screens/RecipeDetails";*/

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Categorías" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


