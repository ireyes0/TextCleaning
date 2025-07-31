import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { test } from "./backend/controlador/clean.controlador.js";

dotenv.config();

mongoose.connect(process.env.urlbd)
  .then(() => console.log("Conectado a la base en MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

const app = express();
app.use(express.json());
app.use(cors());

app.listen(4000, () => {
  console.log("Servidor escuchando en el puerto 4000");

  // Escribimos el texto para analizarlo y se guarda en la base de datos
  const texto = "Aunque el servicio fue un poco lento, la comida estuvo deliciosa y el ambiente muy agradable.";

  test(texto);
});
