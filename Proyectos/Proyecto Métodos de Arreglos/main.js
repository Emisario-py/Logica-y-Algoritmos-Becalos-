//arreglo de objetos con al menos 5 productos, cada uno con las propiedades nombre, precio y categoría.

const productos = [
    { nombre: "Camiseta", precio: 15, categoria: "Ropa" },
    { nombre: "Laptop", precio: 800, categoria: "Electrónica" },
    { nombre: "Libro", precio: 12, categoria: "Educación" },
    { nombre: "Zapatos", precio: 50, categoria: "Ropa" },
    { nombre: "Celular", precio: 600, categoria: "Electrónica" },
];

const productosFiltrados = productos.filter( productos => productos.precio < 100);
console.log('Productos con un costo menor a 100:')
console.log(productosFiltrados);

productos.sort((a, b) => {
  if (a.nombre < b.nombre) return -1;
  if (a.nombre > b.nombre) return 1;
  return 0;
});console.log('Productos ordenados alfabeticamente:')
console.log(productos);

const nombresProductos = productos.map(producto => producto.nombre);
console.log('Nombre de los productos en el arreglo')
console.log(nombresProductos)

const totalEnProductos = productos.reduce((suma, producto) => suma + producto.precio, 0);
console.log('Total del dinero en productos:')
console.log(totalEnProductos)

const precioMenor = productos.some(producto => producto.precio < 500);
console.log("¿Hay productos en existencia con un precio menor a 500?")
if(precioMenor){
    console.log('Si hay existencias');
}else{
    console.log('No hay existencias');
}

const comprobarCategorias = productos.every(producto => producto.categoria.trim() !== "");
console.log('¿Todos los productos tienen categoria?');
if(comprobarCategorias){
    console.log('Todos los productos tienen categoria');
}else{
    console.log('Hay productos sin categoria');
}

const existencias = productos.some(producto => producto.nombre === "Zapats");
console.log("¿Hay existencias de el producto?")
if(existencias){
    console.log('Si hay existencias');
}else{
    console.log('No hay existencias');
}