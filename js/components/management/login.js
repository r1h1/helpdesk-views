function validateData() {

    var usuario = document.getElementById('usuario').value;
    var clave = document.getElementById('clave').value;

    if (usuario == '' || clave == '' || usuario == '' && clave == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingresa tu usuario y contraseña para acceder'
        });
    }

    else {

        var url = 'https://helpdeskwebservices.tk/LoginUsuario';

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "UserName": '' + usuario + '',
            "UserPass": '' + clave + ''
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
                text: 'Hubo un error al intentar ingresar, código de error: ' + error,
                confirmButtonText: 'Entendido',
            }));

        const exitoso = (result) => {

            const code = result[0].Code;
            const usuario = result[0].Usuario;
            const rol = result[0].Rol;
            const message = result[0].Message;


            if (code == 0) {

                console.log('Usuario existe con rol: ' + rol, ' El mensaje del API fue: ' + message);

                if (rol == null || rol == 'N/A') {
                    sessionStorage.removeItem('tokenAuth');
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No cuentas con permisos suficientes para acceder'
                    });
                }

                else if (rol == 'Administrador') {
                    const data = rol;
                    sessionStorage.tokenAuth = data;
                    window.location.href = 'support/management/dashboard.html';
                }
                else if (rol == 'User') {
                    const data = rol;
                    sessionStorage.tokenAuth = data;
                    window.location.href = 'support/user/home.html';
                }

                else {
                    sessionStorage.removeItem('tokenAuth');
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No cuentas con permisos suficientes para acceder'
                    });
                }
            }

            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario y/o Contraseña Incorrecto, verifique'
                });
            }

        }
    }
}