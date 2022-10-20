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
        let body = ''
        for (var i = 0; i < data.length; i++) {
            body += `<tr><td>${data[i].UsuarioID}</td><td>${data[i].CodigoEmpleado}</td>
            <td>${data[i].Nombre}</td><td>${data[i].Apellido}</td><td>${data[i].Departamento}</td><td>${data[i].Estado}</td><td></td></tr>`
        }
        document.getElementById('tabla-de-datos-body').innerHTML = body
    }

}

getUsers();