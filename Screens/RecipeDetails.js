import { useEffect, useState } from "react";
import { Text, Image, ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import Comentarios from "./ComentariosGoogle"; // 👈 importamos el módulo de comentarios

const AREA_MAP = {
  British: "United Kingdom", American: "United States", Italian: "Italy",
  Spanish: "Spain", French: "France", Indian: "India", Mexican: "Mexico",
  Chinese: "People's Republic of China", Japanese: "Japan", Filipino: "Philippines",
  Vietnamese: "Vietnam", Malaysian: "Malaysia", Croatian: "Croatia", Uruguayan: "Uruguay",
  Irish: "Ireland", Egyptian: "Egypt", Polish: "Poland", Jamaican: "Jamaica",
  Canadian: "Canada", Greek: "Greece", Moroccan: "Morocco", Dutch: "Holland",
  Turkish: "Turkey", Ukrainian: "Ukraine", Kenyan: "Kenya",
};

export default function RecipeDetails({ route }) {
  const { id } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        const meal = data.meals[0];
        setRecipe(meal);

        const mappedArea = AREA_MAP[meal.strArea] || meal.strArea;
        if (mappedArea) {
          const resCountry = await fetch(`https://restcountries.com/v3.1/name/${mappedArea}`);
          const country = await resCountry.json();
          setFlag(country[0]?.flags?.png || null);
        }
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  if (!recipe) return <ActivityIndicator size="large" color="#FF6F00" style={{ marginTop: 20 }} />;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />

      <View style={styles.header}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        {flag && <Image source={{ uri: flag }} style={styles.flag} />}
      </View>

      <Text style={styles.origin}>Origen: {recipe.strArea}</Text>

      <Text style={styles.sectionTitle}>Instrucciones:</Text>
      <Text style={styles.text}>{recipe.strInstructions}</Text>
      <Text style={styles.sectionTitle}>Calificaciones</Text>
      <Comentarios recipeId={id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA", padding: 10 },
  image: { width: "100%", height: 240, borderRadius: 12, marginBottom: 10 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 22, fontWeight: "bold", flex: 1, marginRight: 10 },
  flag: { width: 50, height: 35, borderRadius: 4 },
  origin: { fontSize: 16, fontWeight: "600", marginVertical: 8, color: "#FF6F00" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 12, marginBottom: 6 },
  text: { fontSize: 15, lineHeight: 22, color: "#333" },
});
