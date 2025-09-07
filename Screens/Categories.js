import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Categories({ navigation }) {
  const [categories, setCategories] = useState([]);

  // Llamamos al API al iniciar
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error(err));
  }, []);

  // Cómo se dibuja cada categoría
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Recetas", { category: item.strCategory })}
    >
      <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
      <Text style={styles.text}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#b76417ff" },
  card: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    backgroundColor: "#e18a3aff",
    borderRadius: 10,
    padding: 10,
  },
  image: { width: 156, height: 156, borderRadius: 10 },
  text: { marginTop: 5, fontSize: 16, fontWeight: "bold", color : "#000000ff" },
});
