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
        document.getElementById('idTicket').value = idTicket;
    }
}


function getProducts() {

    var url = 'https://helpdeskwebservices.tk/api/Productos';
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
            body += `<option value="${data[i].ProductoID}">${data[i].Decripcion}</option>`;
        }

        document.getElementById('productoid').innerHTML = body;
    }

}


function addProdsTemp() {

    var tabladatos = document.getElementById('tabla-de-datos-body');
    var idticket = document.getElementById('idTicket').value;
    var selectDeProductos = document.getElementById('productoid');
    var productoID = document.getElementById('productoid').value;
    var productoNombre = selectDeProductos.options[selectDeProductos.selectedIndex].text;
    var cantidad = document.getElementById('cantidad').value;
    var precio = document.getElementById('precio').value;

    let datos = [];

    if (cantidad == '') {
        document.getElementById('cantidadMensaje').innerHTML = 'Llena estos datos para continuar';
    }
    else if (precio == '') {
        document.getElementById('cantidadMensaje').innerHTML = '';
        document.getElementById('precioMensaje').innerHTML = 'Llena estos datos para continuar';
    }
    else {

        document.getElementById('cantidadMensaje').innerHTML = '';
        document.getElementById('precioMensaje').innerHTML = '';

        datos.push(productoID, productoNombre, cantidad, precio);

        console.log(datos);

        for (let i = 0; i < 1; i++) {
            tabladatos.innerHTML += "<td>" + datos[i++] + "</td>" + "<td>" + datos[i++] + "</td>" + "<td>" + datos[i++] + "</td>" + "<td>" + datos[i++] + "</td>";
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "TicketID": idticket,
            "ProductoID": productoID,
            "Cantidad": cantidad
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        var url = 'https://helpdeskwebservices.tk/CrearInsumo';

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

            console.log('se insertó insumo');

        }
    }
}


function ticketSolver() {

    var tipoAccionTicket = document.getElementById('estadoTicket').value;
    var idticket = document.getElementById('idTicket').value;
    var comentario = document.getElementById('comentarioFinal').value;

    if (idticket == '' || comentario == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Agrega un comentario para el usuario',
            confirmButtonText: 'Entendido',
        }).then((result) => {
            if (result.isConfirmed) {
            } else if (result.isDenied) {
            }
        });

        console.log('No agregó comentario');
    }

    else {

        if (tipoAccionTicket == 3) {
            ticketInExecute();
        }
        else if (tipoAccionTicket == 4) {
            ticketInReview();
        }
        else if (tipoAccionTicket == 5) {
            ticketFinish();
        }
        else {
            //nothing action
        }

    }

}


function ticketInExecute() {

    console.log('Ticket se cambia a Ejecución');

    var idticket = document.getElementById('idTicket').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "TicketId": idticket
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/EjecutarTicket';

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
                location.reload();
            } else if (result.isDenied) {
                location.reload();
            }
        });
    }
}




function ticketInReview() {

    console.log('Ticket se cambia a En Revisión');

    var idticket = document.getElementById('idTicket').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "TicketId": idticket
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/RevisarTicket';

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
                location.reload();
            } else if (result.isDenied) {
                location.reload();
            }
        });
    }
}



function ticketFinish() {

    console.log('Ticket se cambia a Finalizado');

    var idticket = document.getElementById('idTicket').value;
    var comentario = document.getElementById('comentarioFinal').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "TicketId": idticket,
        "ComentarioFinal": '' + comentario + ''
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/FinalizarTicket';

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
                window.location.href = 'status-tickets.html';
            } else if (result.isDenied) {
                window.location.href = 'status-tickets.html';
            }
        });
    }
}


getProducts();
obtainTicketsPerIDTicket();