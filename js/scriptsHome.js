import { Anuncio_Auto } from "./classes.js";
import { crearItemListado } from "./dinamicas.js";
const $divListadoArticulos = document.getElementById("container-adds-listing");
const listadoAutomoviles =
  JSON.parse(localStorage.getItem("automoviles")) || [];

crearListadoArticulos(listadoAutomoviles);
function crearListadoArticulos(arrayListado) {
  arrayListado.forEach((element) => {
    $divListadoArticulos.appendChild(crearItemListado(element));
    // crearItemListado(element);
  });
}
