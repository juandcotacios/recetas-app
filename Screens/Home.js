import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {
  return (
    <LinearGradient colors={["#FFF3E0", "#FFE0B2"]} style={styles.container}>
      <Image
        source={{ uri: "https://img.pikbest.com/png-images/20241102/-22classic-restaurant-logo-with-chef-icon-22_11048989.png!sw800" }}
        style={styles.image}
      />
      <Text style={styles.title}>CookApp</Text>
      <Text style={styles.subtitle}>Descubre nuevas recetas 🍳</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Categorías")}>
        <Text style={styles.buttonText}>Explorar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  image:
  {
    width: 180,
    height: 180,
    marginBottom: 20
  },
  title:
  {
    fontSize: 36,
    fontWeight: "bold",
    color: "#E65100",
    marginBottom: 10
  },
  subtitle:
  {
    fontSize: 16,
    color: "#5D4037",
    marginBottom: 30,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#FF6F00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText:
  {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
});
