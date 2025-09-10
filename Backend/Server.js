const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://lawliet:lawliet@clusterusuarios.m9ihr5y.mongodb.net/?retryWrites=true&w=majority&appName=ClusterUsuarios")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error conectando MongoDB:", err));

app.use("/comments", require("./routes/comments"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://192.168.1.14:${PORT}`));

