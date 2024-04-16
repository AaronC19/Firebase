// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtPosic = document.querySelector("#txtPosic");
const txtSigno = document.querySelector("#txtSigno");
const txtRango = document.querySelector("#txtRango");
const txtAstro = document.querySelector("#txtAstro"); // New element
const txtPiedra = document.querySelector("#txtPiedra"); // New element
const txtElemento = document.querySelector("#txtElemento"); // New element
const txtArchi = document.querySelector("#txtArchi");

const btnLoad = document.querySelector("#btnLoad");

btnLoad.addEventListener("click", function () {
  const archivo = txtArchi.files[0];
  const nomarch = archivo.name;
  if (archivo == null) {
    alert("Debe seleccionar una imagen");
  } else {
    const metadata = {
      contentType: archivo.type,
    };
    const subir = container.child("zodiaco/" + nomarch).put(archivo, metadata);
    subir
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        const datosSigno = {
          posic: parseInt(txtPosic.value),
          signo: txtSigno.value,
          rango: txtRango.value,
          astro: txtAstro.value, // Add new field
          piedra: txtPiedra.value, // Add new field
          elemento: txtElemento.value, // Add new field
          url: url,
        };

        db.collection("datosZodiaco")
          .add(datosSigno)
          .then(function (docRef) {
            alert("ID del registro: " + docRef.id);
            limpiar();
          })
          .catch(function (FirebaseError) {
            alert("Error al subir la imagen: " + FirebaseError);
          });
      });
  }
});

function limpiar() {
  txtPosic.value = "";
  txtSigno.value = "";
  txtRango.value = "";
  txtAstro.value = ""; // Reset new element
  txtPiedra.value = ""; // Reset new element
  txtElemento.value = ""; // Reset new element
  txtArchi.value = "";
  txtPosic.focus();
}
