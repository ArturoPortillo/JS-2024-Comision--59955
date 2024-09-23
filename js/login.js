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

/*****************************************************************************************************************************************/

/* Base de datos de usuarios registrados */

let usuariosExternos;
const usuariosRegistrados = [
	{ usuario: "admin", contrasena: "admin", idEmpleado: 0, rol: "admin" },
];

/* Descargar el admin si lo borramos */

async function fetchData() {
	fetch('https://66ebf35e2b6cf2b89c5c91f8.mockapi.io/UsuariosAPI')
  .then((response) => response.json())
  .then((data) => {
    usuariosExternos = data	

	const containsAdmin = usuariosRegistrados.some(user => user.usuario === "admin");

	if (usuariosRegistrados.length === 0 || !containsAdmin) {
		usuariosRegistrados.push(usuariosExternos[0]);
		console.log("El admin siempre presente.");
		arbolEmpleados(); 
	  }
	}).catch ((error) => {
		console.error('No se pudo conectar a la base de datos.', error);
	});
}

function guardarUsuarios() {
	const userJson = JSON.stringify(usuariosRegistrados)
	localStorage.setItem("usuario", userJson);
}


/* Traer Usuarios registrados */
function cargarUsuarios() {

	if (localStorage.hasOwnProperty('usuario')) {
	let user = localStorage.getItem("usuario");
	user = JSON.parse(user);
	usuariosRegistrados.splice(0, usuariosRegistrados.length, ...user);
	console.log(usuariosRegistrados);
	
}
}
cargarUsuarios() 

/*****************************************************************************************************************************************/

function popUp() {
	
	let popUp = document.querySelector('.popUpfunc')
	popUp.innerHTML = `
	<div class="popUpform animate__animated animate__zoomIn" draggable="true" ondragstart="drag(event)" id="mydiv">
        <div style="display: flex; flex-direction: row;">
				<div class="title-bar" id="mydivheader">            
					<div class="title-bar-text innerHeader" style="margin:0 12rem 0 0;padding:0;"> <img src="img/favicon2.png" alt="" class="innerFavicon">MiBar - Sistema de gestión Gastronomica</div>
				<div class="title-bar-controls">
					<button type="button" aria-label="Close" class="cancelarRegistro" style="height:16px;width:14px;margin-top:3px;"></button>
				</div> 
		</div>  
    </div>
	<fieldset class="popUpset" >
        <div class="popUp">
        <img src="img/LOGO MIBAR.png" alt="" class="logoMibarpop">
        <div class="popForm">
            <div class="field-row-stacked">
				<label>Nuevo usuario:</label>
				<input type="text" placeholder="Nuevo usuario" class="newUserfield"  ondragstart="return false;" ondrop="return false;" onfocus="this.value=''"/>
            </div>
            <div class="field-row-stacked">
				<label>Ingrese contraseña:</label>
				<input type="password" placeholder="Ingrese contraseña" class="newPass"  ondragstart="return false;" ondrop="return false;" onfocus="this.value=''"/>
            </div>
            <div class="signupMsg">
			
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
	
	toggleVis("popUpform")
	let btnCerrar = document.querySelectorAll('.cancelarRegistro');
    btnCerrar.forEach(btn => {
        btn.addEventListener("click", function() {
            toggleVis('popUpform');
        });
    });
}

/* Funcion registrar usuario */


function registroUsuario() {

	/* Obtenemos los datos de usuario */
	let inputNuevousuario = document.querySelector(".newUserfield");
	console.log(inputNuevousuario.value)
	let nuevoUsuario = inputNuevousuario.value.toLowerCase().replace(/\s+/g, "");
	console.log(typeof nuevoUsuario)	

	let inputNuevapass = document.querySelector(".newPass");	
	let contrasenaUsuario = parseInt(inputNuevapass.value.toLowerCase().replace(/\s+/g, ""));
	console.log(typeof contrasenaUsuario.value);
	console.log(typeof contrasenaUsuario);

	/* Validamos que el usuario no tenga numeros. */
	let contieneNumeros = /\d/.test(nuevoUsuario);

	/* Validamos que el campo no este vacio */
	if (nuevoUsuario === "" || contrasenaUsuario === "")  {
		let errorSignup = document.querySelector('.signupMsg')
		console.log(errorSignup)
		let registroError = `<div class="signUpicon"><img src="img/exclIcon.png" alt="!!" class="iconErrorlog"><p>Campo vacio.</p></div>`
		errorSignup.innerHTML = registroError;
		return
	}

	/* Validamos que el nombre de usuario no este registrado */
	const validarNombre = usuariosRegistrados.find((usuario) => usuario.usuario === nuevoUsuario);

	if (validarNombre)  {
		let errorSignup = document.querySelector('.signupMsg')
		console.log(errorSignup)
		let registroError = `<div class="signUpicon"><img src="img/exclIcon.png" alt="!!" class="iconErrorlog"><p>Usuario ya registrado!</p></div>`
		errorSignup.innerHTML = registroError;
		return
	}

	/* Si esta todo OK, continuamos. */	
	if (!contieneNumeros && !isNaN(contrasenaUsuario)) {
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
		let errorSignup = document.querySelector('.signupMsg')
		let registroError = `<div class="signUpicon"><img src="img/check-0.png" alt="!!" class="iconErrorlog"><p>Usuario registrado con exito</p></div>`
		errorSignup.innerHTML = registroError;

		guardarUsuarios()		

		intervalo("popUpform").then(()=>{
			Swal.fire({
		
				customClass: {
					container: '...',
					popup: 'swal2pop',
					header: '...',
					title: '...',
					closeButton: '...',
					icon: '...',
					image: '...',
					htmlContainer: '...',
					input: '...',
					inputLabel: '...',
					validationMessage: '...',
					actions: '...',
					confirmButton: 'swalconfirm',
					denyButton: '...',
					cancelButton: '...',
					loader: '...',
					footer: '....',
					timerProgressBar: '....',
				},
				
				
				title: "Usuario registrado con exito!",
				imageUrl: "img/check-0.png",
				imageWidth: 60,	
				imageHeight: 40,
				imageAlt: "Custom image",
				position: "bottom-end",
				toast: true,
				timer: 3000,
				showClass: {
					popup: `
					animate__animated
					animate__zoomIn
					animate__faster
					`
				}
			});
		})

		return;
	} else if (contieneNumeros) {
		let errorSignup = document.querySelector('.signupMsg')
		console.log(errorSignup)
		let registroError = `<div class="signUpicon"><img src="img/exclIcon.png" alt="!!" class="iconErrorlog"><p>Usuario no debe contener numeros.</p></div>`
		errorSignup.innerHTML = registroError;
		return;
	} else if (isNaN(inputNuevapass)) {
		let errorSignup = document.querySelector('.signupMsg')
		console.log(errorSignup)
		let registroError = `<div class="signUpicon"><img src="img/exclIcon.png" alt="!!" class="iconErrorlog"><p>PIN debe ser un valor numerico.</p></div>`
		errorSignup.innerHTML = registroError;
	} 


}

/*****************************************************************************************************************************************/

/* Funcion inicio de sesion */


function inicioSesion() {
	const btnInicio = document.querySelector(".userField");
	console.log(btnInicio);

	let usuarioActivo;

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
			let errorLogin = document.querySelector('.errorLogin')
			let mensajeError = `<div class="errorLogin"><img src="img/check-0.png" alt="" class="iconErrorlog"><p>Ingresaste correctamente.</p></div>`
			errorLogin.innerHTML = mensajeError;
			window.location.href = "platform.html";
			return;
		} if(validarExistencia) {
			let errorLogin = document.querySelector('.errorLogin')
			let mensajeError = `<div class="errorLogin"><img src="img/exclIcon.png" alt="" class="iconErrorlog"><p>Datos de usuario incorrecto.</p></div>`
			errorLogin.innerHTML = mensajeError;
			return;
		}  else if (inputUsuario == '' && inputPass == '') {
			let errorLogin = document.querySelector('.errorLogin')
			let mensajeError = `<div class="errorLogin"><img src="img/exclIcon.png" alt="" class="iconErrorlog"><p>Ingresa un usuario.</p></div>`
			errorLogin.innerHTML = mensajeError;
		} else {
			let errorLogin = document.querySelector('.errorLogin')
			let mensajeError = `<div class="errorLogin"><img src="img/exclIcon.png" alt="" class="iconErrorlog"><p>Usuario no encontrado</p></div>`
			errorLogin.innerHTML = mensajeError;
		}
	});
}

const btnInicio = document.querySelector(".iniciarSesion");
console.log(btnInicio);

btnInicio.addEventListener("click", inicioSesion);
console.log(btnInicio);

let header = document.querySelector('#mydiv')



console.log(header);
header.style.visibility = "hidden"