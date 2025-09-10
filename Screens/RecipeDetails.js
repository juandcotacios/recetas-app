import { useEffect, useState } from "react";
import { Text, Image, ScrollView, StyleSheet, View } from "react-native";


const AREA_MAP = {
  "British": "United Kingdom",
  "American": "United States",
  "Italian": "Italy",
  "Spanish": "Spain",
  "French": "France",
  "Indian": "India",
  "Mexican": "Mexico",
  "Chinese": "People's Republic of China",
  "Japanese": "Japan",
  "Filipino": "Philippines",
  "Vietnamese":"Vietnam",
  "Malaysian":"Malaysia",
  "Croatian":"Croatia",
  "Uruguayan":"Uruguay",
  "Irish":"Ireland",
  "Egyptian":"Egypt",
  "Polish":"Poland",
  "Jamaican":"Jamaica",
  "Canadian":"Canada",
  "Greek":"Greece",
  "Moroccan":"Morocco",
  "Dutch":"Holland",
  "Turkish":"Turkey",
  "Ukrainian":"Ukraine",
  "Kenyan":"Kenya",
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

        // normalizamos el área
        const mappedArea = AREA_MAP[meal.strArea] || meal.strArea;

        if (mappedArea) {
          const resCountry = await fetch(`https://restcountries.com/v3.1/name/${mappedArea}`);
          const country = await resCountry.json();
          setFlag(country[0]?.flags?.png || null);
        }
      } catch (e) {
        console.error(e);
        setFlag(null);
      }
    };
    load();
  }, []);

  if (!recipe) return <Text>Cargando...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />

      <View style={styles.flagContainer}>
        {flag ? (
          <Image source={{ uri: flag }} style={styles.flag} />
        ) : (
          <Text style={styles.noFlag}>Sin bandera</Text>
        )}
      </View>

      <Text style={styles.subtitle}>Origen: {recipe.strArea}</Text>

      <Text style={styles.subtitle}>Instrucciones:</Text>
      <Text style={styles.text}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#FFF8E1" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  image: { width: "100%", height: 200, borderRadius: 10 },
  flagContainer: { marginVertical: 10, alignItems: "center" },
  flag: { width: 60, height: 40 },
  noFlag: { fontSize: 14, color: "gray", fontStyle: "italic" },
  subtitle: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  text: { fontSize: 14, marginTop: 5 },
});
