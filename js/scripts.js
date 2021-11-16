import { crearTabla, handleClick } from "./dinamicas.js";
import { Anuncio, Anuncio_Auto } from "./classes.js";

const $divTabla = document.getElementById("appTable");
const $spinnerContainer = document.getElementsByClassName("spinner-container");
const $deleteButtonContainer = document.getElementsByClassName(
  "button-delete-container"
);
const $cancelButtonContainer = document.getElementsByClassName(
  "button-cancel-container"
);
const $deleteButton = document.getElementById("delete-button");
const $cancelButton = document.getElementById("cancel-button");
const $saveAndModifyButton = document.getElementById("save-and-modify-button");

const $customAlertContainer = document.getElementById("custom-alert");
const $buttonAlert = document.getElementById("button-alert");
const $alertMessage = document.getElementById("custom-alert-message");

const $formulario = document.forms[0];

const listadoAutomoviles =
  JSON.parse(localStorage.getItem("automoviles")) || [];

actualizarTabla();
hideAlert();

$deleteButton.addEventListener("click", (e) => {
  e.preventDefault();
  let $id = document.getElementById("txtId").value;
  handlerDelete(parseInt($id));
});

console.log("ELEMENTOS DEL FORMULARIO:", $formulario.elements);

$cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  $saveAndModifyButton.value = "Guardar";
  resetTable();
});

window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    let i = 0;
    let tr = e.target.parentElement;
    let id = tr.getAttribute("data-id");
    let item = obtainItemFromStorage(parseInt(id), "automoviles");
    cargarFormulario(item);
  }
});

const displayButtonsForExistingItem = () => {
  $deleteButtonContainer[0].style.display = "inline-block";
  $cancelButtonContainer[0].style.display = "inline-block";
  $saveAndModifyButton.value = "Modificar";
};

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
    aceite,
    frenos,
  } = $formulario.elements;

  const formPublicacion = new Anuncio_Auto(
    txtTitulo.value,
    rdoTransaccion.value,
    txtDescripcion.value,
    numPrecio.value,
    numPuertas.value,
    numKms.value,
    numPotencia.value,
    aceite.checked,
    frenos.checked
  );
  formPublicacion.id = parseInt(txtId.value);
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
  $spinnerContainer[0].style.display = "flex";
  $deleteButtonContainer[0].style.display = "none";
  $cancelButtonContainer[0].style.display = "none";
  $saveAndModifyButton.value = "Guardar";
  setTimeout(() => {
    $spinnerContainer[0].style.display = "none";
    const data = JSON.parse(localStorage.getItem("automoviles"));

    if (data) {
      $divTabla.appendChild(crearTabla(data));
    }
  }, 3000);
}

const limpiarTabla = () => {
  while ($divTabla.hasChildNodes()) {
    $divTabla.removeChild($divTabla.firstElementChild);
  }
};

const resetTable = () => {
  $formulario.reset();
  $formulario.elements.txtId.value = "";
  $deleteButtonContainer[0].style.display = "none";
  $cancelButtonContainer[0].style.display = "none";
};

const cargarFormulario = (Anuncio_Auto) => {
  displayButtonsForExistingItem();
  const {
    txtId,
    txtTitulo,
    txtDescripcion,
    rdoTransaccion,
    numKms,
    numPuertas,
    numPrecio,
    numPotencia,
    frenos,
    aceite,
  } = $formulario.elements;
  txtId.value = Anuncio_Auto.id;
  txtTitulo.value = Anuncio_Auto.titulo;
  rdoTransaccion.value = Anuncio_Auto.transaccion;
  txtDescripcion.value = Anuncio_Auto.descripcion;
  numPrecio.value = parseInt(Anuncio_Auto.precio);
  numKms.value = parseInt(Anuncio_Auto.numKms);
  numPuertas.value = Anuncio_Auto.numPuertas;
  numPotencia.value = Anuncio_Auto.numPotencia;
  frenos.checked = Anuncio_Auto.frenoAlDia;
  aceite.checked = Anuncio_Auto.aceiteAlDia;
};

const obtainItemFromStorage = (id, storageName) => {
  let returnItem;
  let listadoParseado = JSON.parse(localStorage.getItem(storageName));
  listadoParseado.forEach((item) => {
    if (item.id === id) {
      returnItem = item;
    }
  });
  return returnItem;
};

const actualizarStorage = (data) => {
  localStorage.setItem("automoviles", JSON.stringify(data));
};

function showAlert(alertMessage) {
  $customAlertContainer.style.display = "inline-grid";
  $alertMessage.innerText = alertMessage;
}
function hideAlert() {
  $customAlertContainer.style.display = "none";
}

$buttonAlert.addEventListener("click", () => {
  hideAlert();
});

const handlerCreate = (nuevoAtomovil) => {
  listadoAutomoviles.push(nuevoAtomovil);
  console.log("listado automoviles:", listadoAutomoviles);
  limpiarTabla();
  actualizarStorage(listadoAutomoviles);
  actualizarTabla();
  showAlert("Vehículo añadido al catálogo!");
};

const handlerUpdate = (itemEditado) => {
  for (let i = 0; i < listadoAutomoviles.length; i++) {
    if (listadoAutomoviles[i].id === parseInt(itemEditado.id)) {
      listadoAutomoviles[i] = itemEditado;
      break;
    }
  }

  limpiarTabla();
  actualizarStorage(listadoAutomoviles);
  actualizarTabla();
  resetTable();
  showAlert("Vehículo modificado!");
};

const handlerDelete = (id) => {
  for (let i = 0; i < listadoAutomoviles.length; i++) {
    if (listadoAutomoviles[i].id === id) {
      listadoAutomoviles.splice(i, 1);
      break;
    }
  }

  limpiarTabla();
  actualizarStorage(listadoAutomoviles);
  actualizarTabla();
  resetTable();
  showAlert("Vehículo eliminado!");
};
