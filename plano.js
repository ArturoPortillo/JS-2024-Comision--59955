/* Traer Usuarios registrados desde index.html */

cargarUsuarios() 


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
    { articulo: "Café con leche", precio: 3100, id: 1, rubro: "Cafeteria" },
    { articulo: "Capuchino", precio: 3500, id: 2, rubro: "Cafeteria" },
    { articulo: "Latte", precio: 3400, id: 3, rubro: "Cafeteria" },
    { articulo: "Americano", precio: 2800, id: 4, rubro: "Cafeteria" },
    { articulo: "Espresso", precio: 2700, id: 5, rubro: "Cafeteria" },
    { articulo: "Mocca", precio: 3600, id: 6, rubro: "Cafeteria" },
    { articulo: "Macchiato", precio: 3300, id: 7, rubro: "Cafeteria" },
    { articulo: "Flat White", precio: 3200, id: 8, rubro: "Cafeteria" },
    { articulo: "Café filtrado", precio: 2500, id: 9, rubro: "Cafeteria" },
    { articulo: "Affogato", precio: 3900, id: 10, rubro: "Cafeteria" },

    { articulo: "Agua con gas", precio: 1500, id: 11, rubro: "Bebidas" },
    { articulo: "Agua sin gas", precio: 1400, id: 12, rubro: "Bebidas" },
    { articulo: "Jugo de naranja", precio: 2500, id: 13, rubro: "Bebidas" },
    { articulo: "Jugo de manzana", precio: 2600, id: 14, rubro: "Bebidas" },
    { articulo: "Limonada", precio: 2700, id: 15, rubro: "Bebidas" },
    { articulo: "Agua saborizada", precio: 1800, id: 16, rubro: "Bebidas" },
    { articulo: "Refresco de cola", precio: 2300, id: 17, rubro: "Bebidas" },
    { articulo: "Refresco de naranja", precio: 2300, id: 18, rubro: "Bebidas" },
    { articulo: "Té frío", precio: 2400, id: 19, rubro: "Bebidas" },
    { articulo: "Horchata", precio: 2900, id: 20, rubro: "Bebidas" },

    { articulo: "Ensalada César", precio: 5500, id: 21, rubro: "Comida" },
    { articulo: "Hamburguesa clásica", precio: 7500, id: 22, rubro: "Comida" },
    { articulo: "Pasta Alfredo", precio: 6800, id: 23, rubro: "Comida" },
    { articulo: "Sándwich de pollo", precio: 6200, id: 24, rubro: "Comida" },
    { articulo: "Wrap vegetariano", precio: 5900, id: 25, rubro: "Comida" },
    { articulo: "Pizza Margherita", precio: 8000, id: 26, rubro: "Comida" },
    { articulo: "Tacos de carnitas", precio: 7000, id: 27, rubro: "Comida" },
    { articulo: "Chilaquiles verdes", precio: 6000, id: 28, rubro: "Comida" },
    { articulo: "Pollo al curry", precio: 7200, id: 29, rubro: "Comida" },
    { articulo: "Arroz con pollo", precio: 6800, id: 30, rubro: "Comida" },

	{ articulo: "Torta de chocolate", precio: 5500, id: 31, rubro: "Tortas" },
    { articulo: "Torta de zanahoria", precio: 5300, id: 32, rubro: "Tortas" },
    { articulo: "Torta tres leches", precio: 6000, id: 33, rubro: "Tortas" },
    { articulo: "Torta de vainilla", precio: 4800, id: 34, rubro: "Tortas" },
    { articulo: "Torta de frutilla", precio: 5800, id: 35, rubro: "Tortas" },
    { articulo: "Torta de limón", precio: 5200, id: 36, rubro: "Tortas" },
    { articulo: "Cheesecake de frutos rojos", precio: 6200, id: 37, rubro: "Tortas" },
    { articulo: "Torta de coco", precio: 5100, id: 38, rubro: "Tortas" },
    { articulo: "Torta de manzana", precio: 5700, id: 39, rubro: "Tortas" },
    { articulo: "Torta Red Velvet", precio: 5900, id: 40, rubro: "Tortas" },

    { articulo: "Guacamole con totopos", precio: 4300, id: 41, rubro: "Entradas" },
    { articulo: "Nachos con queso", precio: 4500, id: 42, rubro: "Entradas" },
    { articulo: "Quesadillas", precio: 4000, id: 43, rubro: "Entradas" },
    { articulo: "Bruschetta", precio: 3900, id: 44, rubro: "Entradas" },
    { articulo: "Alitas de pollo", precio: 4800, id: 45, rubro: "Entradas" },
    { articulo: "Papas fritas", precio: 3200, id: 46, rubro: "Entradas" },
    { articulo: "Croquetas de jamón", precio: 3700, id: 47, rubro: "Entradas" },
    { articulo: "Rollitos primavera", precio: 4100, id: 48, rubro: "Entradas" },
    { articulo: "Calamares fritos", precio: 4700, id: 49, rubro: "Entradas" },
    { articulo: "Patatas bravas", precio: 4200, id: 50, rubro: "Entradas" },

    { articulo: "Cerveza artesanal IPA", precio: 4900, id: 51, rubro: "Cervezas" },
    { articulo: "Cerveza rubia Lager", precio: 4600, id: 52, rubro: "Cervezas" },
    { articulo: "Cerveza negra Stout", precio: 5200, id: 53, rubro: "Cervezas" },
    { articulo: "Cerveza roja Amber Ale", precio: 5000, id: 54, rubro: "Cervezas" },
    { articulo: "Cerveza de trigo Weissbier", precio: 5300, id: 55, rubro: "Cervezas" },
    { articulo: "Cerveza Pilsner", precio: 4500, id: 56, rubro: "Cervezas" },
    { articulo: "Cerveza Porter", precio: 5400, id: 57, rubro: "Cervezas" },
    { articulo: "Cerveza Pale Ale", precio: 5100, id: 58, rubro: "Cervezas" },
    { articulo: "Cerveza sin alcohol", precio: 4000, id: 59, rubro: "Cervezas" },
    { articulo: "Cerveza con limón", precio: 4700, id: 60, rubro: "Cervezas" },

    { articulo: "Margarita", precio: 6200, id: 61, rubro: "Tragos" },
    { articulo: "Mojito", precio: 6000, id: 62, rubro: "Tragos" },
    { articulo: "Piña colada", precio: 6500, id: 63, rubro: "Tragos" },
    { articulo: "Gin tonic", precio: 5900, id: 64, rubro: "Tragos" },
    { articulo: "Caipirinha", precio: 6300, id: 65, rubro: "Tragos" },
    { articulo: "Whiskey sour", precio: 6800, id: 66, rubro: "Tragos" },
    { articulo: "Tequila sunrise", precio: 6100, id: 67, rubro: "Tragos" },
    { articulo: "Martini seco", precio: 6400, id: 68, rubro: "Tragos" },
    { articulo: "Cosmopolitan", precio: 6200, id: 69, rubro: "Tragos" },
    { articulo: "Bloody Mary", precio: 6700, id: 70, rubro: "Tragos" }
];


let articulo;
let precio = 0;
let id = datosMenu.length;

/* Funcion para ver el menu disponible */

let artMenu = document.getElementById('artMenu');
const menuTabs = document.querySelectorAll('li[role="tab"]');

let btnMenu = document.querySelector(".addMenu");

let contenidoLog;

function menuDisponible(selectedRubro = "Cafeteria") {
	artMenu.innerHTML = "";
	const filteredItems = datosMenu.filter((menu) => menu.rubro === selectedRubro);

	filteredItems.forEach((menu) => {
        const {id, articulo, precio} = menu;
        let contenido = `<button class="btnaddArt" id="${id}">${articulo} - $${precio}</button>`;
        artMenu.innerHTML += contenido;
    });
    
    return filteredItems;
} 

	menuTabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
        event.preventDefault();
        
        const selectedRubro = event.target.getAttribute('data-rubro');
        
        menuDisponible(selectedRubro);
    });
});
menuDisponible();

/* Funcion para cargar Articulos al array de menu */

function cargarMenu() {
	/* while (true) {
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
		} else { */
			/* id += 1; */
		/* 	const producto = {
				articulo: nuevoArticulo,
				precio: nuevoPrecio,
				id: id,
				cantidad: cantidad
			}; */

			let popupDinamico = document.querySelector('.popupDinamico')
				popupDinamico.innerHTML = `
						<div class="popUpformenu animate__animated animate__zoomIn" draggable="true" ondragstart="drag(event)" id="mydiv">
						<div style="display: flex; flex-direction: row;">
						<div class="title-bar" id="mydivheader">            
						<div class="title-bar-text innerHeader" style="margin:0 12rem 0 0;padding:0;"> <img src="favicon2.png" alt="" class="innerFavicon">MiBar - Sistema de gestión Gastronomica</div>
						<div class="title-bar-controls">
						<button type="button" aria-label="Close" class="cancelarRegistro" style="height:16px;width:14px;margin-top:3px;"></button>
						</div> 
					</div>  	
					</div>
				<fieldset class="popUpmenu" >
				        
						 <div class="field-row-stacked">
							<label>Nuevo producto:</label>
							<input type="text" placeholder="nombre producto" class="newProductfield"  ondragstart="return false;" ondrop="return false;" onfocus="this.value=''"/>
            			</div>
					<div class="field-row-stacked">
						<label>Precio producto:</label>
						<input type="password" placeholder="precio producto" class="newPass"  ondragstart="return false;" ondrop="return false;" onfocus="this.value=''"/>
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

			datosMenu.forEach((menu) => {
				/* Destructuring */
				const {id, articulo, precio} = menu
				contenidoLog = `ID: ${id}\nArticulo: ${articulo}\nPrecio: $${precio}`;
				let contenido = `<button class="btnaddArt" id="${id}" onclick="abrirMesa(mesa)">${articulo}</button>`;
				console.log(contenidoLog);
				artMenu.innerHTML += contenido;
			});

			datosMenu.push(producto);
			console.table(datosMenu);
			menuDisponible();
		}
		

/* btnMenu.addEventListener("click", cargarMenu); */

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
} crearMesa()

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

	toggleVis('cerrarMesa')
	let mesaSelec = parseInt(mesa.id);
	let eleccion = mesaSelec - 1;
	console.log("Ingresaste a la mesa " + (eleccion + 1));	
	
	let coleccion =  document.querySelectorAll('.btnaddArt')

	/* coleccion.forEach(btn => {	
		btn.addEventListener('click', function(){.... */


    coleccion.forEach(btn => {	
        btn.onclick = function() {
            let getBtnid = parseInt(btn.id);
            let artIngresado = datosMenu.find((producto) => producto.id === getBtnid);	

            if (artIngresado) {
                let articuloExistente = arrMesas[eleccion].find(articulo => articulo.id === artIngresado.id);
                
                if (articuloExistente) {
                    articuloExistente.cantidad += 1;
                    console.log(articuloExistente.cantidad);
                } else {
                    arrMesas[eleccion].push({ ...artIngresado, cantidad: 1 });
                }

                console.log(`Artículo ${artIngresado.articulo} agregado a la mesa ${eleccion + 1}`);
                renderMesa(eleccion);
            }
        };
    });

    renderMesa(eleccion); 
}


	

/* Func. para renderizar el contenido de las mesas */

function renderMesa(eleccion) {
	let mesaHeader = document.querySelector(".mesaHeader")
	mesaHeader.innerHTML = `
	 <div class="title-bar-text">SALON</div>
                      <div class="title-bar-text">MESA #${eleccion + 1}</div>
                      <div class="title-bar-text">MOZO: </div>
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
						<td>${obj.id}</td>
						<td>${obj.articulo}</td>
						<td>${obj.cantidad}</td>
						<td>${obj.precio}</td>                  
						<td>${obj.precio * obj.cantidad}</td>     
					</tr>
		`;
	});
	contenidoArr.innerHTML = contenidoMesa;

	let precioArt = 0;
	arrMesas[eleccion].forEach((articulo) => {
		precioArt += articulo.precio * articulo.cantidad		
	})
	console.log(precioArt)

	let mesaTotal =  document.querySelector('.mesaTotal')
	console.log(mesaTotal)

	mesaTotal.innerHTML = `<li><b>$${precioArt}</b></li>`;
	/* contenidoArr.forEach((total) =>) */
};

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
			candadoPlano = document.querySelector(".lock").src = "Open.png";
			sumarMesa.style.visibility = "visible";
			mesasVisibles.forEach((mesa) => {
				mesa.style.visibility = "visible";
			});
/* 			console.log("asi que lo abrimos."); */
		} else if (estadoCandado.includes("Open")) {
		/* 	console.log("Esta unlocked"); */
			candadoPlano = document.querySelector(".lock").src = "Close.png";
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
/* Crear estructura en la pestaña a traves de DOM */

/* TEST */

const paginaActual = window.location.href; 



function fechaSistema() {
	const date = new Date();	
		document.querySelector(".fecha").textContent = `Fecha: ${date.toLocaleDateString()} | Hora: ${date.toLocaleTimeString()};`;	
}

setInterval(fechaSistema, 1000)

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





/* Estructura Salon: */

function estructuraSalon() {
	let estructuraSalon = document.querySelector('.window-body')
	estructuraSalon.innerHTML = `<img src="Close.png" class="lock" alt="LOCK" onclick="cambiarCandado()">
            <img src="plusIconPixel.png" class="addTable" alt="" onclick="crearMesa()">
            <div class="tree-view parent" id="plano">
              <!-- Dinamico a traves de JS -->   
              <div class="grilla1" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla2" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla3" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla4" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla5" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla6" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla7" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla8" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla9" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla10" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla11" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla12" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla13" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla14" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla15" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla16" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla17" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla18" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla19" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla20" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla21" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla22" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla23" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla24" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla25" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla26" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla27" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla28" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla29" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla30" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla31" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla32" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla33" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla34" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla35" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla36" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla37" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla38" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla39" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla40" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla41" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla42" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla43" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla44" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla45" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla46" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla47" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla48" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla49" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla50" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla51" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla52" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla53" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla54" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla55" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla56" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla57" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla58" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla59" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla60" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla61" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla62" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>
              <div class="grilla63" ondrop="drop(event)" ondragover="allowDrop(event)"> </div>       
            </div>
            <!-- PANEL DE MESA ABIERTA -->
          <div>
            <fieldset class="contenidoArr">
              <div class="sunken-panel">
                <table class="interactive">
                  <thead>                  
                    <div class="title-bar mesaHeader">
                      <div class="title-bar-text">SALON</div>
                      <div class="title-bar-text">MESA #${mesa.id}</div>
                      <div class="title-bar-text">MOZO: ${nombreUsuario}</div>
                      <div class="title-bar-controls">
                        <button aria-label="Close" class="escMesa"></button>
                      </div>
                    </div>
                    <div>
                      <tr>
                        <th style="min-width:0.1rem;">ID</th>
                        <th style="min-width:10rem;">Articulo</th>
                        <th style="min-width:2rem;">cantidad</th>
                        <th style="min-width:5rem;">precio</th>
                        <th style="width: 100vw;">total</th>
                      </tr>
                    </div>
                  </thead>
                  <tbody class="contenidoMesa"> 
                    <!-- Contenido dinamico de articulos en la mesa. -->
                    <tr>
                      <td>${obj.id}</td>
                      <td>${obj.articulo}</td>
                      <td>${cantidad}</td>
                      <td>${obj.precio}</td>                  
                      <td>Total</td>     
                    </tr>           
                  </tbody>
                </table>
              </div>
              <div>
                <fieldset class="contenedorMesa">
                  <div>
                    <div>
                      <ul class="tree-view">
                        <li style="color: grey;">Resultados de la busqueda</li>
                      </ul>
                    </div>
                  </div>
                  <div class="field-row filtrar">
                    <label for="text17"> Buscar</label>
                    <input id="text17" type="text" />
                  </div>    
                  <div class="panelMesa">                
                    <div class="panelBtn1"><button class="panelBtn">+</button> </div>
                    <div class="panelBtn2"><button class="panelBtn">-</button> </div>
                    <div class="panelBtn3"><button class="panelBtn">borrar</button> </div>
                      <div class="panelBtn4">
                         <ul class="tree-view mesaTotal">
                          <li>Total</li>
                         </ul>
                      </div>
                    <div class="panelBtn5"><button class="panelBtn">Anular</button> </div>
                    <div class="panelBtn6"><button class="panelBtn">Descuento</button> </div>
                    <div class="panelBtn7"><button class="panelBtn">Transferir</button> </div>
                    <div class="panelBtn8"><button class="panelBtn">Mozo</button> </div>
                    <div class="panelBtn9"><button class="panelBtn">Fact B</button> </div> 
                    <div class="panelBtn10"><button class="panelBtn">Ticket Fiscal</button> </div> 
                  </div> 
                  <div class="logo2"><img class="logoMibar2" src="LOGO MIBAR.png" alt=""></div>
        <div class="window-body">          
                  </fieldset>
                </div>
              </fieldset>
              </div>
              <!-- Panel menu -->   
              <div>
                <fieldset class="menuWindow">
                  <fieldset class="menuWindow panelPadding">
                    <div class="title-bar">
                      <div class="title-bar-text">MENU DISPONIBLE</div>
                      <div class="title-bar-controls">
                        <button aria-label="Close"></button>
                      </div>
                    </div>
                    <div>
                      <menu role="tablist">
                        <li role="tab" aria-selected="true"><a href="#tabs">Rubro #1</a></li>
                        <li role="tab"><a href="#tabs">Rubro #2</a></li>
                        <li role="tab"><a href="#tabs">Rubro #3</a></li>
                        <li role="tab"><a href="#tabs">Rubro #4</a></li>
                        <li role="tab"><a href="#tabs">Rubro #5</a></li>
                        <li role="tab"><a href="#tabs">Rubro #6</a></li>
                      </menu>
                    </div>
                    <div>
                      <div class="panelMenu">
                        <!-- Botones de articulos dinamicos -->    
                      </div>
                      <img src="plusIconPixel.png" alt="+" class="addMenu">
                    </div>
                  </fieldset>
                </fieldset>
              </div>
        </div>
              <div>
                <div class="status-bar">
                  <p class="status-bar-field usuarioActivo">Usuario: </p> 
                  <p class="status-bar-field fecha">Fecha</p></p>
                  <p class="status-bar-field">JavaScript Comision #59955</p>
                </div>      
              </div>
            </div>`
}

/* Estructura Menu */

function estructuraMenu() {
    let estructuraMenu = document.querySelector('.window-body')
    estructuraMenu.innerHTML = `
<div class="gridMenu">
            <div class="gridMenu1">
              <ul class="tree-view treeSize">
                <details open>
                  <summary>Menu disponible</summary>
                  <ul>
                      <details>
                          <summary>Lista de rubros</summary>
                          <ul>
                              <li>
                                  <details>
                                      <summary>1 - Cafeteria</summary>
                                      <ul>
                                        <li>Café con leche</li>
                                        <li>Latte</li>
                                        <li>Americano</li>
                                        <li>Espresso</li>
                                        <li>Capuchino</li>
                                        <li>Mocca</li>
                                        <li>Macchiato</li>
                                        <li>Flat White</li>
                                        <li>Café filtrado</li>
                                        <li>Affogato</li>
                                      </ul>
                                  </details>
                              </li>
                          </ul>
                          <ul>
                              <li>
                                  <details>
                                      <summary>2 - Bebidas</summary>
                                      <ul>
                                          <li>Agua con gas</li>
                                          <li>Agua sin gas</li>
                                          <li>Jugo de naranja</li>
                                          <li>Jugo de manzana</li>
                                          <li>Limonada</li>
                                          <li>Agua saborizada</li>
                                          <li>Refresco de cola</li>
                                          <li>Refresco de naranja</li>
                                          <li>Té frío</li>
                                          <li>Horchata</li>
                                      </ul>
                                  </details>
                              </li>
                          </ul>
                          <ul>
                              <li>
                                  <details>
                                      <summary>3 - Comida</summary>
                                      <ul>
                                          <li>Ensalada César</li>
                                          <li>Hamburguesa clásica</li>
                                          <li>Pasta Alfredo</li>
                                          <li>Sándwich de pollo</li>
                                          <li>Wrap vegetariano</li>
                                          <li>Pizza Margherita</li>
                                          <li>Tacos de carnitas</li>
                                          <li>Chilaquiles verdes</li>
                                          <li>Pollo al curry</li>
                                          <li>Arroz con pollo</li>
                                      </ul>
                                  </details>
                              </li>
                          </ul>
                          <ul>
                              <li>
                                  <details>
                                      <summary>4 - Tortas</summary>
                                      <ul>
                                          <li>Torta de milanesa</li>
                                          <li>Torta de jamón</li>
                                          <li>Torta cubana</li>
                                          <li>Torta ahogada</li>
                                          <li>Torta de pollo</li>
                                          <li>Torta de carnitas</li>
                                          <li>Torta de chorizo</li>
                                          <li>Torta de pierna</li>
                                          <li>Torta de pastor</li>
                                          <li>Torta de huevo</li>
                                      </ul>
                                  </details>
                              </li>
                          </ul>
                          <ul>
                              <li>
                                  <details>
                                      <summary>5 - Entradas</summary>
                                      <ul>
                                          <li>Guacamole con totopos</li>
                                          <li>Nachos con queso</li>
                                          <li>Quesadillas</li>
                                          <li>Bruschetta</li>
                                          <li>Alitas de pollo</li>
                                          <li>Papas fritas</li>
                                          <li>Croquetas de jamón</li>
                                          <li>Rollitos primavera</li>
                                          <li>Calamares fritos</li>
                                          <li>Patatas bravas</li>
                                      </ul>
                                  </details>
                              </li>
                          </ul>
                          <ul>
                              <li>
                                  <details>
                                      <summary>6 - Cervezas</summary>
                                      <ul>
                                          <li>Cerveza artesanal IPA</li>
                                          <li>Cerveza rubia Lager</li>
                                          <li>Cerveza negra Stout</li>
                                          <li>Cerveza roja Amber Ale</li>
                                          <li>Cerveza de trigo Weissbier</li>
                                          <li>Cerveza Pilsner</li>
                                          <li>Cerveza Porter</li>
                                          <li>Cerveza Pale Ale</li>
                                          <li>Cerveza sin alcohol</li>
                                          <li>Cerveza con limón</li>
                                      </ul>
                                  </details>
                              </li>
                          </ul>
                          <ul>
                              <li>
                                  <details>
                                      <summary>7 - Tragos</summary>
                                      <ul>
                                          <li>Margarita</li>
                                          <li>Mojito</li>
                                          <li>Piña colada</li>
                                          <li>Gin tonic</li>
                                          <li>Caipirinha</li>
                                          <li>Whiskey sour</li>
                                          <li>Tequila sunrise</li>
                                          <li>Martini seco</li>
                                          <li>Cosmopolitan</li>
                                          <li>Bloody Mary</li>
                                      </ul>
                                  </details>
                              </li>
                          </ul>
                      </details>
                  </ul>
              </details>
          </ul>
            </div>
            <!-- Cargar Articulos -->
             <div>
              <div class="gridMenu2">
                <div class="campoArticulos">
                  <div>
                      <div class="cargarTitle">
                          <div>
                            <img src="winhlp32.exe_14_4001.ico" alt="">
                            <p>Cargar Articulo nuevo</p>
                          </div>
                          <div>
                            <label for="text17"><p style="margin-left: -1.5rem;">Articulo</p></label>
                            <input id="text17" type="text" class="nuevoArticulo"/>
                          </div>
  
                      </div>
                    <div>
                      <label for="text17"><p>Precio</p></label>
                      <input id="text17" type="text" class="nuevoPrecio"/>
                    </div>
                    <div class="inputContainer">
                      <input type="submit" value="Cargar"/>
                      <input type="reset" value="Limpiar"/>
                    </div>
  
                  </div>
                  <div>
                    <div class="selRubro">
                      <p>Selecciona rubro:</p>
                      <select>
                        <option>7 - Tragos</option>
                        <option>6 - Cervezas</option>
                        <option>5 - Entradas</option>
                        <option>4 - Tortas</option>
                        <option>3 - Comida</option>
                        <option>2 - Bebidas</option>
                        <option selected>1 - Cafeteria</option>
                      </select>
                    </div>
                  </div>
              </div>
              </div>
              <!-- Editar Articulos -->
              <div class="gridMenu3">
                <p>Editar Articulo</p>
                  <div class="campoArticulos">
                  <div>
                      <div class="cargarTitle">
                          <div>
                            <img src="wmp.dll_14_28753.ico" alt="">
                            <p>Editar Articulos</p>
                          </div>
                          <div>
                            <label for="text17"><p style="margin-left: -1.5rem;">Articulo</p></label>
                            <input id="text17" type="text" class="nuevoArticulo"/>
                          </div>
  
                      </div>
                    <div>
                      <label for="text17"><p>Precio</p></label>
                      <input id="text17" type="text" class="nuevoPrecio"/>
                    </div>
                    <div class="inputContainer">
                      <input type="submit" value="Actualizar"/>
                      <input type="reset" value="Borrar"/>
                    </div>
  
                  </div>
                  <div>
                    <div class="selRubro">
                      <p>Cambiar rubro:</p>
                      <select>
                        <option>7 - Tragos</option>
                        <option>6 - Cervezas</option>
                        <option>5 - Entradas</option>
                        <option>4 - Tortas</option>
                        <option>3 - Comida</option>
                        <option>2 - Bebidas</option>
                        <option selected>1 - Cafeteria</option>
                      </select>
                    </div>
                  </div>
              </div>
              <div>
                <div style="margin-top: 10px;">
                  <ul class="tree-view" style="margin-right: 4.5rem;">
                    <li style="color: grey;">Resultados de la busqueda</li>
                  </ul>
                </div>
              </div>
              <div class="field-row filtrar" style="margin-top: 4px;">
                <label for="text17"> Buscar</label>
                <input id="text17" type="text" />
              </div>     
            </div>
          </div><!-- Fin body -->  

        </div>
        <img src="LOGO MIBAR.png" style="width:290px;height:160px;z-index:1;position:absolute;margin-top:30rem;margin-left:15rem;opacity:0.4;" alt="">
             </div>


    </div>  
    `
}