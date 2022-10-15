function getDepartments() {

    fetch('http://helpdeskwebservices.tk/api/Departamentos/')
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al obtener los datos, código de error: ' + error,
            confirmButtonText: 'Entendido',
        }));

    const mostrarData = (data) => {
        console.log(data);
        let body = ''
        for (var i = 0; i < data.length; i++) {
            body += `<tr><td>${data[i].DepartamentoID}</td><td>${data[i].Descripcion}</td><td></td></tr>`
        }
        document.getElementById('tabla-de-datos-body').innerHTML = body
    }

}


function createDepartments() {

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

        fetch("http://helpdeskwebservices.tk/CrearDepartamento", requestOptions)
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
                    window.location.href = 'departments.html';
                } else if (result.isDenied) {
                    window.location.href = 'departments.html';
                }
            });
        }
    }


}



getDepartments();