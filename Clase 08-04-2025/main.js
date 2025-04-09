const contarLetras = (cadena) => {
    const frecuencia = new Map();
    for(let letra of cadena){
        if(frecuencia.has(letra)){
            frecuencia.set(letra, frecuencia.get(letra) + 1);
        }else{
            frecuencia.set(letra, 1);
        }
    }

    return frecuencia
}

console.log(contarLetras("banAna"))

const obj = {
    0: 'a',
    1: 'b'
}

console.log(obj.hasOwnProperty('0'));

console.log(Object.keys(obj));

console.log(Object.values(obj));

// // const resultado = document.querySelector('#resultado');
// const texto = 'xqwfwfasdf';
// const frecuencia = {};

// for(let char of texto){
//     frecuencia[char] = (frecuencia[char] || 0) + 1;
// }

// // resultado.innerHTML = Object.entries(frecuencia)
// //     .map(([letra,veces]) => `${letra}:${veces}`)
// //     .join('<br>')

const tieneDuplicados = (arr) =>{
    const seen = new Set();

    for (let num of arr){
        if(seen.has(num)) return true;
        seen.add(num);
    }
    return false
}

console.log(tieneDuplicados([1,2,3,2,4,5]))