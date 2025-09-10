import { useEffect, useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity, ImageBackground,
  StyleSheet, ActivityIndicator
} from "react-native";

export default function Categories({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Recetas", { category: item.strCategory })}
      activeOpacity={0.8}
    >
      <ImageBackground source={{ uri: item.strCategoryThumb }} style={styles.image} imageStyle={{ borderRadius: 12 }}>
        <View style={styles.overlay}>
          <Text style={styles.text}>{item.strCategory}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#FF6F00" style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
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
  card: { flex: 1, margin: 5, height: 150, borderRadius: 12, overflow: "hidden", elevation: 3, backgroundColor: "#fff" },
  image: { flex: 1, justifyContent: "flex-end" },
  overlay: { backgroundColor: "rgba(0,0,0,0.4)", padding: 6 },
  text: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
