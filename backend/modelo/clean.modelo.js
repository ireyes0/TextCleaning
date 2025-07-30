import { Schema, model } from "mongoose";

const textoSchema = new Schema({
  texto: { type: String, required: true, trim: true },
  wordCount: { type: Number, required: true },
  palabraClave: { type: String, required: true, trim: true },
  frecuenciakey: { type: Number, required: true, min: 0 },
  frecuenciawords: { type: Map, of: Number, required: true },
  clasificacion: { 
    type: String, 
    required: true, 
    enum: ['Positivo', 'Negativo', 'Neutro']
  }
});

export const Text = model("Text", textoSchema);
