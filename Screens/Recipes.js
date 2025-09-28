import { useEffect, useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity, ImageBackground,
  StyleSheet, ActivityIndicator
} from "react-native";

export default function Recipes({ route, navigation }) {
  const { category } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => setRecipes(data.meals))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Detalles", { id: item.idMeal })}
      activeOpacity={0.85}
    >
      <ImageBackground source={{ uri: item.strMealThumb }} style={styles.image} imageStyle={{ borderRadius: 10 }}>
        <View style={styles.overlay}>
          <Text style={styles.text}>{item.strMeal}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#FF6F00" style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA", padding: 10 },
  row: { justifyContent: "space-between" },
  card: { flex: 1, margin: 5, height: 180, borderRadius: 10, overflow: "hidden", elevation: 3, backgroundColor: "#fff" },
  image: { flex: 1, justifyContent: "flex-end" },
  overlay: { backgroundColor: "rgba(0,0,0,0.45)", padding: 6 },
  text: { color: "#fff", fontWeight: "bold", fontSize: 14, textAlign: "center" },
});
