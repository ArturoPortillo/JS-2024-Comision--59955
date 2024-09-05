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

const usuariosRegistrados = [
	{ usuario: "admin", contrasena: "admin", idEmpleado: 0, rol: "admin" },
];

/* Traer Usuarios registrados */
function cargarUsuarios() {

	let user = localStorage.getItem("usuario");
	user = JSON.parse(user);
	usuariosRegistrados.splice(0, usuariosRegistrados.length, ...user);
}
cargarUsuarios() 

/*****************************************************************************************************************************************/

function popUp() {
	
	let popUp = document.querySelector('.popUpfunc')
	/* Se generaba un bug que nos hacia "draggear" un div dentro de nuestro Input por error al tratar de sombrear el texto, lo solucione con el atributo: ondragstart="return false;" ondrop="return false;"
	Sin embargo, no se puede sombrear con el Mouse dentro del Input, solo se puede sombrear con el atajo Shift + flecha Izquierda
	Fuente: https://stackoverflow.com/questions/704564/disable-drag-and-drop-on-html-elements */

	/* Para evitar bugs en el campo de inputs limpiamos el input al darle click con  onfocus="this.value=''" para vaciarlo al darle click
	Fuente: https://www.w3schools.com/howto/howto_html_clear_input.asp
	*/
	popUp.innerHTML = `
	<div class="popUpform animate__animated animate__zoomIn" draggable="true" ondragstart="drag(event)" id="mydiv">
        <div style="display: flex; flex-direction: row;">
				<div class="title-bar" id="mydivheader">            
					<div class="title-bar-text innerHeader" style="margin:0 12rem 0 0;padding:0;"> <img src="favicon2.png" alt="" class="innerFavicon">MiBar - Sistema de gestión Gastronomica</div>
				<div class="title-bar-controls">
					<button type="button" aria-label="Close" class="cancelarRegistro" style="height:16px;width:14px;margin-top:3px;"></button>
				</div> 
		</div>  
    </div>
	<fieldset class="popUpset" >
        <div class="popUp">
        <img src="LOGO MIBAR.png" alt="" class="logoMibarpop">
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
		let registroError = `<div class="signUpicon"><img src="exclIcon.png" alt="!!" class="iconErrorlog"><p>Campo vacio.</p></div>`
		errorSignup.innerHTML = registroError;
		return
	}

	/* Validamos que el nombre de usuario no este registrado */
	const validarNombre = usuariosRegistrados.find((usuario) => usuario.usuario === nuevoUsuario);

	if (validarNombre)  {
		let errorSignup = document.querySelector('.signupMsg')
		console.log(errorSignup)
		let registroError = `<div class="signUpicon"><img src="exclIcon.png" alt="!!" class="iconErrorlog"><p>Usuario ya registrado!</p></div>`
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
		let registroError = `<div class="signUpicon"><img src="check-0.png" alt="!!" class="iconErrorlog"><p>Usuario registrado con exito</p></div>`
		errorSignup.innerHTML = registroError;

			/* Registramos y guardamos no solo el usuario nuevo sino la base completa ya que la vamos a necesitar dentro de nuestra plataforma. */
			/* El usuario que inicia sesion lo registramos dentro de la funcion inicioSesion */
/* 			let recortarArr = usuariosRegistrados.slice(-usuariosRegistrados) */
			const userJson = JSON.stringify(usuariosRegistrados)
			localStorage.setItem("usuario", userJson);

		intervalo("popUpform")

		return;
	} else if (contieneNumeros) {
		let errorSignup = document.querySelector('.signupMsg')
		console.log(errorSignup)
		let registroError = `<div class="signUpicon"><img src="exclIcon.png" alt="!!" class="iconErrorlog"><p>Usuario no debe contener numeros.</p></div>`
		errorSignup.innerHTML = registroError;
		return;
	} else if (isNaN(inputNuevapass)) {
		let errorSignup = document.querySelector('.signupMsg')
		console.log(errorSignup)
		let registroError = `<div class="signUpicon"><img src="exclIcon.png" alt="!!" class="iconErrorlog"><p>PIN debe ser un valor numerico.</p></div>`
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
			let mensajeError = `<div class="errorLogin"><img src="/check-0.png" alt="!!" class="iconErrorlog"><p>Ingresaste correctamente.</p></div>`
			errorLogin.innerHTML = mensajeError;
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


