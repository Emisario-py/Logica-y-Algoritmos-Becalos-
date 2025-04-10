const invitados = ["Ana", "Carlos", "Cecilia", "Daniel", "Diana", "Eduardo"];

function encontrarPareja(arr) {
    let inicio = 0;
    let siguiente = 1;

    while (siguiente < arr.length) {
        // TODO: Compara las iniciales de los nombres en los punteros
        // Si coinciden, devuelve el par
        // ...
        if(arr[inicio][0] === arr[siguiente][0]){
            return [arr[inicio], arr[siguiente]]
        }
        // TODO: Avanza los punteros si no coinciden
        // ...
        else{
            inicio++
            siguiente++
        }
    }
    return null; // Si no se encuentra ningún par
}

console.log(encontrarPareja(invitados));
// Resultado: ["Carlos", "Cecilia"]