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


function obtainAssignedTickets() {

    var userFilter = sessionStorage.user;

    var url = 'https://helpdeskwebservices.tk/TicketCantidad';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "UserName": '' + userFilter + '',
        "EstadoTicketId": 2
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

        var cantidad = result.length;

        if (cantidad < 1) {
            document.getElementById('ticketsAsignados').innerHTML = '0';
        }
        else {
            document.getElementById('ticketsAsignados').innerHTML = result[0].TicketQuantity;
        }
    }
}


function obtainExecutionTickets() {

    var userFilter = sessionStorage.user;

    var url = 'https://helpdeskwebservices.tk/TicketCantidad';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "UserName": '' + userFilter + '',
        "EstadoTicketId": 3
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

        var cantidad = result.length;

        if (cantidad < 1) {
            document.getElementById('ticketsEnEjecucion').innerHTML = '0';
        }
        else {
            document.getElementById('ticketsEnEjecucion').innerHTML = result[0].TicketQuantity;
        }
    }
}


function obtainCloseTickets() {

    var userFilter = sessionStorage.user;

    var url = 'https://helpdeskwebservices.tk/TicketCantidad';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "UserName": '' + userFilter + '',
        "EstadoTicketId": 5
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
        var cantidad = result.length;

        if (cantidad < 1) {
            document.getElementById('ticketsFinalizados').innerHTML = '0';
        }
        else {
            document.getElementById('ticketsFinalizados').innerHTML = result[0].TicketQuantity;
        }
    }
}


obtainAssignedTickets();
obtainExecutionTickets();
obtainCloseTickets();
