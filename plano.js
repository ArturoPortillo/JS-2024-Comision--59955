/* Traer Usuarios registrados desde index.html */

/* let user = localStorage.getItem("usuario");
user = JSON.parse(user);
console.log(user.usuario); */

/* Funcion para recordar usuario en sesion */

function usuarioIniciado() {
	const nombreUsuario = localStorage.getItem("usuarioActivo");
	document.querySelector(
		".usuarioActivo"
	).textContent = `Usuario: ${nombreUsuario}`;
	return nombreUsuario;
}

usuarioIniciado()

/* PopUp dinamico */

function popDinamico(texto) {
	let popupDinamico = document.querySelector('.popupDinamico')
	popupDinamico.innerHTML = `
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
              <p>${texto}</p>
            </div>
        </div>  
    </div>
	`
	dragElement(document.getElementById("mydiv"));

	let btnCerrar = document.querySelectorAll('.cancelarRegistro');
    btnCerrar.forEach(btn => {
        btn.addEventListener("click", function() {
            toggleVis('popUpform');
        });
    });
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

let contenidoLog;

function menuDisponible() {
	
/* 	console.log(`Articulos disponibles: `); */
	artMenu.innerHTML = "";
	datosMenu.forEach((menu) => {
		/* Destructuring */
		const {id, articulo, precio} = menu
		contenidoLog = `ID: ${id}\nArticulo: ${articulo}\nPrecio: $${precio}`;
		let contenido = `<button class="btnaddArt" id="${id}">${articulo}</button>`;
/* 		console.log(contenidoLog); */
		artMenu.innerHTML += contenido;
	});
	return datosMenu;
}
menuDisponible()

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
				/* Destructuring */
				const {id, articulo, precio} = menu
				contenidoLog = `ID: ${id}\nArticulo: ${articulo}\nPrecio: $${precio}`;
				let contenido = `<button class="btnaddArt" id="${id}">${articulo}</button>`;
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
		/* Si no pongo += sobreescrimos la mesa y borramos contenidos sin querer, poniendo += nos permite "solapar" mesas si movimos una mesa a una posicion adelantada y creamos mesas en divs anteriores a la ultima.*/
		mesaExistente.innerHTML += templateMesa;
	} else {
		popDinamico("Limite de mesas alcanzado.")
		toggleVis("popUpform")
		intervalo("popUpform")
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

	console.log(mesa);

	let mesaSelec = parseInt(mesa.id);
	let eleccion = mesaSelec - 1;
	console.log("Ingresaste a la mesa " + (eleccion + 1));
	
	const menu = menuDisponible();
	menuDisponible();
	
	
	let coleccion = document.querySelectorAll('.btnaddArt')

	coleccion.forEach(btn => {	
		btn.addEventListener('click', function(){
			let getBtnid = parseInt(btn.id - 1);
			let artIngresado = menu.find((producto) => producto.id === getBtnid.id);
			console.log(artIngresado)

			arrMesas[eleccion].push(datosMenu[getBtnid]) 
		renderMesa(eleccion)		
	});	
});
renderMesa(eleccion)	
return eleccion;
}

/* Func. para renderizar el contenido de las mesas */

function renderMesa(eleccion) {
	let mesaHeader = document.querySelector(".mesaHeader")
	mesaHeader.innerHTML = `
	 <div class="title-bar-text">SALON</div>
                      <div class="title-bar-text">MESA #${eleccion + 1}</div>
                      <div class="title-bar-text">MOZO: }</div>
                      <div class="title-bar-controls">
                        <button aria-label="Close" class="escMesa"></button>
                      </div>
	`

	let contenidoArr = document.querySelector(".contenidoMesa");
	let getData = arrMesas[eleccion];
	console.log(getData)
	contenidoArr.innerHTML = "";
	let contenidoMesa = "";

	getData.forEach((obj) => {
		contenidoMesa += `
					<tr>
						<td>${obj.articulo}</td>
						<td>cantidad</td>
						<td>${obj.precio}</td>                  
						<td>${obj.precio}</td>     
					</tr>
		`;
	});
	contenidoArr.innerHTML = contenidoMesa;
}

/* Funcion para bloquear y desbloquear el plano */

let bloquearPlano = document.querySelector(".lock");

function cambiarCandado() {
	bloquearPlano.addEventListener("click", () => {
		/* console.log("Estado del candado"); */

		let estadoCandado = bloquearPlano.src;
/* 		console.log("src del candado: ");
		console.log(estadoCandado); */

		/*Selector de classes que "empiezan con" https://www.w3schools.com/cssref/sel_attr_begin.php */
		let mesasVisibles = document.querySelectorAll('[class^="grilla"]');
		let sumarMesa = document.querySelector(".addTable");
/* 		console.log(sumarMesa);
		console.log(mesasVisibles); */

		if (estadoCandado.includes("Close")) {
/* 			console.log("Esta cerrado"); */
			candadoPlano = document.querySelector(".lock").src = "/Open.png";
			sumarMesa.style.visibility = "visible";
			mesasVisibles.forEach((mesa) => {
				mesa.style.visibility = "visible";
			});
/* 			console.log("asi que lo abrimos."); */
		} else if (estadoCandado.includes("Open")) {
		/* 	console.log("Esta unlocked"); */
			candadoPlano = document.querySelector(".lock").src = "/Close.png";
			sumarMesa.style.visibility = "hidden";
			mesasVisibles.forEach((mesa) => {
				mesa.style.visibility = "hidden";
			});
	/* 		console.log("Asi que lo cerramos"); */
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



function fechaSistema() {
	const date = new Date();
	if (paginaActual.includes("platform.html")) {
		document.querySelector(".fecha").textContent = `Fecha: ${date.toLocaleDateString()} | Hora: ${date.toLocaleTimeString()};`;
	}
}

setInterval(fechaSistema, 1000)
