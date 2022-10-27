function permissionAuthLogin() {

    var resultTokenFromSuccessLogin = sessionStorage.tokenAuth;
    var userLog = sessionStorage.user;
    var idUsuarioLogueado = sessionStorage.userid;

    if (resultTokenFromSuccessLogin == '' || resultTokenFromSuccessLogin == null) {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('tokenAuth');
        sessionStorage.removeItem('user');
        window.location.href = '../../../index.html';
    }
    else if (resultTokenFromSuccessLogin == 'Administrador' || resultTokenFromSuccessLogin == 'User') {
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

function obtainTicketsPerUser() {

    var userFilter = sessionStorage.user;

    var url = 'https://helpdeskwebservices.tk/TicketFiltroUsuario';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "UserName": '' + userFilter + ''
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
            text: 'Hubo un error al intentar ingresar, código de error: ' + error,
            confirmButtonText: 'Entendido',
        }));

    const exitoso = (result) => {

        let body = '';

        if (result.length < 1) {
            body = `<div class="mb-2 mt-4">
            <div class="card">
              <div class="card-header text-center fw-bold">-- No existen tickets creados con este usuario --</div>
            </div>
          </div>`
        }

        for (var i = 0; i < result.length; i++) {



            let coloresTicket = ["green-font-color", "blue-font-color", "gray-font-color", "bg-light"];
            let colorAsignadoTicket = '';
            let estadoTicket = result[i].EstadoTicket.toUpperCase();

            if (estadoTicket == 'CREADO' || estadoTicket == 'ASIGNADO') {
                colorAsignadoTicket = coloresTicket[0];
            }
            else if (estadoTicket == 'EN EJECUCION' || estadoTicket == 'EN REVISION') {
                colorAsignadoTicket = coloresTicket[1];
            }
            else if (estadoTicket == 'FINALIZADO') {
                colorAsignadoTicket = coloresTicket[2];
            }
            else {
                colorAsignadoTicket = coloresTicket[3];
            }

            body += `<div class="mb-2 mt-4">
            <div class="card">
              <div class="card-header ${colorAsignadoTicket} fw-bold">No. #${result[i].TicketID}</div>
              <div class="card-body">
                <a href="ticket-info.html?${result[i].TicketID}" class="fw-bold">
                ${result[i].Asunto}
                </a>
                <p>
                <br>Fecha de creación: ${result[i].FechaCreacion}<br> Agente Asignado: ${result[i].EncargadoNombre} ${result[i].EncargadoApellido}
                </br>
                </p>
                <p>
                  Usuario que Solicita:
                  <span class="fw-bold text-decoration-underline">${result[i].Nombre}, ${result[i].Apellido}</span>
                </p>
                <p>
                  Status:
                  <span class="fw-bold text-decoration-underline">${estadoTicket}</span>
                </p>
              </div>
            </div>
          </div>`
        }
        document.getElementById('tickets-por-usuario').innerHTML = body;
    }
}

obtainTicketsPerUser();