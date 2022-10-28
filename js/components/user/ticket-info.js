function permissionAuthLogin() {

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

        body += `<div class="descripcion-ticket alert green-font-color mt-3 white-text-color h-auto">
            <p class="h5">${data.EstadoTicket}</p>
          </div>
          <div class="row">
            <div class="col-md-6">
              <p class="font-weight-bold mt-4 fw-bold">
              #${data.TicketID}, ${data.Asunto}
              </p>
              <p class="mt-3">Departamento: ${data.Departamento}</p>
              <p class="mt-3 fw-bold">Incidencia: ${data.Incidencia}</p>
              <p class="fw-bold mt-3">Prioridad: ${data.Prioridad}</p>
            </div>
            <div class="col-md-6">
              <p class="mt-4 fw-bold">Responsable: ${data.Responsable}</p>
              <p class="mt-3">Fecha de creación: ${data.FechaCreacion}</p>
              <p class="mt-3">Fecha de resolución: ${data.FechaFinalizacion}</p>
              <p class="fw-bold mt-3">Estado: ${data.EstadoTicket}</p>
            </div>
          </div>
          <div class="descripcion-ticket border border-1 p-4 mt-4 h-auto">
            <p>
            ${data.Descripcion}
            </p>
          </div>
          <p class="mt-5">Adjuntos:</p>
          <p class="mt-2 text-decoration-underline blue-text-color">
            <a href="${data.Adjuntos}" target="_blank" class="fw-bold">${data.Adjuntos}</a>
          </p>
          <div class="descripcion-solucion border border-1 p-4 mt-5 h-auto">
            <p>Comentarios de Soporte:</p>
            <p class="mt-4">
            ${data.ComentarioFinal}
            </p>
          </div>
          <div class="descripcion-solucion mt-5 h-auto text-center">
            <p><i class="fa-solid fa-star text-warning h5"></i><i
                class="fa-solid fa-star text-warning h5"></i><i
                class="fa-solid fa-star text-warning h5"></i><i class="fa-solid fa-star text-warning h5"></i>
              <i class="fa-solid fa-star text-warning h5"></i>
            </p>
            <a href="#" class="btn green-font-color white-text-color" data-bs-toggle="modal"
              data-bs-target="#modalCalificacion"><span class="h5">¡Califica nuestro servicio aquí!</span></a>
          </div>`;

        document.getElementById('ticket-info-por-id').innerHTML = body;
    }
}


function sendKPISurvey() {

    var cantEstrellas = document.getElementById('estrellas').value;
    var comentario = document.getElementById('comentario').value;

    const url2 = window.location.search;
    const ticketIdBuscar = new URLSearchParams(url2);

    for (const datoObtenido of ticketIdBuscar) {
        var idTicket = datoObtenido[0];
    }

    if (cantEstrellas == "" || cantEstrellas == null) {
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Debes ingresar la cantidad de estrellas (1 - 5)'
        });
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "TicketId": idTicket,
            "Puntuacion": cantEstrellas,
            "ComentarioEncuesta": ''+ comentario +''
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        var url = 'https://helpdeskwebservices.tk/TicketPuntuar';

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => exitoso(result))
            .catch(error => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al crear el departamento, código de error: ' + error,
                confirmButtonText: 'Entendido',
            }));

        const exitoso = (result) => {

            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Gracias por tomarte el tiempo de llenar esta encuesta, no olvides tomar agua.',
                confirmButtonText: 'Entendido',
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('estrellas').value = 5;
                    document.getElementById('comentario').value = '';
                    $('#modalCalificacion').modal('hide');
                } else if (result.isDenied) {
                    document.getElementById('estrellas').value = 5;
                    document.getElementById('comentario').value = '';
                    $('#modalCalificacion').modal('hide');
                }
            });
        }
    }
}

obtainTicketsPerIDTicket();