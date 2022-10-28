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

    document.getElementById('marcaActual').style.display = 'none';
    document.getElementById('categoriaActual').style.display = 'none';
    document.getElementById('saveProduct').style.display = 'block';
    document.getElementById('updateDivProduct').style.display = 'none';
    document.getElementById('divEstado').style.display = 'none';
}

function closeSession() {

    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('tokenAuth');
    sessionStorage.removeItem('user');
    window.location.href = '../../index.html';
}


function createProducts() {

    document.getElementById('saveProduct').style.display = 'block';
    document.getElementById('updateDivProduct').style.display = 'none';
    document.getElementById('divEstado').style.display = 'none';


    var categorias = document.getElementById('categorias').value;
    var marcas = document.getElementById('marcas').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;


    if (categorias == '' || marcas == '' || descripcion == '' || precio == '') {
        //bootstrap validate
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "CategoriaId": categorias,
            "MarcaId": marcas,
            "Descripcion": "" + descripcion + "",
            "Precio": precio
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        var url = 'https://helpdeskwebservices.tk/CrearProducto';

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

                    window.location.href = 'products.html';

                } else if (result.isDenied) {

                    window.location.href = 'products.html';

                }
            });
        }
    }


}


function getProducts() {

    document.getElementById('updateDivProduct').style.display = 'none';

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

            const estadoProducto = data[i].Estado.toString();

            if (estadoProducto == 'ACTIVO') {
                var j = 0;
                body += `<tr class="producto">
                <td hidden>${data[i].ProductoID}</td>
                <td>${j = i + 1}</td>
                <td class="text-uppercase">${data[i].Categoria}</td>
                <td class="text-uppercase">${data[i].Marca}</td>
                <td class="text-uppercase">${data[i].Decripcion}</td>
                <td class="text-uppercase">Q ${data[i].Precio}</td>
                <td class="text-uppercase"><span class="bg-success p-2 text-white">${data[i].Estado}</span></td>
                <td>
                    <a class="btn btn-warning text-dark fw-bold" 
                    onclick="editProducts(${data[i].ProductoID},'${data[i].Categoria}','${data[i].Marca}','${data[i].Decripcion}',${data[i].Precio});">
                    <i class="fa-solid fa-pen-to-square"></i></a>
                    <a class="btn btn-danger text-white fw-bold" onclick="deleteProducts(${data[i].ProductoID});"><i class="fa-solid fa-trash"></i></a>
                </td>
                </tr>`
            }
            else {
                var j = 0;
                body += `<tr class="marca">
                <td hidden>${data[i].ProductoID}</td>
                <td>${j = i + 1}</td>
                <td class="text-uppercase">${data[i].Categoria}</td>
                <td class="text-uppercase">${data[i].Marca}</td>
                <td class="text-uppercase">${data[i].Decripcion}</td>
                <td class="text-uppercase">Q ${data[i].Precio}</td>
                <td class="text-uppercase"><span class="bg-danger p-2 text-white">${data[i].Estado}</span></td>
                <td>
                <a class="btn btn-warning text-dark fw-bold" 
                onclick="editProducts(${data[i].ProductoID},'${data[i].Categoria}','${data[i].Marca}','${data[i].Decripcion}',${data[i].Precio});">
                <i class="fa-solid fa-pen-to-square"></i></a>
                    <a class="btn btn-danger text-white fw-bold" onclick="deleteProducts(${data[i].ProductoID});"><i class="fa-solid fa-trash"></i></a>
                </td>
                </tr>`
            }
        }
        document.getElementById('tabla-de-datos-body').innerHTML = body;
    }

}


function editProducts(id, categorias, marcas, descripcion, precio) {

    document.getElementById('marcaActual').style.display = 'block';
    document.getElementById('categoriaActual').style.display = 'block';
    document.getElementById('saveProduct').style.display = 'none';
    document.getElementById('updateDivProduct').style.display = 'block';
    document.getElementById('divEstado').style.display = 'block';


    document.getElementById('idProducto').value = id;
    document.getElementById('categoriaActual').value = 'ACTUAL: ' + categorias.toUpperCase();
    document.getElementById('marcaActual').value = 'ACTUAL: ' + marcas.toUpperCase();
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('precio').value = precio;
    document.getElementById('estado').value = 1;

}


function updateProducts() {

    var productoid = document.getElementById('idProducto').value;
    var categorias = document.getElementById('categorias').value;
    var marcas = document.getElementById('marcas').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;
    var estado = document.getElementById('estado').value;


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "ProductoId": productoid,
        "CategoriaId": categorias,
        "MarcaId": marcas,
        "Descripcion": ''+ descripcion +'',
        "Precio": precio,
        "Estado": estado
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    var url = 'https://helpdeskwebservices.tk/EditarProducto';

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

                window.location.href = 'products.html';

            } else if (result.isDenied) {

                window.location.href = 'products.html';
            }
        });
    }

}


function deleteProducts(id) {

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
                "ProductoId": '' + id + ''
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };


            var url = 'https://helpdeskwebservices.tk/EliminarProducto';

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
                        getProducts();
                        getBrands();
                        getCategories();
                    } else if (result.isDenied) {
                        getProducts();
                        getBrands();
                        getCategories();
                    }
                });
            }

        } else if (result.isDenied) {
            getDepartments();
            getUsers();
        }
    });
}


function getCategories() {

    var url = 'https://helpdeskwebservices.tk/api/Categorias';
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
            body += `<option value="${data[i].CategoriaID}">${data[i].Descripcion}</option>`;
        }
        document.getElementById('categorias').innerHTML = body;
    }
}


function getBrands() {

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
            body += `<option value="${data[i].MarcaID}">${data[i].Descripcion}</option>`;
        }
        document.getElementById('marcas').innerHTML = body;
    }
}


document.addEventListener("keyup", e => {

    if (e.target.matches("#buscador")) {

        if (e.key === "Escape") e.target.value = ""

        document.querySelectorAll(".producto").forEach(usuarioSelector => {

            usuarioSelector.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? usuarioSelector.classList.remove("filtro")
                : usuarioSelector.classList.add("filtro")
        })
    }
});

getBrands();
getCategories();