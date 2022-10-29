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
    document.getElementById('EstadoActual').style.display = 'none';
    document.getElementById('PrioridadActual').style.display = 'none';
}

function closeSession() {

    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('tokenAuth');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('departamentoID');

    window.location.href = '../../index.html';
}

function getCategories() {

    var url = 'https://helpdeskwebservices.tk/api/EstadoTicket';
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
        body += `<option value="0">TODOS</option>`;
        for (var i = 0; i < data.length; i++) {
            body += `<option value="${data[i].EstadoTicketID}">${data[i].EstadoTicket}</option>`;
        }
        document.getElementById('Estadoid').innerHTML = body;
    }
}
function getPrioridad() {

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
        body += `<option value="0">TODOS</option>`;
        for (var i = 0; i < data.length; i++) {
            body += `<option value="${data[i].PrioridadID}">${data[i].Prioridad}</option>`;
        }
        document.getElementById('Prioridad').innerHTML = body;
    }
}
// function editDepartment(id, descripcion) {

//     document.getElementById('idDepartamento').value = id;
//     document.getElementById('nombreDepartamento').value = descripcion;

//     document.getElementById('generarReporte').style.display = 'block';
//     document.getElementById('saveDepartment').style.display = 'none';

// }

function generarReporte() {

    var idFechaInicio = document.getElementById('FechaI').value;
    var idFechaFin = document.getElementById('FechaF').value;
    var idEstadoTickt = document.getElementById('Estadoid').value;
    var idPrioridad = document.getElementById('Prioridad').value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "FechaInicio": '' + idFechaInicio + '',
        "FechaFin": '' + idFechaFin + '',
        "EstadoTickt": '' + idEstadoTickt + ''
    });
    let body = ''
    body += `<iframe src="http://helpdeskreports.tk/ReporteTickets?psFechaI=${idFechaInicio}&psFechaF=${idFechaFin}&psEstado=${idEstadoTickt}&psPrioridad=${idPrioridad}"
    style="width:100%; height:800px;" fram<eborder="0"></iframe>`
    document.getElementById('iframe-datos-body').innerHTML = body;
    console.log(body)
}

document.addEventListener("keyup", e => {

    if (e.target.matches("#buscador")) {

        if (e.key === "Escape") e.target.value = ""

        document.querySelectorAll(".departamento").forEach(departamentoSelector => {

            departamentoSelector.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? departamentoSelector.classList.remove("filtro")
                : departamentoSelector.classList.add("filtro")
        })

    }


});

getCategories()
getPrioridad()