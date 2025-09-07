import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Recipes({ route, navigation }) {
  const { category } = route.params; // recibimos la categoría desde Categorías
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => setRecipes(data.meals))
      .catch(err => console.error(err));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Detalles", { id: item.idMeal })}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <Text style={styles.text}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#FFF8E1" },
  card: {
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#FFE0B2",
    borderRadius: 10,
    padding: 10,
  },
  image: { width: "100%", height: 200, borderRadius: 10 },
  text: { marginTop: 5, fontSize: 16, fontWeight: "bold", textAlign: "center", color : "#000000ff" },
});
