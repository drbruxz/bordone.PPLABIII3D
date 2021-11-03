import { crearTabla, handleClick } from "./dinamicas.js";
import { Anuncio_Auto } from "./classes.js";

const $divTabla = document.getElementById("appTable");
const $spinner = document.getElementsByClassName("spinner");

const listadoAutomoviles =
  JSON.parse(localStorage.getItem("automoviles")) || [];

actualizarTabla();

window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    //cargarFormulario
  }
});

const $formulario = document.forms[0];
$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const {
    txtId,
    txtTitulo,
    rdoTransaccion,
    txtDescripcion,
    numPrecio,
    numPuertas,
    numKms,
    numPotencia,
  } = $formulario.elements;

  const formPublicacion = new Anuncio_Auto(
    txtTitulo.value,
    rdoTransaccion.value,
    txtDescripcion.value,
    numPrecio.value,
    numPuertas.value,
    numKms.value,
    numPotencia.value
  );
  console.log("form publi", formPublicacion);
  if (!txtId.value) {
    //alta
    formPublicacion.id = Date.now();
    handlerCreate(formPublicacion);
  } else {
    //update
    handlerUpdate(formPublicacion);
  }
});

function actualizarTabla() {
  $spinner[0].style.display = "flex";
  setTimeout(() => {
    $spinner[0].style.display = "none";
    const data = JSON.parse(localStorage.getItem("automoviles"));

    if (data) {
      $divTabla.appendChild(crearTabla(data));
    }
  }, 3000);
}

const handlerCreate = (nuevoAtomovil) => {
  listadoAutomoviles.push(nuevoAtomovil);

  while ($divTabla.hasChildNodes()) {
    $divTabla.removeChild($divTabla.firstElementChild);
  }

  actualizarStorage(listadoAutomoviles);
  actualizarTabla();
};

const handlerUpdate = (personaEditada) => {};

const cargarFormulario = (Anuncio_Auto) => {
  const {
    txtId,
    txtTitulo,
    txtDescripcion,
    rdoTransaccion,
    numKms,
    numPuertas,
    numPrecio,
    numPotencia,
  } = $formulario.elements;
  txtId.value = Anuncio_Auto.id;
  txtTitulo.value = Anuncio_Auto.titulo;
  rdoTransaccion.value = Anuncio_Auto.transaccion;
  txtDescripcion.value = Anuncio_Auto.descripcion;
  numPrecio.value = Anuncio_Auto.txtPrecio;
  numKms.value = Anuncio_Auto.numKm;
  numPuertas.value = Anuncio_Auto.numPuertas;
  numPotencia.value = Anuncio_Auto.numPotencia;
};

const actualizarStorage = (data) => {
  localStorage.setItem("automoviles", JSON.stringify(data));
};

const handlerDelete = (id) => {};
