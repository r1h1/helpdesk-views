//habilitar campos para agregar recursos facturables
function habilitarRecursoFacturable() {

    var divRecursoFacturable = document.getElementById("recursosFacturables");
    var divTablaTempRecursosFacturables = document.getElementById("tablaTempRecursosFacturables");
    var botonRecursoFacturable = document.getElementById("botonRecursoFacturable");

    if (divRecursoFacturable.style.display === "none") {

        divRecursoFacturable.style.display = "block";
        divTablaTempRecursosFacturables.style.display = "block";
        botonRecursoFacturable.innerHTML = '- Ocultar Recurso Facturable'

    } else {

        divRecursoFacturable.style.display = "none";
        divTablaTempRecursosFacturables.style.display = "none";
        botonRecursoFacturable.innerHTML = '+ Añadir Recurso Facturable'
    }
}


/* Esta función valida que el nombre de empleado esté lleno antes de presionar el botón agregar */

function validarAgregarEmpleadoAlGrupo() {

    var campoNombreDelEmpleado = document.getElementById("nombreEmpleado").value;
    var mensajeErrorEmpleado = document.getElementById("empleadoMensaje");

    console.log(campoNombreDelEmpleado);
    if (campoNombreDelEmpleado != "") {
        mensajeErrorEmpleado.style.opacity = 0;
        mensajeErrorEmpleado.style.visibility = 'hidden';
    }
    else {
        mensajeErrorEmpleado.style.opacity = 1;
        mensajeErrorEmpleado.style.color = "red";
        mensajeErrorEmpleado.style.marginTop = "4px";
        mensajeErrorEmpleado.style.fontSize = "small";
        mensajeErrorEmpleado.innerHTML = "* El valor no puede estar vacío *";
    }
}



/* Esta función valida que el nombre de empleado esté lleno antes de presionar el botón agregar */

function validarFacturables() {

    //inputs
    var nombreRecursoFacturable = document.getElementById("nombreRecursoFacturableTxt").value;
    var cantidadRecursoFacturable = document.getElementById("cantidadRecursoFacturableTxt").value;
    var precioRecursoFacturable = document.getElementById("precioRecursoFacturableTxt").value;
    var descripcionRecursoFacturable = document.getElementById("descripcionRecursoFacturableTxt").value;

    //mensajes
    var nombreFacturableMensaje = document.getElementById("nombreFacturableMensaje");
    var cantidadFacturableMensaje = document.getElementById("cantidadFacturableMensaje");
    var precioFacturableMensaje = document.getElementById("precioFacturableMensaje");
    var descripcionFacturableMensaje = document.getElementById("descripcionFacturableMensaje");

    if (nombreRecursoFacturable != "") {
        nombreFacturableMensaje.style.visibility = 'hidden';
    }
    if (nombreRecursoFacturable == "") {
        nombreFacturableMensaje.style.color = "red";
        nombreFacturableMensaje.style.fontSize = "small";
        nombreFacturableMensaje.innerHTML = "* El valor no puede estar vacío *";
    }
    if (cantidadRecursoFacturable != "") {
        cantidadFacturableMensaje.style.visibility = 'hidden';
    }
    if (cantidadRecursoFacturable == "") {
        cantidadFacturableMensaje.style.color = "red";
        cantidadFacturableMensaje.style.fontSize = "small";
        cantidadFacturableMensaje.innerHTML = "* El valor no puede estar vacío *";
    }
    if (precioRecursoFacturable != "") {
        precioFacturableMensaje.style.visibility = 'hidden';
    }
    if (precioRecursoFacturable == "") {
        precioFacturableMensaje.style.color = "red";
        precioFacturableMensaje.style.fontSize = "small";
        precioFacturableMensaje.innerHTML = "* El valor no puede estar vacío *";
    }
    if (descripcionFacturableMensaje != "") {
        descripcionFacturableMensaje.style.visibility = 'hidden';
    }
    if (descripcionFacturableMensaje == "") {
        descripcionFacturableMensaje.style.color = "red";
        descripcionFacturableMensaje.style.fontSize = "small";
        descripcionFacturableMensaje.innerHTML = "* El valor no puede estar vacío *";
    }
}

