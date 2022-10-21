function permissionAuthLogin() {

    var dataTokenFromSuccessLogin = sessionStorage.tokenAuth;

    if (dataTokenFromSuccessLogin == '' || dataTokenFromSuccessLogin == null) {
        sessionStorage.removeItem('tokenAuth');
        window.location.href = '../../index.html';
    }
    else if (dataTokenFromSuccessLogin != 'Administrador') {
        sessionStorage.removeItem('tokenAuth');
        window.location.href = '../../index.html';
    }
    else if (dataTokenFromSuccessLogin == 'Administrador') {
        console.log('sesionAprobada');
    }
    else {
        sessionStorage.removeItem('tokenAuth');
        window.location.href = '../../index.html';
    }

    document.getElementById('deptoActual').style.display = 'none';
    document.getElementById('rolActual').style.display = 'none';
    document.getElementById('saveUser').style.display = 'block';
    document.getElementById('updateDivUser').style.display = 'none';
}

function closeSession() {

    sessionStorage.removeItem('tokenAuth');
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
                    <i class="fa-solid fa-pen-to-square"></i> Editar</a>
                </td>
                <td><button class="btn btn-danger text-white fw-bold" onclick="deleteUser(${data[i].CodigoEmpleado});" disabled><i class="fa-solid fa-trash"></i> Deshabilitar</button></td>
                </tr>`
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
                    <i class="fa-solid fa-pen-to-square"></i> Editar</a>
                </td>
                <td><button class="btn btn-danger text-white fw-bold" onclick="deleteUser(${data[i].CodigoEmpleado});"><i class="fa-solid fa-trash"></i> Deshabilitar</button></td>
                </tr>`
            }
            else {
                body += `<tr class="usuario">
                    <td>-- No existen datos para mostrar --</td>
                </tr>`
            }
        }
        document.getElementById('tabla-de-datos-body').innerHTML = body
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
    var rol = document.getElementById('rol').value;
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


function editUser(id, codigoEmpleado, usuario, nombre, apellido, departamento, rol, contraseña) {

    document.getElementById('saveUser').style.display = 'none';
    document.getElementById('updateDivUser').style.display = 'block';

    document.getElementById('idEmpleado').value = id;
    document.getElementById('codigoEmpleado').value = codigoEmpleado;
    document.getElementById('usuario').value = usuario;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('deptoActual').value = 'ACTUAL:  ' + departamento.toUpperCase();
    document.getElementById('rolActual').value = 'ACTUAL:  ' + rol.toUpperCase();
    document.getElementById('status').value = 1;
    document.getElementById('password').value = "";

    document.getElementById('deptoActual').style.display = 'block';
    document.getElementById('rolActual').style.display = 'block';

}

function updateUser() {
}


function deleteUser(id) {

    Swal.fire({
        icon: 'warning',
        title: '¿Está seguro que desea borrar?',
        text: 'Si presiona eliminar, tome en cuenta que no se podrá recuperar',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
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

getDepartments();
getUsers();