import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { ref, set, push, onValue } from "firebase/database";
import { db } from "../config/firebaseconfig";

export default function Comentarios({ recipeId }) {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  useEffect(() => {
    const comentariosRef = ref(db, `comentarios/${recipeId}`);
    onValue(comentariosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setComentarios(Object.values(data));
      } else {
        setComentarios([]);
      }
    });
  }, [recipeId]);

  // Agregar un nuevo comentario
  const agregarComentario = () => {
    if (nuevoComentario.trim() === "") return;
    const comentariosRef = ref(db, `comentarios/${recipeId}`);
    const nuevoRef = push(comentariosRef);
    set(nuevoRef, {
      texto: nuevoComentario,
      fecha: new Date().toISOString()
    });
    setNuevoComentario("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comentarios</Text>

      <FlatList
        data={comentarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.comentario}>• {item.texto}</Text>
        )}
      />

      <TextInput
        value={nuevoComentario}
        onChangeText={setNuevoComentario}
        placeholder="Escribe un comentario..."
        style={styles.input}
      />
      <Button title="Enviar" onPress={agregarComentario} color="#FF6F00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 12, padding: 8, backgroundColor: "#fff", borderRadius: 8, elevation: 2 },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 6, color: "#E65100" },
  comentario: { fontSize: 14, marginVertical: 2, color: "#333" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginVertical: 8 }
});
