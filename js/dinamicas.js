export const handleClick = (e) => {
  console.log(e.target.parentElement.dataset.id);
};

export const crearTabla = (data) => {
  const tabla = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const cabecera = document.createElement("tr");

  for (const key in data[0]) {
    if (key !== "id") {
      const th = document.createElement("th");
      const contenido = document.createTextNode(key);
      th.appendChild(contenido);
      cabecera.appendChild(th);
    }
  }

  thead.appendChild(cabecera);
  tabla.appendChild(thead);

  data.forEach((element) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key === "id") {
        tr.setAttribute("data-id", element[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = element[key];
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });

  tabla.appendChild(tbody);

  return tabla;
};
