// viajes.js

// Array para guardar los destinos
const destinos = [];

// Función para registrar un destino de viaje
export function registrarDestino(destino, fecha, transporte) {
    // TODO: Crear un objeto con los datos del destino
    let nuevoViaje = {
        destino: destino,
        fecha: fecha,
        transporte: transporte,
        costo: calcularCosto(destino, transporte)
    };

    destinos.push(nuevoViaje);
}

// Función para calcular el costo del viaje
const calcularCosto = (destino, transporte) => {
    let costoBase = 0;

    // Costo base por destino
    if (destino === "Paris") {
        costoBase = 500;
    } else if (destino === "Londres") {
        costoBase = 400;
    } else if (destino === "New York") {
        costoBase = 600;
    }

    // Costo adicional por tipo de transporte
    if (transporte === "Avión") {
        costoBase += 200;
    } else if (transporte === "Tren") {
        costoBase += 100;
    }

    return costoBase;
}

// Función para mostrar el itinerario de los viajes registrados
export function mostrarItinerario() {
    // TODO: Recorrer el arreglo de destinos y mostrar la información de cada uno
    for (let i = 0; i < destinos.length; i++) {
        let viaje = destinos[i];
        const {destino, fecha, transporte, costo} = viaje;
        console.log("---------------------------");
        console.log("Destino: " + destino);
        console.log("Fecha: " + fecha);
        console.log("Transporte: " + transporte);
        console.log("Costo: $" + costo);
        console.log("---------------------------");
    }
}