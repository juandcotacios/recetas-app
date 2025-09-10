import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const API_URL = "http://192.168.1.14:3000"; // usa la IP de tu backend

export default function Comentarios({ recipeId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [average, setAverage] = useState(null);

  // Normaliza documento de la DB
  const normalize = (doc) => {
    const ratingRaw =
      doc.rating ?? doc.estrellas ?? doc.puntuacion ?? doc.score ?? doc.calificacion;
    const ratingNum = Number(ratingRaw);
    const ratingSafe = Number.isFinite(ratingNum)
      ? Math.max(1, Math.min(5, Math.round(ratingNum)))
      : null;
    const id = doc._id ?? doc.id ?? Math.random().toString();
    return { id, rating: ratingSafe };
  };

  // Cargar comentarios
  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/comments/${recipeId}`);
      const data = await res.json();
      const normalized = (data || []).map(normalize);
      setComments(normalized);
      computeAverage(normalized);
    } catch (e) {
      console.error("Error cargando comentarios:", e);
      setComments([]);
      setAverage(null);
    } finally {
      setLoading(false);
    }
  };

  // Calcular promedio
  const computeAverage = (normalizedComments) => {
    const rated = normalizedComments.filter(
      (c) => typeof c.rating === "number" && !isNaN(c.rating)
    );
    if (rated.length === 0) {
      setAverage(null);
      return;
    }
    const sum = rated.reduce((acc, c) => acc + c.rating, 0);
    const avg = sum / rated.length;
    setAverage(Number(avg.toFixed(1)));
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  // Enviar comentario (solo rating)
  const handleSubmit = async () => {
    const payload = { recipeId, rating };

    try {
      const res = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error en la respuesta del servidor");

      const created = await res.json();
      const added = normalize(created ?? payload ?? {});
      const updated = [added, ...comments];
      setComments(updated);
      computeAverage(updated);
      setRating(5);
    } catch (e) {
      console.error("Error guardando comentario:", e);
      alert("No se pudo enviar el comentario. Intenta de nuevo.");
    }
  };

  // Renderizar cada comentario (solo estrellas)
  const renderItem = ({ item }) => {
    const starCount =
      typeof item.rating === "number" && !isNaN(item.rating) ? item.rating : 0;
    const stars = "★".repeat(starCount) + "☆".repeat(Math.max(0, 5 - starCount));
    return (
      <View style={styles.comment}>
        <Text style={styles.starsInline}>{stars}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Comentarios y Calificaciones</Text>

      {loading ? (
        <ActivityIndicator size="small" color="#FF6F00" style={{ marginVertical: 8 }} />
      ) : (
        <Text style={styles.average}>
          ⭐ Promedio: {average === null ? "Sin calificaciones" : average}
        </Text>
      )}

      <FlatList
        style={{ maxHeight: 220 }}
        data={comments}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay calificaciones aún.</Text>}
      />

      <Text style={styles.newCommentTitle}>Califica esta receta</Text>

      {/* Selector de estrellas */}
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity key={n} onPress={() => setRating(n)}>
            <Text style={[styles.star, n <= rating ? styles.starActive : null]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="ENVIAR" onPress={handleSubmit} color="#2196F3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 12, padding: 10, backgroundColor: "#FFF3E0", borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  average: { fontWeight: "bold", marginBottom: 8 },
  comment: { paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  starsInline: { fontSize: 20, color: "#FFD700", textAlign: "left" },
  empty: { fontStyle: "italic", color: "#666", paddingVertical: 8 },
  newCommentTitle: { marginTop: 10, fontWeight: "600", marginBottom: 6 },
  starsRow: { flexDirection: "row", marginBottom: 8 },
  star: { fontSize: 28, color: "#ccc", marginHorizontal: 3 },
  starActive: { color: "#FFD700" },
});
