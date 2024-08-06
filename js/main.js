
if (window.location.pathname === '/index.html'){
    alert("Bienvenido a MiBar! Sistema de gestion gastronomica"+ "\n\n" +"Para iniciar sesion por primera vez debes registrarte.")
} else {
    /* Nada pasa. */
}

/* Variable usuario y contraseña */
let usuario = "";
let contrasena = "";
let idEmpleado = 0;
let rol = '';

/* Funcion constructora de usuario estableciendo su rol */

function Empleado(usuario, contrasena, idEmpleado, rol) {
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.idEmpleado = idEmpleado;
    this.rol = rol;
}

/* Funcion de registro */

let empleado;

function signUp() {

    let nuevoUsuario = prompt("Ingresa nuevo nombre de usuario: ");
    let contrasenaUsuario = prompt("Ingresa un PIN: ");
    
    if(isNaN(nuevoUsuario) && !isNaN(contrasenaUsuario)) {
        console.log("Usuario no contiene valores numericos."+"\n\n"+"La contraseña es un valor numerico, no contiene letras."); 
        usuario = nuevoUsuario;
        contrasena = contrasenaUsuario;
        idEmpleado = +idEmpleado + 1;
        rol = '';
        console.log("Usuario: " + usuario +  "\n" + "Contraseña: " + contrasena);
        console.log("Usuario registrado exitosamente");   
        empleado = new Empleado(usuario, contrasena, idEmpleado, rol)     
    } else if (!isNaN(nuevoUsuario)){
        alert("Error al registrar usuario, usuario no debe contener valores numericos");
        console.log("Error al registrar usuario, usuario no debe contener valores numericos");
    } else if (isNaN(contrasenaUsuario)){
        alert("Error al registrar usuario, PIN debe ser un valor numerico.");
        console.log("Error al registrar usuario, PIN debe ser un valor numerico.");
    }
    console.log(empleado)  
}

/* Funcion de inicio de sesion */

function logIn() {

    for (let i = 3; i > 0; i--){
        let campoUsuario = prompt("Ingresa nombre de usuario: ");
        let campoContrasena = prompt("Ingresa contraseña: ");

            console.log("El usuario deberia ser: " + empleado.usuario);    
            console.log("Usuario ingresado: " + campoUsuario);
            console.log("La contraseña deberia ser: " + empleado.contrasena);    
            console.log("Contraseña ingresada: " + campoContrasena);

    if (campoUsuario === empleado.usuario && campoContrasena === empleado.contrasena){
        alert("Ingresaste correctamente.")
        window.location.href = "html/platform.html"   
        console.log("Ingresaste correctamente") 
    } else if (i>1){
        alert("Usuario no encontrado."+"\n"+"Te quedan " + (i-1) + " intentos.")
        console.log("Usuario no encontrado");
    } else {
        alert("Usuario no encontrado."+"\n"+"Superaste el limite de intentos, intenta mas tarde.")
        }    
    }
}