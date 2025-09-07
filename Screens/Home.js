import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CookApp</Text>
      <Image
        source={{ uri: "https://img.pikbest.com/png-images/20241102/-22classic-restaurant-logo-with-chef-icon-22_11048989.png!sw800" }}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Categorías")}
      >
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF5722",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FF5722",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
