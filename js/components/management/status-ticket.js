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


function getTicketsPerUserID() {


    var usuarioIDLogueado = sessionStorage.user;

    var url = 'https://helpdeskwebservices.tk/TicketFiltroEncargado';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "UserName": '' + usuarioIDLogueado + ''
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

        let body = '';

        for (var i = 0; i < result.length; i++) {

            body += `<tr class="tickets">
                    <td>
                        <a href="ticket-info.html?${result[i].TicketID}" 
                            class="fw-bold pink-font-color px-5 py-2 text-white">
                            ${result[i].TicketID}
                        </a>
                    </td>
                    <td>
                        <p class="green-font-color text-white p-2">${result[i].EstadoTicket}</p>
                    </td>
                    <td>
                        <p class="fw-bold bg-primary text-white p-2">${result[i].EncargadoNombre} ${result[i].EncargadoApellido}</p>
                    </td>
                    <td>
                        <p>${result[i].Prioridad}</p>
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
                        <p>${result[i].TipoTicket}</p>
                    </td>
                    <td>
                        <p>${result[i].FechaCreacion}</p>
                    </td>
                    <td>
                        <p>${result[i].FechaAsignacion}</p>
                    </td>
                </tr>`;
        }

        document.getElementById('tabla-de-datos-body').innerHTML = body;
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


getTicketsPerUserID();