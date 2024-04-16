var db = firebase.apps[0].firestore();

const txtCSV = document.querySelector("#txtCSV");
const btnLoad = document.querySelector("#btnLoad");

btnLoad.addEventListener("click", function () {
  lecturaCSV(txtCSV.files[0]).then((r) => {
    txtCSV.value = "";
  });
});

async function lecturaCSV(archivo) {
  const nomarch = archivo.name.split(".")[0];
  const lector = new FileReader();
  lector.readAsText(archivo);
  await esperarSegundos();

  if (lector.result != null) {
    let data = lector.result.split("\n");
    let etiquetas = data[0].split(";");

    for (let index = 1; index < data.length; index++) {
      const valores = data[index].split(";");
      let salida = {};

      for (let index2 = 0; index2 < etiquetas.length; index2++) {
        // Determinar el tipo de dato y convertirlo
        salida[etiquetas[index2]] = convertirTipo(valores[index2]);
      }
      db.collection(nomarch)
        .add(salida)
        .then(function (docRef) {
          console.log("ID del registro: " + docRef.id);
        })
        .catch(function (FirebaseError) {
          console.log("Error al registrar el dato: " + FirebaseError);
        });
    }
  }
}

function convertirTipo(valor) {
  // Si el valor es nulo o está en blanco, retornar 'na'
  if (!valor || valor.trim() === "NULL") {
    return "na";
  }

  // Intentar convertir a número
  let numero = Number(valor);
  if (!isNaN(numero)) {
    // Si es un número, determinar si es entero o flotante
    return Number.isInteger(numero) ? parseInt(valor) : parseFloat(valor);
  }

  // Intentar convertir a fecha
  let fecha = new Date(valor);
  if (!isNaN(fecha.getTime())) {
    return fecha;
  }

  // Si no es número ni fecha, retornar como cadena
  return valor;
}

function esperarSegundos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 5000);
  });
}
