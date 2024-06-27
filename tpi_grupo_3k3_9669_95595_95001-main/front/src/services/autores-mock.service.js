import arrayAutores from '../datos-mock/autores-mock';
async function Buscar() {
     return arrayAutores;
}
async function BuscarPorId(IdAutor) {
      return arrayAutores.find((autor) => autor.IdAutor === IdAutor);
}
async function Agregar(autor) {
    autor.IdAutor = arrayAutores.length + 1;  // simula autoincremental
    arrayAutores.push(autor);
}
async function Modificar(autor) {
    let autorEncontrado = arrayAutores.find((autorfind) => autorfind.IdAutor === autor.IdAutor);
    if (autorEncontrado) {
        autorEncontrado.Nombre = autor.Nombre;
    }
}
async function Eliminar(IdAutor){
    let autorEncontrado = arrayAutores.find((autorfind) => autorfind.IdAutor === IdAutor);
    if (autorEncontrado) {
        arrayAutores.splice(arrayAutores.indexOf(autorEncontrado), 1);
    }
}
export const autoresMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};