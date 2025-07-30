import { Text } from '../modelo/clean.modelo.js';

// Analisis te texto basico
class TextMiningService {
  static analyzeText(text) {
    // Cuenta las palabras del texto, las pone en minusculas, elimina acentos y signos de puntuacion
    const text2 = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡?"']/g, "");
    const words = text2.split(/\s+/).filter(w => w.length > 0).map(w => w.replace(/[^\wñ]/g, ''));

    // Analisis de sentimiento basico
    const positiveWords = ['bueno', 'excelente', 'genial', 'increíble', 'fantástico', 'perfecto', 'agradable'];
    const negativeWords = ['malo', 'terrible', 'horrible', 'pésimo', 'asco', 'desagradable', 'horrendo'];


    // Pasar las palabras a minúsculas
    let sentiment = 0;
    words.forEach(word => {
      if (positiveWords.includes(word)) sentiment++;
      if (negativeWords.includes(word)) sentiment--;
    });

  // Separa los resultados (Neutral, Positivo, Negativo)

    let response = "Neutro"
        if(sentiment > 0){
            response = "Positivo"
        }
        if(sentiment<0){
            response = "Negativo"
        }

    // Lista de palabras vacias que se eliminan del texto
    const stopwords = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'y', 'a', 'en', 'que', 'con', 'para', 'por', 'es', 'al', 'se'];

    // Hacerle frecuencia a las palabras
    const freq = {};
    words.forEach(word => {
      if (!stopwords.includes(word)) {
        freq[word] = (freq[word] || 0) + 1;
      }
    });

    // La frecuencia de la palabra clave solamente
    const palabraClave = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b, null) || '';
    const frecuenciakey = palabraClave ? freq[palabraClave] : 0;


    // Retorna el resultado del analisis
    return { 
        texto: text2,
        wordCount: words.length, 
        frecuenciawords: freq,
        palabraClave, 
        frecuenciakey, 
        clasificacion: response };
  }
}
// Analizamos el texto xd
export const test = async (comentario) => {
  const resultado = TextMiningService.analyzeText(comentario);

  try {
    // Await es para esperar un poco para recibir una respuesta
    await Text.create(resultado);
    console.log("Analisis guardado en MONGO DB");
  } catch (error) {
     console.log("Error al guardar en MongoDB", error);
  }
};
