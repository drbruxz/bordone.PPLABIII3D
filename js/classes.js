export class Anuncio {
  id;
  titulo;
  transaccion;
  descripcion;
  numPrecio;

  constructor(titulo, transaccion, descripcion, numPrecio) {
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = numPrecio;
    this.id = id;
  }
}
export class Anuncio_Auto extends Anuncio {
  numPuertas;
  numKms;
  numPotencia;

  constructor(
    titulo,
    transaccion,
    descripcion,
    precio,
    numPuertas,
    numKms,
    numPotencia
  ) {
    super(titulo, transaccion, descripcion, precio);
    this.numPuertas = numPuertas;
    this.numKms = numKms;
    this.numPotencia = numPotencia;
  }
}
