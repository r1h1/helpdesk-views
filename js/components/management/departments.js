function permissionAuthLogin() {

    var dataTokenFromSuccessLogin = sessionStorage.tokenAuth;

    if (dataTokenFromSuccessLogin == '' || dataTokenFromSuccessLogin == null) {
        sessionStorage.removeItem('tokenAuth');
        window.location.href = '../../index.html';
    }
    else if(dataTokenFromSuccessLogin != 'Administrador') {
        sessionStorage.removeItem('tokenAuth');
        window.location.href = '../../index.html';
    }
    else if(dataTokenFromSuccessLogin == 'Administrador'){
        console.log('sesionAprobada');
    }
    else{
        sessionStorage.removeItem('tokenAuth');
        window.location.href = '../../index.html';
    }
}

function closeSession(){

    sessionStorage.removeItem('tokenAuth');
    window.location.href = '../../index.html';
}


function getDepartments() {

    document.getElementById('updateDepartment').style.display = 'none';

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
        let body = ''
        for (var i = 0; i < data.length; i++) {
            var j = 0;
            body += `<tr class="departamento">
            <td hidden>${data[i].DepartamentoID}</td>
            <td>${j = i + 1}</td>
            <td class="text-uppercase">${data[i].Descripcion}</td>
            <td><a class="btn btn-warning text-dark fw-bold" onclick="editDepartment(${data[i].DepartamentoID}, '${data[i].Descripcion}');"><i class="fa-solid fa-pen-to-square"></i> Editar</a></td>
            <td><a class="btn btn-danger text-white fw-bold" onclick="deleteDepartment(${data[i].DepartamentoID});"><i class="fa-solid fa-trash"></i> Eliminar</a></td>
            </tr>`
        }
        document.getElementById('tabla-de-datos-body').innerHTML = body
    }

}


function createDepartments() {

    document.getElementById('saveDepartment').style.display = 'block';

    var nombreDepartamento = document.getElementById('nombreDepartamento').value;

    if (nombreDepartamento == "" || nombreDepartamento == null) {
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Debe ingresar el nombre del departamento a crear.'
        });
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Descripcion": '' + nombreDepartamento + ''
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        var url = 'https://helpdeskwebservices.tk/CrearDepartamento';

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
                text: 'La operación se completó.',
                confirmButtonText: 'Entendido',
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('nombreDepartamento').value = '';
                    getDepartments();
                } else if (result.isDenied) {
                    document.getElementById('nombreDepartamento').value = '';
                    getDepartments();
                }
            });
        }
    }


}


function deleteDepartment(id) {

    document.getElementById('saveDepartment').style.display = 'block';

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
                "DepartamentoID": '' + id + ''
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };


            var url = 'https://helpdeskwebservices.tk/EliminarDepartamento';

            fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => exitoso(result))
                .catch(error => Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al eliminar el departamento, código de error: ' + error,
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
                    } else if (result.isDenied) {
                        getDepartments();
                    }
                });
            }

        } else if (result.isDenied) {
            getDepartments();
        }
    });
}



function editDepartment(id, descripcion) {

    var idDepartamento = document.getElementById('idDepartamento').value = id;
    var nombreDepartamento = document.getElementById('nombreDepartamento').value = descripcion;

    var updateButton = document.getElementById('updateDepartment').style.display = 'block';
    var saveDepartmentButton = document.getElementById('saveDepartment').style.display = 'none';

}

function updateExistDepartment() {

    var idDepartamento = document.getElementById('idDepartamento').value;
    var nuevoNombreDepartamento = document.getElementById('nombreDepartamento').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "DepartamentoID": '' + idDepartamento + '',
        "Descripcion": '' + nuevoNombreDepartamento + ''
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/EditarDepartamento';

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => exitoso(result))
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al eliminar el departamento, código de error: ' + error,
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

                var updateButton = document.getElementById('updateDepartment').style.display = 'none';
                var saveDepartmentButton = document.getElementById('saveDepartment').style.display = 'block';
                document.getElementById('nombreDepartamento').value = '';
                getDepartments();
            } else if (result.isDenied) {

                var updateButton = document.getElementById('updateDepartment').style.display = 'none';
                var saveDepartmentButton = document.getElementById('saveDepartment').style.display = 'block';
                document.getElementById('nombreDepartamento').value = '';
                getDepartments();
            }
        });
    }
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