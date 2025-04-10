let listaDeCompras = [];
let listaSinDuplicados = new Set();


const agregarProducto = (producto) => {
  listaDeCompras.push(producto);
}

const eliminarProducto = (producto) => {
  let indice = listaDeCompras.indexOf(producto);
  if(indice !== -1){
    listaDeCompras.splice(indice, 1);
  }
}

const mostrarLista = () =>{
  // Mediante este ciclo for of agrego los elementos de mi arreglo a un conjunto para asegurarme
  // de que mis productos no esten duplicados
  for(x of listaDeCompras){
    listaSinDuplicados.add(x);
  }
  console.log(listaSinDuplicados)
  return
}

agregarProducto("Fresa");
agregarProducto("Papaya");
agregarProducto("Sandia");
agregarProducto("Naranja");
agregarProducto("Manzana");
agregarProducto("Sandia");
eliminarProducto("Papaya");

mostrarLista()