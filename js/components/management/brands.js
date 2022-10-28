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
    else if (dataTokenFromSuccessLogin == 'Administrador' || dataTokenFromSuccessLogin == 'Super Administrador') {
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


function getBrands() {

    document.getElementById('updateBrands').style.display = 'none';

    var url = 'https://helpdeskwebservices.tk/api/Marcas';
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
            var j = 0;
            body += `<tr class="marca">
            <td hidden>${data[i].MarcaID}</td>
            <td>${j = i + 1}</td>
            <td class="text-uppercase">${data[i].Descripcion}</td>
            <td>
                <a class="btn btn-warning text-dark fw-bold" onclick="editBrands(${data[i].MarcaID}, '${data[i].Descripcion}');"><i class="fa-solid fa-pen-to-square"></i></a>
                <a class="btn btn-danger text-white fw-bold" onclick="deleteBrands(${data[i].MarcaID});"><i class="fa-solid fa-trash"></i></a>
            </td>
            </tr>`
        }
        document.getElementById('tabla-de-datos-body').innerHTML = body;
    }

}


function createBrands() {

    document.getElementById('saveBrands').style.display = 'block';

    var nombreMarca = document.getElementById('nombreMarca').value;

    if (nombreMarca == "" || nombreMarca == null) {
        Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Debe ingresar el nombre de la marca a crear.'
        });
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "Descripcion": '' + nombreMarca + ''
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        var url = 'https://helpdeskwebservices.tk/CrearMarca';

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => exitoso(result))
            .catch(error => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al procesar la operación, código de error: ' + error,
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
                    document.getElementById('nombreMarca').value = '';
                    getBrands();
                } else if (result.isDenied) {
                    document.getElementById('nombreMarca').value = '';
                    getBrands();
                }
            });
        }
    }


}


function deleteBrands(id) {

    document.getElementById('saveBrands').style.display = 'block';

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
                "MarcaID": '' + id + ''
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };


            var url = 'https://helpdeskwebservices.tk/EliminarMarca';

            fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => exitoso(result))
                .catch(error => Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al eliminar el marca, código de error: ' + error,
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
                        getBrands();
                    } else if (result.isDenied) {
                        getBrands();
                    }
                });
            }

        } else if (result.isDenied) {
            getBrands();
        }
    });
}



function editBrands(id, descripcion) {

    document.getElementById('idMarca').value = id;
    document.getElementById('nombreMarca').value = descripcion;

    document.getElementById('updateBrands').style.display = 'block';
    document.getElementById('saveBrands').style.display = 'none';

}

function updateExistBrands() {

    var idMarca = document.getElementById('idMarca').value;
    var nuevoNombreMarca = document.getElementById('nombreMarca').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "marcaID": '' + idMarca + '',
        "Descripcion": '' + nuevoNombreMarca + ''
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/EditarMarca';

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

                document.getElementById('updateBrands').style.display = 'none';
                document.getElementById('saveBrands').style.display = 'block';
                document.getElementById('nombreMarca').value = '';
                getBrands();
                
            } else if (result.isDenied) {

                document.getElementById('updateBrands').style.display = 'none';
                document.getElementById('saveBrands').style.display = 'block';
                document.getElementById('nombreMarca').value = '';
                getBrands();
            }
        });
    }
}

document.addEventListener("keyup", e => {

    if (e.target.matches("#buscador")) {

        if (e.key === "Escape") e.target.value = ""

        document.querySelectorAll(".marca").forEach(marcaSelector => {

            marcaSelector.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? marcaSelector.classList.remove("filtro")
                : marcaSelector.classList.add("filtro")
        })

    }


});