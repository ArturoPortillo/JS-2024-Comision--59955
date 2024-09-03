/* Solamente un pequeño script para evitar que el mensaje "Para iniciar sesion por primera vez debes registrarte." aparezca sin importar si estamos en la pagina de inicio o dentro de la plataforma, con esto logro que aparezca solamente en index.html */

/* const paginaActual = window.location.href; */

/* if (paginaActual.includes("/index.html")) {
	alert(
		"Bienvenido a MiBar! Sistema de gestion gastronomica" +
			"\n\n" +
			"Para iniciar sesion por primera vez debes registrarte."
	);
	console.log(`Bienvenido a MiBar Sistema de gestion gastronomica! Crea un nuevo usuario o inicia sesion como administrador:
        
        usuario: admin
        clave: admin
        `);
} else {
	alert(
		"Bienvenido a MiBar! Sistema de gestion gastronomica" +
			"\n\n" +
			"El sistema se encuentra en mantenimiento, vuelve mas tarde."
	);
} */

/* Variable usuario y contraseña */


let usuario = "";
let contrasena = "";
let idEmpleado = 0;
let rol = "";

/* Funcion constructora de usuario estableciendo su rol */

function Empleado(usuario, contrasena, idEmpleado, rol) {
	this.usuario = usuario;
	this.contrasena = contrasena;
	this.idEmpleado = idEmpleado;
	this.rol = rol;
}

/* Base de datos de usuarios registrados */

const usuariosRegistrados = [
	{ usuario: "admin", contrasena: "admin", idEmpleado: 0, rol: "admin" },
];

/* Funcion popUp */

function toggleVis() {

	let popUp = document.querySelector('.popUpfunc')

    if (popUp.classList.contains('vis')) {
        popUp.classList.remove('vis');
        popUp.classList.add('invis');
    } else {
        popUp.classList.remove('invis');
        popUp.classList.add('vis');
    } 
	};


function popUp() {
	

	let popUp = document.querySelector('.popUpfunc')
	/* Se generaba un bug que nos hacia "draggear" un div dentro de nuestro Input por error al tratar de sombrear el texto, lo solucione con el atributo: ondragstart="return false;" ondrop="return false;"
	Sin embargo, no se puede sombrear con el Mouse dentro del Input, solo se puede sombrear con el atajo Shift + flecha Izquierda
	Fuente: https://stackoverflow.com/questions/704564/disable-drag-and-drop-on-html-elements */
	popUp.innerHTML = `
		<div class="popUpform animate__animated animate__zoomIn" draggable="true" ondragstart="drag(event)" id="mydiv">
			<div style="display: flex; flex-direction: row;">
			<div class="title-bar" id="mydivheader">            
				<div class="title-bar-text innerHeader" style="margin:0 12rem 0 0;padding:0;"> <img src="favicon2.png" alt="" class="innerFavicon">MiBar - Sistema de gestión Gastronomica</div>
							<div class="title-bar-controls">
				<button type="button" aria-label="Close" class="cancelarRegistro" style="height:16px;width;14px;margin-top:3px;" ></button>
			</div> 
			</div>

			</div>
		<fieldset class="popUpset" >
			<div class="popUp">
				<img src="LOGO MIBAR.png" alt="" class="logoMibarpop">
				<div class="popForm">
					<div class="field-row-stacked">
					<label>Nuevo usuario:</label>
					<input type="text" placeholder="Nuevo usuario" class="newUserfield"  ondragstart="return false;" ondrop="return false;"/>
					</div>
					<div class="field-row-stacked">
					<label>Ingrese contraseña:</label>
					<input type="password" placeholder="Ingrese contraseña" class="newPass"  ondragstart="return false;" ondrop="return false;"/>
					</div>
					<div class="signupSucess">
					TEST
					</div>
					<div>
					<button type="button" onclick="registroUsuario()">Registrarse</button>
					<button type="button" class="cancelarRegistro">Cancelar</button>
					</div>                 
			</div>
		</fieldset>
		</div>
		`
	/* Fuente de funcion: https://www.w3schools.com/HOWTO/howto_js_draggable.asp */
	dragElement(document.getElementById("mydiv"));

	let btnCerrar = document.querySelectorAll('.cancelarRegistro')
	btnCerrar.forEach(btn => {
		btn.addEventListener("click", toggleVis);
	});
	console.log(btnCerrar)

	toggleVis()
}



/* Funcion registrar usuario */

function registroUsuario() {
	/*  COMENTARIO SOBRE VALIDACIONES:  
    
    ########## NOTAS PARA EL FUTURO LECTOR #################

    Agregamos validaciones a nuestra funcion de registro:

        - Usamos .toLowerCase() para transformar el texto a minusculas y evitar errores al identificar el usuario
        - Usamos la Expresion Regular (/\s+/g, '') con el metodo .replace

        Para que quede registrado, una expresion regular se forma dentro de "/ /" y luego tenemos distintos patrones que podemos aplicar dentro de la expresion regular, uno es /s o "/s+" donde /s busca un espacio en blanco(uno por uno) dentro de nuestra linea de texto y /s+ busca todos los espacios en blanco consecutivos.

            Ejemplo: 

                var str = '  A B  C   D EF ';
                console.log(str.replace(/\s/g, '#'));  // ##A#B##C###D#EF# /// UNO POR UNO.
                console.log(str.replace(/\s+/g, '#')); // #A#B#C#D#EF# /// ESPACIOS CONSECUTIVOS, MAS 'RAPIDO'.

        Luego de nuestra expresion /\s+/ continuamos con un "modificador" Glogal "g" que busca todos los resultados que concuerden con lo que buscamos, haciendo que en este caso /s+ no se detenga en el primer resultado.

        Dejando nuestra RegEx asi (/\s+/g) luego usando el metodo de string .replace declaramos que reemplazamos todos los espacios en blanco por un espacio vacio: (/\s+/g, '') como en el ejemplo anterior los reemplazabamos por un # ahora lo reemplazamos por un espacio vacio << '' >>, recortando nuestro texto totalmente, evitando que el usuario agregue espacios en blanco al campo de usuario o contraseña.
    */


	let inputNuevousuario = document.querySelector(".newUserfield");
	console.log(inputNuevousuario.value)
	let nuevoUsuario = inputNuevousuario.value.toLowerCase().replace(/\s+/g, "");

	let inputNuevapass = document.querySelector(".newPass");
	console.log(inputNuevapass.value);
	
	let contrasenaUsuario = inputNuevapass.value.toLowerCase().replace(/\s+/g, "");

	if (isNaN(nuevoUsuario) && !isNaN(contrasenaUsuario)) {
		console.log(
			"Usuario no contiene valores numericos." +
				"\n\n" +
				"La contraseña es un valor numerico, no contiene letras."
		);

		usuario = nuevoUsuario;
		contrasena = contrasenaUsuario;
		idEmpleado = +idEmpleado + 1;
		rol = "";

		console.log("Usuario: " + usuario + "\n" + "Contraseña: " + contrasena);
		console.log("Usuario registrado exitosamente");

		const nuevoEmpleado = new Empleado(usuario, contrasena, idEmpleado, rol);
		usuariosRegistrados.push(nuevoEmpleado);
		console.log(nuevoEmpleado);
		console.table(usuariosRegistrados);
	} else if (!isNaN(inputNuevousuario)) {
		alert(
			"Error al registrar usuario, usuario no debe contener valores numericos"
		);
		console.log(
			"Error al registrar usuario, usuario no debe contener valores numericos"
		);
	} else if (isNaN(inputNuevapass)) {
		alert("Error al registrar usuario, PIN debe ser un valor numerico.");
		console.log("Error al registrar usuario, PIN debe ser un valor numerico.");
	}
}


/* Funcion inicio de sesion */


function inicioSesion() {
	const btnInicio = document.querySelector(".userField");
	console.log(btnInicio);

/* 	let validarDatos = false; */
	let usuarioActivo;

	console.log("Usuarios registrados: ");
	usuariosRegistrados.map((usuariosRegistrado) =>
		console.log(usuariosRegistrado)
	);

	const campoUsuario = document.querySelector(".userField");
	let inputUsuario = campoUsuario.value.toLowerCase().replace(/\s+/g, "");
	console.log(inputUsuario);

	const campoContrasena = document.querySelector(".inputPass");
	let inputPass = campoContrasena.value.toLowerCase().replace(/\s+/g, "");

	let validarExistencia = usuariosRegistrados.find((el) => el.usuario == inputUsuario)
	console.log(validarExistencia)

	usuariosRegistrados.forEach((usuario) => {
		if (usuario.usuario == inputUsuario && usuario.contrasena == inputPass) {
			usuarioActivo = inputUsuario;
			localStorage.setItem("usuarioActivo", inputUsuario);
			console.log("el usuario activo es: " + usuarioActivo);
			window.location.href = "platform.html";
/* 			validarDatos = true; */
			return;
		} if(validarExistencia) {
			let errorLogin = document.querySelector('.errorLogin')
			let mensajeError = `<div class="errorLogin"><img src="exclIcon.png" alt="!!" class="iconErrorlog"><p>Datos de usuario incorrecto.</p></div>`
			errorLogin.innerHTML = mensajeError;
			return;
		}  else if (inputUsuario == '' && inputPass == '') {
			let errorLogin = document.querySelector('.errorLogin')
			let mensajeError = `<div class="errorLogin"><img src="exclIcon.png" alt="!!" class="iconErrorlog"><p>Ingresa un usuario.</p></div>`
			errorLogin.innerHTML = mensajeError;
		} else {
			let errorLogin = document.querySelector('.errorLogin')
			let mensajeError = `<div class="errorLogin"><img src="exclIcon.png" alt="!!" class="iconErrorlog"><p>Usuario no encontrado</p></div>`
			errorLogin.innerHTML = mensajeError;
		}
	});
}


const btnInicio = document.querySelector(".iniciarSesion");
console.log(btnInicio);

btnInicio.addEventListener("click", inicioSesion);
console.log(btnInicio);


