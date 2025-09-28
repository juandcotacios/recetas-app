import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet } from "react-native";

import Home from "./Screens/Home";
import Categories from "./Screens/Categories";
import Recipes from "./Screens/Recipes";
import RecipeDetails from "./Screens/RecipeDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Categorías"
          component={Categories}
          options={{
            headerTitle: () => (
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: "https://img.icons8.com/color/24/ingredients.png" }}
                  style={styles.icon}
                />
                <Text style={styles.headerTitle}>Categorías</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#FFE0B2" }, 
            headerTintColor: "#FF5722",
          }}
        />
        <Stack.Screen
          name="Recetas"
          component={Recipes}
          options={{
            headerTitle: () => (
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: "https://img.icons8.com/color/24/restaurant-menu.png" }}
                  style={styles.icon}
                />
                <Text style={styles.headerTitle}>Recetas</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#FFE0B2" },
            headerTintColor: "#FF5722",
          }}
        />
        <Stack.Screen
          name="Detalles"
          component={RecipeDetails}
          options={{
            headerTitle: () => (
              <View style={styles.headerContainer}>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/3534/3534606.png" }}
                  style={styles.icon}
                />
                <Text style={styles.headerTitle}>Detalles</Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#FFE0B2" },
            headerTintColor: "#FF5722",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
