function permissionAuthLogin() {

    var dataTokenFromSuccessLogin = sessionStorage.tokenAuth;
    var userLog = sessionStorage.user;
    var idUsuarioLogueado = sessionStorage.userid;
    var departamentoid = sessionStorage.departamentoID;

    if (dataTokenFromSuccessLogin == '' || dataTokenFromSuccessLogin == null) {

        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('tokenAuth');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('departamentoID');

        window.location.href = '../../index.html';
    }
    else if (dataTokenFromSuccessLogin == 'Administrador' || dataTokenFromSuccessLogin == 'Super Administrador') {
        console.log('sesionAprobada');
    }
    else {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('tokenAuth');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('departamentoID');

        window.location.href = '../../index.html';
    }
}

function closeSession() {

    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('tokenAuth');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('departamentoID');

    window.location.href = '../../index.html';
}


function getTicketsPerDepartmentID() {


    var departamentoID = sessionStorage.departamentoID;

    var url = 'https://helpdeskwebservices.tk/TicketFiltroDepartamento';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "DepartamentoID": departamentoID
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => exitoso(result))
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error en la operación, código de error: ' + error,
            confirmButtonText: 'Entendido',
        }));

    const exitoso = (result) => {

        var usuarioIDLogueado = sessionStorage.userid;

        let body = '';

        for (var i = 0; i < result.length; i++) {

            var estadoTicket = result[i].EstadoTicketID.toString();

            if (estadoTicket != 1) {
                //nothing
            }
            else {

                var permiso = sessionStorage.tokenAuth;

                if (permiso == 'Super Administrador') {

                    body += `<tr class="tickets">
                    <td>
                        <p><span class="fw-bold pink-font-color p-2 text-white">
                        ${result[i].TicketID}
                    </span></p>
                    </td>
                    <td>
                        <p class="green-font-color text-white p-2">${result[i].EstadoTicket}</p>
                    </td>
                    <td>
                        <p>${result[i].UserName}</p>
                    </td>
                    <td>
                        <p>${result[i].Nombre}, ${result[i].Apellido}</p>
                    </td>
                    <td>
                        <p>${result[i].Telefono}</p>
                    </td>
                    <td>
                        <p>${result[i].Email}</p>
                    </td>
                    <td>
                        <p>${result[i].Ubicacion}</p>
                    </td>
                    <td>
                        <p>${result[i].UbicacionRed}</p>
                    </td>
                    <td>
                        <p>${result[i].Asunto}</p>
                    </td>
                    <td>
                        <p>${result[i].Incidencia}</p>
                    </td>
                    <td>
                        <p>${result[i].UsuarioDepartamento.toUpperCase()}</p>
                    </td>
                    <td>
                        <p>${result[i].Prioridad}</p>
                    </td>
                    <td>
                        <p>${result[i].TipoTicket}</p>
                    </td>
                    <td>
                        <p>${result[i].FechaCreacion}</p>
                    </td>
                    <td>
                        <button class="btn btn-primary" 
                            onclick="assigneTicket(${result[i].TicketID},${usuarioIDLogueado})">
                        <i class="fa-sharp fa-solid fa-user-plus fs-5"></i></button>
                        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#asignarTicketPersona"
                         onclick="document.getElementById('idTicketAsignarPersona').value = ${result[i].TicketID};"><i class="fa-sharp fa-solid fa-user-tie fs-5 black-text-color"></i></button>
                        <button class="btn btn-danger" onclick="rejectedTicket(${result[i].TicketID})"><i class="fa-solid fa-trash fs-5"></i></button>
                    </td>
                </tr>`;

                }
                else {
                    body += `<tr class="tickets">
                    <td>
                        <p><span class="fw-bold pink-font-color p-2 text-white">
                        ${result[i].TicketID}
                    </span></p>
                    </td>
                    <td>
                        <p class="green-font-color text-white p-2">${result[i].EstadoTicket}</p>
                    </td>
                    <td>
                        <p>${result[i].UserName}</p>
                    </td>
                    <td>
                        <p>${result[i].Nombre}, ${result[i].Apellido}</p>
                    </td>
                    <td>
                        <p>${result[i].Telefono}</p>
                    </td>
                    <td>
                        <p>${result[i].Email}</p>
                    </td>
                    <td>
                        <p>${result[i].Ubicacion}</p>
                    </td>
                    <td>
                        <p>${result[i].UbicacionRed}</p>
                    </td>
                    <td>
                        <p>${result[i].Asunto}</p>
                    </td>
                    <td>
                        <p>${result[i].Incidencia}</p>
                    </td>
                    <td>
                        <p>${result[i].UsuarioDepartamento.toUpperCase()}</p>
                    </td>
                    <td>
                        <p>${result[i].Prioridad}</p>
                    </td>
                    <td>
                        <p>${result[i].TipoTicket}</p>
                    </td>
                    <td>
                        <p>${result[i].FechaCreacion}</p>
                    </td>
                    <td>
                        <button class="btn btn-primary" 
                            onclick="assigneTicket(${result[i].TicketID},${usuarioIDLogueado})">
                        <i class="fa-sharp fa-solid fa-user-plus fs-5"></i></button>
                        <button class="btn btn-warning" disabled title="Se requiere permiso de Super Administrador"><i class="fa-sharp fa-solid fa-user-tie fs-5 black-text-color"></i></button>
                        <button class="btn btn-danger" disabled title="Se requiere permiso de Super Administrador"><i class="fa-solid fa-trash fs-5"></i></button>
                    </td>
                </tr>`;
                }
            }
        }

        document.getElementById('tabla-de-datos-body').innerHTML = body;
    }
}


function assigneTicket(idTicket, idUsuarioLogueado) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "TicketId": idTicket,
        "UsuarioEncargadoId": idUsuarioLogueado
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/AsignarTicket';

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

        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'La operación se completó.',
            confirmButtonText: 'Entendido',
        }).then((result) => {
            if (result.isConfirmed) {
                getTicketsPerDepartmentID();
            } else if (result.isDenied) {
                getTicketsPerDepartmentID();
            }
        });
    }
}


function assigneTicketSuperAdmin() {

    var idTicket = document.getElementById('idTicketAsignarPersona').value;
    var usuarioAsignado = document.getElementById('usuarios').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "TicketId": idTicket,
        "UsuarioEncargadoId": usuarioAsignado
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/AsignarTicket';

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

        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'La operación se completó.',
            confirmButtonText: 'Entendido',
        }).then((result) => {
            if (result.isConfirmed) {
                $('#asignarTicketPersona').modal('toggle');
                getTicketsPerDepartmentID();
            } else if (result.isDenied) {
                $('#asignarTicketPersona').modal('toggle');
                getTicketsPerDepartmentID();
            }
        });
    }
}


function rejectedTicket(idTicket) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "TicketId": idTicket
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/RechazarTicket';

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

        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'La operación se completó.',
            confirmButtonText: 'Entendido',
        }).then((result) => {
            if (result.isConfirmed) {
                getTicketsPerDepartmentID();
            } else if (result.isDenied) {
                getTicketsPerDepartmentID();
            }
        });
    }
}


function getUsers() {

    var url = 'https://helpdeskwebservices.tk/Usuarios';

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

            var rol = data[i].Rol.toString();
            var tipoRoles = ['Administrador', 'Administrador;User;Test', 'Administrador;User', 'Administrador;User;Super Administrador'];

            if (rol == tipoRoles[0] || rol == tipoRoles[1] || rol == tipoRoles[2] || rol == tipoRoles[3]) {

                body += `<option value="${data[i].UsuarioID}">${data[i].Nombre}, ${data[i].Apellido}</option>`;
            }

            else {

                body += ``;
            }
        }


        document.getElementById('usuarios').innerHTML = body;

    }

}


document.addEventListener("keyup", e => {

    if (e.target.matches("#buscador")) {

        if (e.key === "Escape") e.target.value = ""

        document.querySelectorAll(".tickets").forEach(usuarioSelector => {

            usuarioSelector.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? usuarioSelector.classList.remove("filtro")
                : usuarioSelector.classList.add("filtro")
        })
    }
});

getUsers();
getTicketsPerDepartmentID();