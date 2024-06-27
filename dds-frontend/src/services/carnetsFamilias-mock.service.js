import arrayCarnetFamilia from '../datos-mock/carnetsfamilias-mock';
async function Buscar() {
     return arrayCarnetFamilia;
}
async function BuscarPorId(IdCarnetFamilia) {
      return arrayCarnetFamilia.find((carnetfamilia) => carnetfamilia.IdCarnetFamilia === IdCarnetFamilia);
}
async function Agregar(carnetFamilia) {
    carnetFamilia.IdCarnetFamilia = arrayCarnetFamilia.length + 1;  // simula autoincremental
    arrayCarnetFamilia.push(carnetFamilia);
}
async function Modificar(carnetFamilia) {
    let carnetFamiliaEncontrado = arrayCarnetFamilia.find((carnetfamiliafind) => carnetfamiliafind.IdCarnetFamilia === carnetFamilia.IdCarnetFamilia);
    if (carnetFamiliaEncontrado) {
        carnetFamiliaEncontrado.Nombre = carnetFamilia.Nombre;
    }
}
async function Eliminar(IdCarnetFamilia){
    let carnetFamiliaEncontrado = arrayCarnetFamilia.find((carnetfamiliafind) => carnetfamiliafind.IdCarnetFamilia === IdCarnetFamilia);
    if (carnetFamiliaEncontrado) {
        arrayCarnetFamilia.splice(arrayCarnetFamilia.indexOf(carnetFamiliaEncontrado), 1);
    }
}
export const carnetsFamiliasMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};
