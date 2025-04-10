function findLongestWord(text) {
    // TODO: Dividir el texto en palabras y almacenarlas en una variable
    const words = text.split(' ')
    let longestWord = ''; // Inicializar la palabra más larga

    // TODO: Recorrer el arreglo de palabras con un ciclo
    for (i = 0; i<words.length; i++) {
        // TODO: Comparar la longitud de la palabra actual con la más larga
        if (words[i].length > longestWord.length) {
            // Actualizar la palabra más larga
            longestWord = words[i];
        }
    }

    // TODO: Retornar la palabra más larga encontrada
    return longestWord;
}

// Ejemplo de uso
const text = "JavaScript es un lenguaje de programación increíble para aprender.";
// TODO: Llama a la función y muestra el resultado
console.log(findLongestWord(text)); // Resultado esperado: "programación"