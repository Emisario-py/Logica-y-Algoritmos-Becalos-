// Importamos recetas desde un archivo externo simulado
import { getRecipes } from "./services/recipes.js";

// Verificamos que los datos recibidos sean un arreglo
const recetas = Array.isArray(getRecipes()) ? getRecipes() : [];

// Referencias a elementos del DOM
const input = document.getElementById("ingredient-input");
const recipesContainer = document.getElementById("recipes");
const sortSelect = document.getElementById("sort");
const suggestionBtn = document.getElementById("suggestion-btn");

// Variables globales para autocompletado y análisis
let currentSuggestionIndex = -1;
let currentSuggestions = [];
let historialIngredientes = [];


// =============================================
// FUNCIÓN: Mostrar recetas en pantalla
// =============================================
function renderRecetas(lista) {
    recipesContainer.innerHTML = ""; // Limpiamos el contenedor

    lista.forEach((receta) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
        <img src="${receta.imagen}" alt="${receta.nombre}" />
        <h3>${receta.nombre}</h3>
        <p><strong>Tiempo:</strong> ${receta.tiempo} min</p>
        <p>${receta.pasos}</p>
      `;
        recipesContainer.appendChild(card);
    });
}


// Algoritmo KMP
function crearLPS(patron){
    const lps = Array(patron.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < patron.length) {
        if (patron[i] === patron[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

function busquedaKmp(texto, patron){
    if(patron.length === 0) return true;
    const lps = crearLPS(patron);
    let i = 0;
    let j = 0;

    while(i < texto.length){
        if( texto[i] === patron[j]){
            i++;
            j++;
            if(j === patron.length) return true;
        }else{
            if(j !== 0){
                j = lps[j - 1];
            }else{
                i++;
            }
        }
    }
    return false;
}

// =============================================
// FUNCIÓN: Filtrar recetas por ingrediente
// =============================================
function filtrarPorIngrediente(ingrediente) {
    const lower = ingrediente.toLowerCase();

    // TODO: Reemplazar .includes() con implementación manual de búsqueda de subcadenas (como KMP o recorrido carácter por carácter)
    return recetas.filter((receta) =>
        receta.ingredientes.some((ing) => busquedaKmp(ing.toLowerCase(), lower))
    );
}


// =============================================
// FUNCIÓN: Actualizar historial y análisis
// =============================================
function actualizarHistorial(ingrediente) {
    historialIngredientes.push(ingrediente);
    
    // Sliding Window: mantenemos máximo 20 ingredientes
    if (historialIngredientes.length > 20) {
        historialIngredientes.shift();
    }

    // Mostrar en texto cuántos ingredientes únicos se han usado
    document.getElementById("analysis").textContent =
        `Usaste ${new Set(historialIngredientes).size} ingrediente${historialIngredientes.length > 1 ? 's' : ''} esta semana.`;

    actualizarSugerenciasRecientes();
}


// =============================================
// FUNCIÓN: Mostrar top ingredientes populares recientes (Sliding Window real)
// =============================================

// TODO: Sliding Window sobre últimas 5 búsquedas para encontrar ingredientes más frecuentes
function actualizarSugerenciasRecientes() {
    const ventana = historialIngredientes.slice(-5);

    const frecuencia = {};
    for(const ing of ventana){
        const lower = ing.toLowerCase();
        frecuencia[lower] = (frecuencia[lower] || 0) + 1;
    }

    const ordenados = Object.entries(frecuencia).sort((a,b) => b[1] - a[1]).map(([ing , _]) => ing);

    const sugerencias = ordenados.slice(0,3);

    const sugerenciasTexto = sugerencias.length > 0 ? `Sugerencias recientes: ${sugerencias.join(', ')}`: 'No hay sugerencias recientes';

    document.getElementById('recent-suggestions').textContent = sugerenciasTexto;
}



// =============================================
// FUNCIÓN: Mostrar sugerencias de autocompletado
// =============================================
function autocompletar(valor) {
    const autocompletarDiv = document.getElementById("autocomplete-list");
    autocompletarDiv.innerHTML = "";

    if (!valor) return;

    currentSuggestions = [...new Set(recetas.flatMap(r => r.ingredientes))]
        .filter((ing) => ing.toLowerCase().startsWith(valor.toLowerCase()))
        .slice(0, 5);

    currentSuggestionIndex = -1;

    currentSuggestions.forEach((sug) => {
        const item = document.createElement("div");
        item.textContent = sug;
        item.classList.add("autocomplete-item");
        item.onclick = () => {
            input.value = sug;
            input.focus();
        };
        autocompletarDiv.appendChild(item);
    });
}


// =============================================
// FUNCIÓN: Buscar recetas y mostrarlas
// =============================================
function buscarYRenderizar() {
    const valor = input.value.trim();
    if (!valor) return;

    const resultados = filtrarPorIngrediente(valor);
    actualizarHistorial(valor);
    renderRecetas(resultados);
}


// =============================================
// FUNCIÓN: Ordenar recetas por nombre o tiempo
// =============================================
function mergeNum(izq, der){
    let resultado = [];
    let i = 0;
    let j = 0;

    while(i < izq.length && j < der.length){
        if (izq[i].tiempo < der[j].tiempo){
            resultado.push(izq[i]);
            i++;
        }else{
            resultado.push(der[j]);
            j++;
        }
    }

    return resultado.concat(izq.slice(i).concat(der.slice(j)));
}

function mergeSortNum(arr){
    if(arr.length <= 1){
        return arr;
    }

    const mitad = Math.floor(arr.length/2);

    const izq = arr.slice(0, mitad);
    const der = arr.slice(mitad);

    return mergeNum(mergeSortNum(izq), mergeSortNum(der));
}

function mergeAlf(izq, der){
    let resultado = [];
    let i = 0;
    let j = 0;

    while(i < izq.length && j < der.length){
        if (izq[i].nombre.localeCompare(der[j].nombre) < 0){
            resultado.push(izq[i]);
            i++;
        }else{
            resultado.push(der[j]);
            j++;
        }
    }

    return resultado.concat(izq.slice(i).concat(der.slice(j)));
}

function mergeSortAlf(arr){
    if(arr.length <= 1){
        return arr;
    }

    const mitad = Math.floor(arr.length/2);

    const izq = arr.slice(0, mitad);
    const der = arr.slice(mitad);

    return mergeAlf(mergeSortAlf(izq), mergeSortAlf(der));
}

function ordenarRecetas(tipo) {
    let ordenadas = [...recetas];

    if (tipo === "time") {
        // TODO: Reemplazar .sort() por una implementación manual de Merge Sort (crear función mergeSort())
        ordenadas = mergeSortNum(ordenadas);
    } else {
        // TODO: Reemplazar .sort() por una implementación manual de ordenamiento alfabético (merge sort)
        ordenadas = mergeSortAlf(ordenadas)
    }

    renderRecetas(ordenadas);
}


// =============================================
// FUNCIÓN: Resaltar sugerencia seleccionada
// =============================================
function highlightSuggestion(items) {
    items.forEach((item, index) => {
        item.classList.toggle("active", index === currentSuggestionIndex);
    });
}


// =============================================
// EVENTO: Cuando el usuario escribe en el input
// =============================================
input.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    autocompletar(value); // Solo muestra sugerencias

    if (!value) {
        renderRecetas(recetas); // Si está vacío, mostrar todas
    }
});


// =============================================
// EVENTO: Teclado para navegar sugerencias
// =============================================
input.addEventListener("keydown", (e) => {
    const items = document.querySelectorAll(".autocomplete-item");

    if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentSuggestionIndex < items.length - 1) {
            currentSuggestionIndex++;
            highlightSuggestion(items);
        }
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentSuggestionIndex > 0) {
            currentSuggestionIndex--;
            highlightSuggestion(items);
        }
    } else if (e.key === "Enter") {
        if (currentSuggestionIndex >= 0 && items[currentSuggestionIndex]) {
            input.value = items[currentSuggestionIndex].textContent;
            document.getElementById("autocomplete-list").innerHTML = "";
        }
        buscarYRenderizar(); // Ejecuta búsqueda
    }
});


// =============================================
// EVENTO: Cambiar tipo de ordenamiento
// =============================================
sortSelect.addEventListener("change", (e) => ordenarRecetas(e.target.value));


// =============================================
// EVENTO: Mostrar la receta más rápida
// =============================================
function greedy(receta){
    if(receta.length === 0) return null;

    let mejorTiempo = receta[0];

    for(let i = 0; i < receta.length; i++){
        if(receta[i].tiempo < mejorTiempo.tiempo){
            mejorTiempo = receta[i];
        }
    }

    return mejorTiempo;
}

suggestionBtn.addEventListener("click", () => {
    // TODO: Reemplazar .reduce() con una implementación manual de Greedy para encontrar el menor tiempo
    const recetaMasRapida = greedy(recetas);
    renderRecetas([recetaMasRapida]);
});


// =============================================
// Render inicial de todas las recetas
// =============================================
renderRecetas(recetas);