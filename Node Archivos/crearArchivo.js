// Importar modulo
const fs = require('fs');

// Mensaje de ejemplo
const mensaje = `Hola desde node.js! Esta es una linea escrita desde JS`;

// Escribir el archivo
fs.writeFile('./saludo.txt', mensaje, (err)=>{
    if(err){
        console.error('Error al escribir en el archivo', err);
    }else{
        console.log('Archivo creado exitosamente como saludo.txt');
    }
})

fs.readFile('./saludo.txt', 'utf-8', (err, data)=>{
    if(err) throw err;
    console.log(data);
})