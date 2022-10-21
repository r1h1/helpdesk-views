function permissionAuthLogin() {

    var dataTokenFromSuccessLogin = sessionStorage.tokenAuth;

    if (dataTokenFromSuccessLogin == '' || dataTokenFromSuccessLogin == null) {
        sessionStorage.removeItem('tokenAuth');
        window.location.href = '../../index.html';
    }
    else if(dataTokenFromSuccessLogin == 'Administrador' || dataTokenFromSuccessLogin == 'User'){
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