function permissionAuthLogin() {

    document.getElementById('guardarTicket').style.display = 'none';

    var dataTokenFromSuccessLogin = sessionStorage.tokenAuth;
    var userLog = sessionStorage.user;
    var idUsuarioLogueado = sessionStorage.userid;

    if (dataTokenFromSuccessLogin == '' || dataTokenFromSuccessLogin == null) {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('tokenAuth');
        sessionStorage.removeItem('user');
        window.location.href = '../../../index.html';
    }
    else if (dataTokenFromSuccessLogin == 'Administrador' || dataTokenFromSuccessLogin == 'User') {
        console.log('sesionAprobada');
    }
    else {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('tokenAuth');
        sessionStorage.removeItem('user');
        window.location.href = '../../../index.html';
    }
}

function closeSession() {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('tokenAuth');
    sessionStorage.removeItem('user');
    window.location.href = '../../../index.html';

}

function saveTicketButtonDisplay() {

    var descripcion = document.getElementById('descripcion').value;

    if (descripcion == '') {
        document.getElementById('guardarTicket').style.display = 'none';
        document.getElementById('submitValidacion').style.display = 'block';
    }
    else {
        document.getElementById('guardarTicket').style.display = 'block';
        document.getElementById('submitValidacion').style.display = 'none';
    }
}

function createTicket() {

    var idUsuarioLogueado = sessionStorage.userid;

    var nombreCompleto = document.getElementById('nombreCompleto').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;
    var ubicacion = document.getElementById('ubicaciones').value;
    var ubicacionred = document.getElementById('ubicacionRed').value;
    var asunto = document.getElementById('asunto').value;
    var tipoticket = document.getElementById('tipoDeTicket').value;
    var departamentos = document.getElementById('departamentos').value;
    var prioridad = document.getElementById('prioridades').value;
    var tiposolicitud = document.getElementById('categorias').value;
    var descripcion = document.getElementById('descripcion').value;
    var adjuntos = document.getElementById('link').value;


    if (nombreCompleto == '' || telefono == '' || tiposolicitud == '' || tipoticket == '') {
        //bootstrap validate
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "UsuarioId": idUsuarioLogueado,
            "IncidenciaId": tiposolicitud,
            "PrioridadId": prioridad,
            "NombreCompleto": '' + nombreCompleto + '',
            "Telefono": '' + telefono + '',
            "Email": '' + email + '',
            "UbicacionID": ubicacion,
            "UbicacionRed": '' + ubicacionred + '',
            "Asunto": '' + asunto + '',
            "Descripcion": '' + descripcion + '',
            "Adjuntos": '' + adjuntos + '',
            "DepartamentoId": departamentos,
            "TipoTicketId": tipoticket
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        var url = 'https://helpdeskwebservices.tk/CrearTicket';

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => exitoso(result))
            .catch(error => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error en la operación, código de error: ' + error,
                confirmButtonText: 'Entendido',
            }));

        const exitoso = (result) => {

            var text = 'Su ticket fue creado con éxito, ' +
                'el asunto fue: ' + asunto + ', pronto nos estaremos comunicando con usted.';

            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: text,
                confirmButtonText: 'Entendido',

            }).then((result) => {
                if (result.isConfirmed) {

                    window.location.href = '../../../support/user/new-ticket.html';

                } else if (result.isDenied) {

                    window.location.href = '../../../support/user/new-ticket.html';

                }
            });
        }
    }
}


function getDepartments() {

    var url = 'https://helpdeskwebservices.tk/api/Departamentos/';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al obtener los datos, código de error: ' + error,
            confirmButtonText: 'Entendido',
        }));

    const mostrarData = (data) => {
        let body = '';
        for (var i = 0; i < data.length; i++) {
            body += `<option value="${data[i].DepartamentoID}">${data[i].Descripcion}</option>`;
        }
        document.getElementById('departamentos').innerHTML = body;
    }
}


function getPriority() {

    var url = 'https://helpdeskwebservices.tk/api/Prioridad';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al obtener los datos, código de error: ' + error,
            confirmButtonText: 'Entendido',
        }));

    const mostrarData = (data) => {
        let body = '';
        for (var i = 0; i < data.length; i++) {
            body += `<option value="${data[i].PrioridadID}">${data[i].Prioridad}</option>`;
        }
        document.getElementById('prioridades').innerHTML = body;
    }
}


function getTicketCategory() {

    var url = 'https://helpdeskwebservices.tk/api/Categorias';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al obtener los datos, código de error: ' + error,
            confirmButtonText: 'Entendido',
        }));

    const mostrarData = (data) => {
        let body = '';
        for (var i = 0; i < data.length; i++) {
            body += `<option value="${data[i].CategoriaID}">${data[i].Descripcion}</option>`;
        }
        document.getElementById('categorias').innerHTML = body;
    }
}


function getUbications() {

    var url = 'https://helpdeskwebservices.tk/api/Ubicaciones';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al obtener los datos, código de error: ' + error,
            confirmButtonText: 'Entendido',
        }));

    const mostrarData = (data) => {
        let body = '';
        for (var i = 0; i < data.length; i++) {
            body += `<option value="${data[i].UbicacionID}">${data[i].Ubicacion}</option>`;
        }
        document.getElementById('ubicaciones').innerHTML = body;
    }
}


function getTicketType() {

    var url = 'https://helpdeskwebservices.tk/api/TipoTicket';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al obtener los datos, código de error: ' + error,
            confirmButtonText: 'Entendido',
        }));

    const mostrarData = (data) => {
        let body = '';
        for (var i = 0; i < data.length; i++) {
            body += `<option value="${data[i].TipoTicketID}">${data[i].Descripcion}</option>`;
        }
        document.getElementById('tipoDeTicket').innerHTML = body;
    }
}


getTicketType();
getUbications();
getTicketCategory();
getPriority();
getDepartments();