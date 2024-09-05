/* Traer Usuarios registrados desde index.html */

let user = localStorage.getItem("usuario");
user = JSON.parse(user);
console.log(user.nombre);

/* Funcion para recordar usuario en sesion */

function usuarioIniciado() {
	const nombreUsuario = localStorage.getItem("usuarioActivo");
	console.log(nombreUsuario);
	document.querySelector(
		".usuarioActivo"
	).textContent = `Usuario: ${nombreUsuario}`;
	return nombreUsuario;
}

/* Funcion constructora del menu*/

function Producto(id, articulo, precio) {
	this.id = id;
	this.articulo = articulo;
	this.precio = precio;
}

const datosMenu = [
	{ articulo: "Café con leche", precio: 3100, id: 1 },
	{ articulo: "Tostado de miga", precio: 5200, id: 2 },
	{ articulo: "Licuado", precio: 3600, id: 3 },
];

let articulo;
let precio = 0;
let id = datosMenu.length;

/* Funcion para ver el menu disponible */

let artMenu = document.querySelector(".panelMenu");

let btnMenu = document.querySelector(".addMenu");
console.log(btnMenu);

let contenidoLog;

function menuDisponible() {
	console.log(`Articulos disponibles: `);
	artMenu.innerHTML = "";
	datosMenu.forEach((menu) => {
		contenidoLog = `ID: ${menu.id}\nArticulo: ${menu.articulo}\nPrecio: $${menu.precio}`;
		let contenido = `<button class="btnaddArt">${menu.articulo}</button>`;
		console.log(contenidoLog);
		artMenu.innerHTML += contenido;
	});
	return datosMenu;
}
menuDisponible();

/* Funcion para cargar Articulos al array de menu */

function cargarMenu() {
	while (true) {
		let nuevoArticulo = prompt(
			"Ingresa un nuevo articulo: " + "\n\n" + "Ingresa '0' para salir."
		).trim();

		if (nuevoArticulo === "0") {
			console.log("No se han cargado más articulos.");
			break;
		}

		let nuevoPrecio = parseInt(
			prompt(
				"ingresa precio del articulo: " + "\n\n" + "Ingresa '0' para salir."
			)
		);

		if (nuevoArticulo === "0") {
			console.log("No se han cargado más articulos.");
			break;
		}

		if (!isNaN(nuevoArticulo) || isNaN(nuevoPrecio)) {
			console.log("Ingresa datos validos");
			break;
		} else {
			id += 1;
			const producto = {
				articulo: nuevoArticulo,
				precio: nuevoPrecio,
				id: id,
			};

			datosMenu.forEach((menu) => {
				contenidoLog = `ID: ${menu.id}\nArticulo: ${menu.articulo}\nPrecio: $${menu.precio}`;
				let contenido = `<button class="btnaddArt">${menu.articulo}</button>`;
				console.log(contenidoLog);
				artMenu.innerHTML += contenido;
			});

			datosMenu.push(producto);
			console.table(datosMenu);
			menuDisponible();
		}
	}
}

btnMenu.addEventListener("click", cargarMenu);

/* Array de mesas */

const arrMesas = [];

function crearMesa() {
	let nuevaMesa = [];

	let arrLength = arrMesas.length + 1;
	arrMesas.push(nuevaMesa);
	console.log("creaste una nueva mesa.");
	console.log("Numero de mesa creada: " + arrLength);
	console.log(arrMesas);

	/* console.log("Estamos buscando apuntar a: ") */
	let target = document.querySelector("#plano");
	/* console.log(target) */

	let templateMesa = `<div class="modeloMesa" id="${arrLength}" onclick="abrirMesa(this)" draggable="true" ondragstart="drag(event)">MESA ${arrLength}</div>`;

	let mesaExistente = target.querySelector(`.grilla${arrLength}`);

	/* condicional con Operarador ternario 

    mesaExistente = true
		? (mesaExistente.innerHTML += templateMesa)
		: alert("No se pueden crear más mesas, has llegado al limite del plano.");
    */

	if (mesaExistente) {
		/* Si no pongo += sobreescrimos la mesa y borramos contenidos sin querer, esto nos permite "solapar" mesas si movimos una mesa a una posicion adelantada y creamos mesas en divs anteriores a la ultima.*/
		mesaExistente.innerHTML += templateMesa;
	} else {
		console.log(
			`No se pueden crear más mesas, has llegado al limite del plano.`
		);
		alert("No se pueden crear más mesas, has llegado al limite del plano.");
	}
	return arrLength;
}

/* Funcion a borrar. */
function recorrerMesas() {
	console.log(`Las mesas disponibles son: `);
	arrMesas.forEach((arr) => {
		console.log(arr);
	});
	return arrMesas;
}

/* Funcion para abrir una mesa y agregar articulos a la mesa seleccionada */

function abrirMesa(mesa) {
	/*     panelMesa.style.display = "block"; */
	console.log(mesa);

	/*  let arrLength = arrMesas.length;    
    console.log("Ingresaste a mesa " + (arrLength - 1));

    let mesaSelec = parseInt(prompt("Indica el numero de mesa que deseas abrir: "));
 */
	let mesaSelec = parseInt(mesa.id);

	if (isNaN(mesaSelec) || mesaSelec < 1 || mesaSelec > arrMesas.length) {
		console.log(`Ingresa un numero valido de mesa`);
		return;
	}

	let eleccion = mesaSelec - 1;
	/*     console.log('El valor de eleccion es ' + eleccion + 1); */

	console.log("Ingresaste a la mesa " + (eleccion + 1));

	console.log("Ingresa el ID del articulo que deseas agregar:");
	const menu = menuDisponible();
	let idArticulo = parseInt(
		prompt(
			"Ingresa el ID del articulo que deseas agregar:\nIngresa '0' para salir"
		)
	);

	if (isNaN(idArticulo)) {
		console.log("El ID ingresado no es un número.");
		return;
	}

	const artIngresado = menu.find((producto) => producto.id === idArticulo);

	if (artIngresado) {
		console.log(
			`El ID ingresado es ${idArticulo}. Artículo: ${artIngresado.articulo}, Precio: $${artIngresado.precio}`
		);
		arrMesas[eleccion].push(artIngresado);
		console.log(`El contenido de la mesa es:
            `);
		console.log(arrMesas[eleccion]);
	}
	if ((idArticulo = 0 || "0")) {
		console.log("No agregaste ningun articulo.");
	} else {
		console.log("No se encontró ningún artículo con ese ID.");
		return;
	}
	console.log("Contenido de todas las mesas:");

	console.table(arrMesas);

	let contenidoArr = document.querySelector("tbody");

	let getData = arrMesas[eleccion];

	contenidoArr.innerHTML = "";

	let contenidoMesa = "";

	console.log(getData);
	getData.forEach((obj) => {
		contenidoMesa += `
                    <tr>
                        <td>${obj.articulo}</td>
                        <td>cantidad</td>
                        <td>${obj.precio}</td>                  
                        <td>${obj.precio}</td>     
                    </tr>
        `;
		console.log(obj);
	});
	contenidoArr.innerHTML = contenidoMesa;

	return eleccion;
}
/* Funcion para bloquear y desbloquear el plano */

console.log("Buscamos el candado en: ");

let bloquearPlano = document.querySelector(".lock");

console.log(bloquearPlano);

function cambiarCandado() {
	bloquearPlano.addEventListener("click", () => {
		console.log("Estado del candado");

		let estadoCandado = bloquearPlano.src;
		console.log("src del candado: ");
		console.log(estadoCandado);

		/*Selector de classes que "empiezan con" https://www.w3schools.com/cssref/sel_attr_begin.php */
		let mesasVisibles = document.querySelectorAll('[class^="grilla"]');
		let sumarMesa = document.querySelector(".addTable");
		console.log(sumarMesa);
		console.log(mesasVisibles);

		if (estadoCandado.includes("Close")) {
			console.log("Esta cerrado");
			candadoPlano = document.querySelector(".lock").src = "/Open.png";
			sumarMesa.style.visibility = "visible";
			mesasVisibles.forEach((mesa) => {
				mesa.style.visibility = "visible";
			});
			console.log("asi que lo abrimos.");
		} else if (estadoCandado.includes("Open")) {
			console.log("Esta unlocked");
			candadoPlano = document.querySelector(".lock").src = "/Close.png";
			sumarMesa.style.visibility = "hidden";
			mesasVisibles.forEach((mesa) => {
				mesa.style.visibility = "hidden";
			});
			console.log("Asi que lo cerramos");
		}
	});
}

/* Funciones de Drag
Mesas: Fuente: https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop2 */
/* Pop up: https://www.w3schools.com/HOWTO/tryit.asp?filename=tryhow_js_draggable */

/* DRAG MESAS  */
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}

/* FUNCIONES DE PESTAÑAS */

document.addEventListener("DOMContentLoaded", function () {
	const tabs = document.querySelectorAll('li[role="tab"]');

	tabs.forEach((tab) => {
		tab.addEventListener("click", function () {
			tabs.forEach((t) => t.setAttribute("aria-selected", "false"));

			tab.setAttribute("aria-selected", "true");
		});
	});
});

document.querySelectorAll("table.interactive").forEach((element) => {
	element.addEventListener("click", (event) => {
		const row = event.path.find(
			(element) =>
				element.tagName === "TR" && element.parentElement.tagName === "TBODY"
		);
		if (row) {
			row.classList.toggle("highlighted");
		}
	});
});

/* Crear estructura en la pestaña a traves de DOM */

/* TEST */

const paginaActual = window.location.href; 

setInterval(fechaSistema, 1000)

function fechaSistema() {
	const date = new Date();

	if (paginaActual.includes("platform.html")) {
		usuarioIniciado();
		document.querySelector(".fecha").textContent = `Fecha: ${date.toLocaleDateString()} | Hora: ${date.toLocaleTimeString()};`;
		usuarioIniciado();
	}
}

const date = new Date();






/* 	alert("Abre la consola para acceder a las opciones disponibles");

	console.log(`
            
            Funciones disponibles dentro de la plataforma: 

            1. menuDisponible(): nos permite ver el listado de articulos disponibles.

            2. cargarMenu(): nos permite cargar articulos a nuestro menú.

            3. crearMesa(): nos permite agregar una mesa vacia a nuestro array de mesas.

            4. abrirMesa(): nos permite abrir una mesa y cargar articulos a una mesa.
            `); */