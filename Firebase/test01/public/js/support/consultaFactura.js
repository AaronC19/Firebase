document.addEventListener("DOMContentLoaded", function () {
  const tablaFactura = document.getElementById("tablaFactura");
  const tablaEmpleado = document.getElementById("tablaEmpleado");

  const formConsultaFactura = document.getElementById("formConsultaFactura");
  formConsultaFactura.addEventListener("submit", function (event) {
    event.preventDefault();

    const OrderID = parseInt(document.getElementById("numeroFactura").value);

    var db = firebase.apps[0].firestore();
    db.collection("Orders")
      .where("OrderID", "==", OrderID)
      .get()
      .then(function (querySnapshot) {
        if (!querySnapshot.empty) {
          const datosFactura = querySnapshot.docs[0].data();
          const CustomerID = datosFactura.CustomerID;
          const EmployeeID = datosFactura.EmployeeID;
          const facturada = datosFactura.OrderDate.toDate();
          const requerida = datosFactura.RequiredDate.toDate();
          const diaEnvio = datosFactura.ShippedDate.toDate();

          // Función para formatear la fecha en formato "dd/MMM/yyyy"
          function formatDate(date) {
            const options = { day: "2-digit", month: "short", year: "numeric" };
            return new Date(date).toLocaleDateString("es-ES", options);
          }

          // Formatear las fechas
          const facturadaFormatted = formatDate(facturada);
          const requeridaFormatted = formatDate(requerida);
          const diaEnvioFormatted = formatDate(diaEnvio);

          db.collection("Customers")
            .where("CustomerID", "==", CustomerID)
            .get()
            .then(function (customerSnapshot) {
              if (!customerSnapshot.empty) {
                const datosCliente = customerSnapshot.docs[0].data();
                const nombreCliente = datosCliente.ContactName;
                const nombreEmpresa = datosCliente.ContactTitle;
                const numeroEmpresa = datosCliente.Phone;
                const paisCliente = datosCliente.Country;
                const ciudadCliente = datosCliente.City;
                const postalCliente = datosCliente.PostalCode;

                db.collection("Employees")
                  .where("EmployeeID", "==", EmployeeID)
                  .get()
                  .then(function (employeeSnapshot) {
                    if (!employeeSnapshot.empty) {
                      const datosEmpleado = employeeSnapshot.docs[0].data();
                      const nombreEmpleado =
                        datosEmpleado.FirstName + " " + datosEmpleado.LastName;

                      // Crear tabla para los datos del cliente
                      const tablaClienteHTML = `
                        <table class="table table-primary table-bordered border-dark">
                          <tr>
                            <th>Cliente: </th>
                            <td>${nombreCliente}</td>
                          </tr>
                          <tr>
                            <th>Contacto: </th>
                            <td>Empresa: ${nombreEmpresa} || Número de Contácto: ${numeroEmpresa}</td>
                          </tr>
                          <tr>
                            <th>Destino: </th>
                            <td>Pais: ${paisCliente} || Ciudad: ${ciudadCliente} || Codigo Postal: ${postalCliente}</td>
                          </tr>
                        </table>
                      `;
                      tablaFactura.innerHTML = tablaClienteHTML;

                      // Crear tabla para los datos del empleado
                      const tablaEmpleadoHTML = `
                        <table class="table table-success table-bordered border-dark">
                          <tr>
                            <th>Facturada: </th>
                            <td>${facturadaFormatted}</td>
                          </tr>
                          <tr>
                            <th>Requerida: </th>
                            <td>${requeridaFormatted}</td>
                          </tr>
                          <tr>
                            <th>Despachada: </th>
                            <td>${diaEnvioFormatted}</td>
                          </tr>
                          <tr>
                            <th>Empleado: </th>
                            <td>${nombreEmpleado}</td>
                          </tr>
                        </table>
                      `;
                      tablaEmpleado.innerHTML = tablaEmpleadoHTML;
                    } else {
                      console.log(
                        "No se encontró ningún empleado con el ID proporcionado."
                      );
                      tablaEmpleado.innerHTML =
                        "<p>No se encontró información del empleado.</p>";
                    }
                  })
                  .catch(function (error) {
                    console.log(
                      "Error al obtener los datos del empleado:",
                      error
                    );
                    tablaEmpleado.innerHTML =
                      "<p>Error al obtener los datos del empleado. Por favor, inténtalo de nuevo más tarde.</p>";
                  });
              } else {
                console.log(
                  "No se encontró ningún cliente con el ID proporcionado."
                );
                tablaFactura.innerHTML =
                  "<p>No se encontró información del cliente.</p>";
              }
            })
            .catch(function (error) {
              console.log("Error al obtener los datos del cliente:", error);
              tablaFactura.innerHTML =
                "<p>Error al obtener los datos del cliente. Por favor, inténtalo de nuevo más tarde.</p>";
            });
        } else {
          console.log(
            "No se encontró ningún documento con el ID proporcionado."
          );
          tablaFactura.innerHTML =
            "<p>No se encontró ninguna factura con el ID proporcionado.</p>";
        }
      })
      .catch(function (error) {
        console.log("Error al obtener los datos de la factura:", error);
        tablaFactura.innerHTML =
          "<p>Error al obtener los datos de la factura. Por favor, inténtalo de nuevo más tarde.</p>";
      });
  });
});
