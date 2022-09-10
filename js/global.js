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



//deshabilitar botón si no cumple con la contraseña
function disabledSaveButton() {
    var btnSubmitUser = document.getElementById("submitUser");
    btnSubmitUser.style.display = "none";
}

disabledSaveButton();



//validar la complejidad de la contraseña
function validarContrasena(data) {

    const regexPassSecurity = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})');

    if (regexPassSecurity.test(data)) {
        var btnSubmitUser = document.getElementById("submitUser");
        var btnSubmitUserFake = document.getElementById("submitUserFake");
        btnSubmitUserFake.style.display = "none"
        btnSubmitUser.style.display = "block";
    }
    else {

        if (data == "" || data == null) {
            //alerta que indica que la contraseña debe contener al menos 7 caracteres
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes llenar todos los campos para guardar'
            });

            var codigoEmpleado = document.getElementById("codigoEmpleado");
            codigoEmpleado.focus();

        }
        else {
            //alerta que indica que la contraseña debe contener al menos 7 caracteres
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'La contraseña es débil, intenta de nuevo.',
                showConfirmButton: false,
                timer: 1900
            })
            document.getElementById("userPassword").focus();
        }
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

    if (nombreRecursoFacturable, cantidadRecursoFacturable, precioRecursoFacturable, descripcionRecursoFacturable != "") {
        nombreFacturableMensaje.style.visibility = 'hidden';
    }
    else {
        nombreFacturableMensaje.style.color = "red";
        nombreFacturableMensaje.style.fontSize = "small";
        nombreFacturableMensaje.innerHTML = "* El valor no puede estar vacío *";

        cantidadFacturableMensaje.style.color = "red";
        cantidadFacturableMensaje.style.fontSize = "small";
        cantidadFacturableMensaje.innerHTML = "* El valor no puede estar vacío *";

        precioFacturableMensaje.style.color = "red";
        precioFacturableMensaje.style.fontSize = "small";
        precioFacturableMensaje.innerHTML = "* El valor no puede estar vacío *";

        descripcionFacturableMensaje.style.color = "red";
        descripcionFacturableMensaje.style.fontSize = "small";
        descripcionFacturableMensaje.innerHTML = "* El valor no puede estar vacío *";
    }



}


