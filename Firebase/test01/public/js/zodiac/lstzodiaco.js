var db = firebase.apps[0].firestore();

const tabla = document.querySelector("#tabla");

db.collection("datosZodiaco")
  .orderBy("posic", "asc")
  .get()
  .then(function (query) {
    tabla.innerHTML = "";
    var salida = "";
    query.forEach(function (doc) {
      salida += '<div class="divAnuncio m-3"">';
      salida +=
        '<div class="imgBlock"><img src="' +
        doc.data().url +
        '" width="100%" onClick="recuperarId(\'' +
        doc.id +
        "')\" /></div>";
      salida +=
        "<div>" +
        doc.data().signo +
        "<br/>" +
        doc.data().rango +
        "<br/>" +
        doc.data().astro +
        "<br/>" +
        doc.data().piedra +
        "<br/>" +
        doc.data().elemento +
        "</div><br/>";
      salida += "</div>";
    });
    tabla.innerHTML = salida;
  });
