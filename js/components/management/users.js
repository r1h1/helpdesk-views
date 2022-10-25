function permissionAuthLogin() {

    var dataTokenFromSuccessLogin = sessionStorage.tokenAuth;
    var userLog = sessionStorage.user;
    var idUsuarioLogueado = sessionStorage.userid;

    if (dataTokenFromSuccessLogin == '' || dataTokenFromSuccessLogin == null) {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('tokenAuth');
        sessionStorage.removeItem('user');
        window.location.href = '../../index.html';
    }
    else if (dataTokenFromSuccessLogin != 'Administrador') {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('tokenAuth');
        sessionStorage.removeItem('user');
        window.location.href = '../../index.html';
    }
    else if (dataTokenFromSuccessLogin == 'Administrador') {
        console.log('sesionAprobada');
    }
    else {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('tokenAuth');
        sessionStorage.removeItem('user');
        window.location.href = '../../index.html';
    }
}

function closeSession() {

    sessionStorage.removeItem('userid');
        sessionStorage.removeItem('tokenAuth');
        sessionStorage.removeItem('user');
    window.location.href = '../../index.html';
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

            var estadoUsuario = data[i].Estado.toString();

            if (estadoUsuario == 'INACTIVO') {

                body += `<tr class="usuario text-center">
                <td hidden>${data[i].UsuarioID}</td>
                <td>${data[i].CodigoEmpleado}</td>
                <td>${data[i].Usuario}</td>
                <td>${data[i].Nombre}, ${data[i].Apellido}</td>
                <td class="text-uppercase">${data[i].Departamento}</td>
                <td>${data[i].Rol}</td>
                <td><a class="bg-danger text-light p-2 rounded">DESACTIVADO</a></td>
                <td>contraseña</td>
                <td><a class="btn btn-warning text-dark fw-bold" 
                    onclick="editUser(${data[i].UsuarioID}, ${data[i].CodigoEmpleado}, '${data[i].Usuario}', '${data[i].Nombre}', '${data[i].Apellido}'
                        , '${data[i].Departamento}', '${data[i].Rol}', 'Pruebas#12345');">
                    <i class="fa-solid fa-pen-to-square"></i></a>
                    <button class="btn btn-primary text-white fw-bold" disabled><i class="fa-solid fa-user-tag"></i></button>
                    <button class="btn btn-danger text-white fw-bold" onclick="deleteUser(${data[i].CodigoEmpleado});" disabled><i class="fa-solid fa-trash"></i></button>
                </td>
                </tr>`;
            }

            else if (estadoUsuario == 'ACTIVO') {

                body += `<tr class="usuario text-center">
                <td hidden>${data[i].UsuarioID}</td>
                <td>${data[i].CodigoEmpleado}</td>
                <td>${data[i].Usuario}</td>
                <td>${data[i].Nombre}, ${data[i].Apellido}</td>
                <td class="text-uppercase">${data[i].Departamento}</td>
                <td>${data[i].Rol}</td>
                <td><a class="bg-success text-light p-2 rounded">${data[i].Estado}</a></td>
                <td>contraseña</td>
                <td><a class="btn btn-warning text-dark fw-bold" 
                    onclick="editUser(${data[i].UsuarioID}, ${data[i].CodigoEmpleado}, '${data[i].Usuario}', '${data[i].Nombre}', '${data[i].Apellido}'
                        , '${data[i].Departamento}', '${data[i].Rol}', 'Pruebas#12345');">
                    <i class="fa-solid fa-pen-to-square"></i></a>
                    <button class="btn btn-primary text-white fw-bold" data-bs-toggle="modal" data-bs-target="#asignarRolModal"
                        onclick="document.getElementById('idUsuarioAsignarRol').value = ${data[i].UsuarioID};"><i class="fa-solid fa-user-tag"></i></button>
                    <button class="btn btn-danger text-white fw-bold" onclick="deleteUser(${data[i].CodigoEmpleado});"><i class="fa-solid fa-trash"></i></button>
                </td>
                </tr>`;
            }
            else {
                body += `<tr class="usuario">
                    <td>-- No existen datos para mostrar --</td>
                </tr>`;
            }
        }


        document.getElementById('tabla-de-datos-body').innerHTML = body;

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


function createUser() {

    document.getElementById('saveUser').style.display = 'block';
    document.getElementById('updateDivUser').style.display = 'none';


    var codigoEmpleado = document.getElementById('codigoEmpleado').value;
    var usuario = document.getElementById('usuario').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var departamento = document.getElementById('departamentos').value;
    var estado = document.getElementById('status').value;
    var contraseña = document.getElementById('password').value;


    if (codigoEmpleado == '' || nombre == '' || contraseña == '' || apellido == '' || usuario == '') {
        //bootstrap validate
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "CodigoEmpleado": codigoEmpleado,
            "Nombre": "" + nombre + "",
            "Apellido": "" + apellido + "",
            "DepartamentoID": departamento,
            "EstadoID": estado,
            "UserName": "" + usuario + "",
            "UserPass": "" + contraseña + ""
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        var url = 'https://helpdeskwebservices.tk/CrearUsuario';

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

                    window.location.href = 'users.html';

                } else if (result.isDenied) {

                    window.location.href = 'users.html';

                }
            });
        }
    }


}


function assignRole() {


    document.getElementById('saveUser').style.display = 'block';
    document.getElementById('updateDivUser').style.display = 'none';

    var usuarioId = document.getElementById('idUsuarioAsignarRol').value;
    var rolId = document.getElementById('rolAsignar').value;


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "UsuarioID": '' + usuarioId + '',
        "RolID": rolId
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/AsingarRol';

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

                $('#asignarRolModal').modal('toggle');
                getDepartments();
                getUsers();

            } else if (result.isDenied) {

                $('#asignarRolModal').modal('toggle');
                getDepartments();
                getUsers();
            }
        });
    }
}


function editUser(id, codigoEmpleado, usuario, nombre, apellido, departamento, rol, contraseña) {

    document.getElementById('saveUser').style.display = 'none';
    document.getElementById('updateDivUser').style.display = 'block';

    document.getElementById('idEmpleado').value = id;
    document.getElementById('codigoEmpleado').value = codigoEmpleado;
    document.getElementById('usuario').value = usuario;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('deptoActual').value = 'ACTUAL:  ' + departamento.toUpperCase();
    document.getElementById('status').value = 1;
    document.getElementById('password').value = "contraseñafalsafalsa";

    document.getElementById('usuario').readOnly = true;
    document.getElementById('password').readOnly = true;
    document.getElementById('deptoActual').style.display = 'block';

}

function updateUser() {

    var codigoEmpleado = document.getElementById('codigoEmpleado').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var deptoActual = document.getElementById('departamentos').value;
    var status = document.getElementById('status').value;


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "CodigoEmpleado": codigoEmpleado,
        "Nombre": '' + nombre + '',
        "Apellido": '' + apellido + '',
        "DepartamentoID": deptoActual,
        "EstadoID": status
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/EditarUsuario';

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

                document.getElementById('saveUser').style.display = 'block';
                document.getElementById('updateDivUser').style.display = 'none';
                clearInputs();
                getUsers();

            } else if (result.isDenied) {

                document.getElementById('saveUser').style.display = 'block';
                document.getElementById('updateDivUser').style.display = 'none';
                clearInputs();
                getUsers();
            }
        });
    }

}


function deleteUser(id) {

    Swal.fire({
        icon: 'warning',
        title: '¿Está seguro?',
        text: 'Si presiona desactivar, el usuario no podrá utilizar el sistema hasta que se active nuevamente',
        showDenyButton: true,
        confirmButtonText: 'Continuar',
        denyButtonText: `Cancelar`,
    }).then((result) => {

        if (result.isConfirmed) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "CodigoEmpleado": '' + id + ''
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };


            var url = 'https://helpdeskwebservices.tk/EliminarUsuario';

            fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => exitoso(result))
                .catch(error => Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al eliminar, código de error: ' + error,
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
                        getDepartments();
                        getUsers();
                    } else if (result.isDenied) {
                        getDepartments();
                        getUsers();
                    }
                });
            }

        } else if (result.isDenied) {
            getDepartments();
            getUsers();
        }
    });
}


document.addEventListener("keyup", e => {

    if (e.target.matches("#buscador")) {

        if (e.key === "Escape") e.target.value = ""

        document.querySelectorAll(".usuario").forEach(usuarioSelector => {

            usuarioSelector.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? usuarioSelector.classList.remove("filtro")
                : usuarioSelector.classList.add("filtro")
        })
    }
});


function clearInputs() {
    document.getElementById('codigoEmpleado').value = '';
    document.getElementById('usuario').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('departamentos').value = 1;
    document.getElementById('status').value = 1;
    document.getElementById('password').value = '';
    document.getElementById('buscador').value = '';
    document.getElementById('usuario').readOnly = false;
    document.getElementById('password').readOnly = false;
    document.getElementById('deptoActual').style.display = 'none';
}

getDepartments();
getUsers();