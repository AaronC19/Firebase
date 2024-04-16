function abrirModal(id) {
  // Obtener el elemento del modal
  const modal = document.getElementById("modalModificar");

  // Obtener los datos del zodiaco de Firebase
  db.collection("datosZodiaco")
    .doc(id)
    .get()
    .then(function (doc) {
      // Si el documento existe
      if (doc.exists) {
        const datos = doc.data();

        // Rellenar los campos del modal con los datos
        document.getElementById("txtPosic").value = datos.posic;
        document.getElementById("txtSigno").value = datos.signo;
        document.getElementById("txtRango").value = datos.rango;
        document.getElementById("txtElemento").value = datos.elemento;
        document.getElementById("txtAstro").value = datos.astro;
        document.getElementById("txtPiedra").value = datos.piedra;

        // Mostrar el modal
        modal.showModal();
      } else {
        // Mostrar un mensaje de error si el documento no existe
        console.error("El documento no existe");
      }
    });
}

function cerrarModal() {
  // Obtener el elemento del modal
  const modal = document.getElementById("modalModificar");

  // Cerrar el modal
  modal.close();
}

function modificarSigno() {
  const posicion = document.getElementById("txtPosic").value;
  const signo = document.getElementById("txtSigno").value;
  const rango = document.getElementById("txtRango").value;
  const elemento = document.getElementById("txtElemento").value;
  const astro = document.getElementById("txtAstro").value;
  const piedra = document.getElementById("txtPiedra").value;

  // Actualizar el documento en Firebase
  db.collection("datosZodiaco").doc(id).update({
    posic: posicion,
    signo: signo,
    rango: rango,
    elemento: elemento,
    astro: astro,
    piedra: piedra,
  });

  // Cerrar el modal
  cerrarModal();
}

function recuperarId(id) {
  alert(id);
  abrirModal(id);
}
