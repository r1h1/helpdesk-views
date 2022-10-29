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

    let noData = '';
    noData += `<p class="text-muted text-center">-- El reporte no ha sido generado --</p>`;

    document.getElementById('iframe-datos-body').innerHTML = noData;
}

function generarReporte() {

    var idFechaInicio = document.getElementById('FechaI').value;
    var idFechaFin = document.getElementById('FechaF').value;
    var idEstadoTickt = document.getElementById('Estadoid').value;
    var idPrioridad = document.getElementById('Prioridad').value;

    if (idFechaFin == '' || idFechaFin == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese la fecha de inicio y fin para generar su reporte'
        });
    }
    else {

        let timerInterval
        Swal.fire({
            icon: 'info',
            title: 'Generando',
            html: 'Ten paciencia, estamos trabajando en ello',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })

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
    }
}


function obtainTodayDate() {

    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth() + 1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    document.getElementById('FechaI').value = ano + "-" + mes + "-" + dia;
    document.getElementById('FechaF').value = ano + "-" + mes + "-" + dia;

}

obtainTodayDate();
getCategories();