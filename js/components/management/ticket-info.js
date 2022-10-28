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



function obtainTicketsPerIDTicket() {

    const url2 = window.location.search;
    const ticketIdBuscar = new URLSearchParams(url2);

    for (const datoObtenido of ticketIdBuscar) {
        var idTicket = datoObtenido[0];
    }

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var url = 'https://helpdeskwebservices.tk/api/Ticket/' + idTicket;

    fetch(url, requestOptions)
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

        body += `<div class="card white-font-color">
        <div class="card-body w-100">
            <p class="fw-bold">Ticket</p>
            <div class="ticket-form p-2">
                <div
                    class="descripcion-ticket alert green-font-color mt-4 white-text-color h-auto">
                    <p class="fw-bold h3">${data.EstadoTicket}</p>
                </div>
                <p class="h4 font-weight-bold mt-5">#${data.TicketID} ${data.Asunto}</p>
                <p class="h5 mt-3">Departamento: ${data.Departamento}</p>
                <p class="h5 mt-3 fw-bold">Tipo de Incidencia: ${data.Incidencia}</p>
                <p class="h5 fw-bold mt-3">Prioridad: ${data.Prioridad}</p>
                <p class="h5 mt-3">Fecha de creación: ${data.FechaCreacion}</p>

                <div class="descripcion-ticket border border-4 p-5 mt-5 h-auto">
                    <p>LOS COMENTARIOS DEL USUARIO SOLICITANTE FUERON: ${data.Descripcion}</p>
                </div>
                <p class="h5 mt-5">Adjuntos:</p>
                <a href="${data.Adjuntos}" target="_blank" class="h5 mt-3 text-decoration-underline blue-text-color">
                </a>
                <div class="descripcion-solucion border border-4 p-5 mt-5 h-auto">
                    <p>Comentarios de Soporte:</p>
                    <p class="mt-4">${data.ComentarioFinal}</p>
                </div>
            </div>

        </div>
    </div>`;

        document.getElementById('ticket-info-por-id').innerHTML = body;
    }
}

function getStatus(){

}

obtainTicketsPerIDTicket();