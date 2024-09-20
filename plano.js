/* ############# Traer Usuarios registrados desde index.html  ############# */

cargarUsuarios() 


/* ############# Funcion para recordar usuario en sesion  ############# */

function usuarioIniciado() {
	const nombreUsuario = localStorage.getItem("usuarioActivo");
	document.querySelector(
		".usuarioActivo"
	).textContent = `Usuario: ${nombreUsuario}`;
	return nombreUsuario;
}

usuarioIniciado()

/* Array de mesas */

const arrMesas = [];

/* ############# Funcion para crear Mesa nueva ########## */

function crearMesa() {
	let nuevaMesa = [];

	let arrLength = arrMesas.length + 1;
	arrMesas.push(nuevaMesa);
	console.log("creaste una nueva mesa.");
	console.log("Numero de mesa creada: " + arrLength);
	console.log(arrMesas);

	let target = document.querySelector("#plano");

	let templateMesa = `<div class="modeloMesa" id="${arrLength}" onclick="abrirMesa(this)" draggable="true" ondragstart="drag(event)">MESA ${arrLength}</div>`;

	let mesaExistente = target.querySelector(`.grilla${arrLength}`);

	/* condicional con Operarador ternario 

    mesaExistente = true
		? (mesaExistente.innerHTML += templateMesa)
		: alert("No se pueden crear más mesas, has llegado al limite del plano.");
    */

	if (mesaExistente) {
		mesaExistente.innerHTML += templateMesa;
	} else {
		popDinamico("Limite de mesas alcanzado.")
		toggleVis("popUpform")
		intervalo("popUpform")
	}
	return arrLength;
} crearMesa()


/* #############  Funcion para abrir una mesa y agregar articulos a la mesa seleccionada ############# */

function abrirMesa(mesa) {	
    ocultarMesa();
    let mesaSelec = parseInt(mesa.id);
    let eleccion = mesaSelec - 1;
    console.log("Ingresaste a la mesa " + (eleccion + 1));	

    renderMenu(eleccion, "Cafeteria");

    let rubroTabs = document.querySelectorAll('li[role="tab"]');
    rubroTabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            const selectedRubro = event.target.getAttribute('data-rubro');
            renderMenu(eleccion, selectedRubro); 
        });
    });

    renderMesa(eleccion);
	resaltar() 
}

/* ############# Func. para renderizar el contenido de las mesas ############# */


function renderMesa(eleccion) {

	let mesaHeader = document.querySelector(".mesaHeader")
	mesaHeader.innerHTML = `
	 <div class="title-bar-text">SALON</div>
                      <div class="title-bar-text">MESA #${eleccion + 1}</div>
                      <div class="title-bar-text">MOZO: </div>
                      <div class="title-bar-controls">
                        <button aria-label="Close" class="escMesa" onclick="ocultarMesa()"></button>
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
						<td><li>${obj.articulo}</li> </td>
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
	resaltar()

    setupButtonListeners(eleccion);
};

// Move the handler outside so we can refer to the same function when adding/removing listeners
function handleButtonClick(event) {
    let action = event.currentTarget.value;  // Get the button value (+ or -)
    console.log("Button pressed: " + action);
    const eleccion = event.currentTarget.dataset.eleccion; 
    console.log(eleccion) // Assume eleccion is set as a data attribute on the button
    modCantidades(action, eleccion);
}

function setupButtonListeners(eleccion) {
    let btnValue = document.querySelectorAll('.panelBtn');
    btnValue.forEach(btn => {
        btn.dataset.eleccion = eleccion;

        btn.removeEventListener('click', handleButtonClick);
        
        btn.addEventListener('click', handleButtonClick);
    });
}

// Function to handle adding or decreasing item quantity
function modCantidades(action, eleccion) {
    let mesaTotal =  document.querySelector('.mesaTotal')
    if (!artResaltado) {
        console.log("No item highlighted!");
        return;
    }

    // Find the highlighted item in the current table (mesa)
    const mesaSeleccionada = arrMesas[eleccion];
    const itemIndex = mesaSeleccionada.findIndex(item => item.articulo.trim() === artResaltado);

    if (itemIndex !== -1) {
        if (action === "+") {
            mesaSeleccionada[itemIndex].cantidad += 1; 
        } else if (action === "-") {
            if (mesaSeleccionada[itemIndex].cantidad > 0) {
                mesaSeleccionada[itemIndex].cantidad -= 1; 
            }
            if (mesaSeleccionada[itemIndex].cantidad === 0) {
                mesaSeleccionada.splice(itemIndex, 1);
            } 
            } else if (action === "borrar") {
                mesaSeleccionada.splice(itemIndex, 1);
            } else if (action === "anular") {
                arrMesas[eleccion] = [];
            }  else if (action === "trans") {
                const itemIndex = mesaSeleccionada.findIndex(item => item.articulo.trim() === artResaltado);
                if (itemIndex !== -1) {
                    const mesaDestino = parseInt(prompt("Ingresa el numero de mesa a transferir:"), 10) - 1;
                    
                    
                    if (isNaN(mesaDestino) || mesaDestino < 0 || mesaDestino >= arrMesas.length) {
                        console.log("Numero de mesa invalido.");
                        return;
                    }
        
                    const moverArticulo = mesaSeleccionada.splice(itemIndex, 1)[0];
                    
                    arrMesas[mesaDestino].push(moverArticulo);
                } 
            } else if (action === "desc") {
                let discountPercentage;
                do {
                    discountPercentage = parseFloat(prompt("Enter the discount percentage (0-100):"));
                } while (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100);

                console.log(mesaTotal)
            
         
                let total = mesaSeleccionada.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
                let discountAmount = (discountPercentage / 100) * total;
                let discountedTotal = total - discountAmount;
    
                console.log(`Discount applied: ${discountPercentage}%`);
                console.log(`Original total: $${total.toFixed(2)}`);
                console.log(`Discounted total: $${discountedTotal.toFixed(2)}`);
                mesaTotal.innerHTML = `<li><b>$${discountedTotal}</b></li>`;
                renderMesa(eleccion); // Re-render to update the discounted total in the DOM
    
            }
            renderMesa(eleccion); // Re-render to update the discounted total in the DOM
            // Update the DOM after modification
            
        } else {
            console.log("Item not found in the table.");
        }
        if (action === "trans") {
            renderMesa(mesaDestino);
        }
    
        // Re-render the table to reflect the updated quantities
        renderMesa(eleccion);
    
    }            



/* ############## Funcion para cargar el menu ############# */

function renderMenu(eleccion, selectedRubro) {
    /* Vaciamos el contenedor */
    artMenu.innerHTML = "";

    /* Filtramos los articulos por rubro seleccionado */
    const filteredItems = datosMenu.filter((menu) => menu.rubro === selectedRubro);
    filteredItems.forEach((menu) => {
        const {id, articulo, precio} = menu;
        let contenido = `<button class="btnaddArt" id="${id}">${articulo} - $${precio}</button>`;
        artMenu.innerHTML += contenido;
    });

    /* Asignamos el evento a cada boton */
    let coleccion = document.querySelectorAll('.btnaddArt');
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
}


/* Funcion para bloquear y desbloquear el plano */

let bloquearPlano = document.querySelector(".lock");

function cambiarCandado() {
	bloquearPlano.addEventListener("click", () => {

        const lockText = document.querySelector('.estadoCandadotxt');
        const lockFixedsize = document.querySelector('.lock');
		let estadoCandado = bloquearPlano.src;

		/*Selector de classes que "empiezan con" https://www.w3schools.com/cssref/sel_attr_begin.php */
		let mesasVisibles = document.querySelectorAll('[class^="grilla"]');
		const sumarMesa = document.querySelector(".addTable");
        const sumarMesaTxt = document.querySelector(".btnPlus p")
        const btnMargin = document.querySelector(".btnLock")

		if (estadoCandado.includes("Close")) {
/* 			console.log("Esta cerrado"); */
			candadoPlano = document.querySelector(".lock").src = "Open.png";
            lockFixedsize.style.width = "23px";
            lockFixedsize.style.height = "23px";
            sumarMesa.style.height = "25px";
            sumarMesa.style.width = "25px"
            sumarMesaTxt.style.visibility = "visible";
			sumarMesa.style.visibility = "visible";
            lockText.innerHTML = "Bloquear plano"
			mesasVisibles.forEach((mesa) => {
				mesa.style.visibility = "visible";
			});
/* 			console.log("asi que lo abrimos."); */
		} else if (estadoCandado.includes("Open")) {
		/* 	console.log("Esta unlocked"); */
			candadoPlano = document.querySelector(".lock").src = "Close.png";
            lockFixedsize.style.width = "19px";
            lockFixedsize.style.height = "23px";
            sumarMesa.style.height = "25px";
            sumarMesa.style.width = "25px"  
            sumarMesaTxt.style.visibility = "hidden";
			sumarMesa.style.visibility = "hidden";
            lockText.innerHTML = "Desbloquear plano"
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

	function showTab(tabName) {
	let salonTab = document.querySelector('#salon-tab');
	let facturacionTab = document.querySelector('#facturacion-tab');
	let comprobantesTab = document.querySelector('#comprobantes-tab');
	let menuTab = document.querySelector('#menu-tab');
	let empleadosTab = document.querySelector('#empleados-tab');

	if (tabName === 'salon-tab') {
	salonTab.style.display = 'block';
    facturacionTab.style.display = 'none';
    comprobantesTab.style.display = 'none';
    menuTab.style.display = 'none';
    empleadosTab.style.display = 'none';
	} else if (tabName === 'facturacion-tab') {
    facturacionTab.style.display = 'block';
    menuTab.style.display = 'none';
    salonTab.style.display = 'none';
    comprobantesTab.style.display = 'none';
    empleadosTab.style.display = 'none';
	} else if (tabName === 'comprobantes-tab') {
    comprobantesTab.style.display = 'block';
    salonTab.style.display = 'none';
    facturacionTab.style.display = 'none';
    menuTab.style.display = 'none';
    empleadosTab.style.display = 'none';
	} else if (tabName === 'menu-tab') {
	menuTab.style.display = 'block';
	empleadosTab.style.display = 'none';
	salonTab.style.display = 'none';
	facturacionTab.style.display = 'none';
	comprobantesTab.style.display = 'none';
	}  else if (tabName === 'empleados-tab') {
	empleadosTab.style.display = 'block';
	menuTab.style.display = 'none';
	salonTab.style.display = 'none';
	facturacionTab.style.display = 'none';
	comprobantesTab.style.display = 'none';
	} 
}

/* Funcion para resaltar Listas */

let artResaltado = null;

function resaltar() {

    const liTags = document.querySelectorAll('li');

    function removerResaltar() {
        liTags.forEach(item => {
            item.classList.remove('highlighted');
        });
    }

    function seleccionarLi(event) {
            removerResaltar();
            event.currentTarget.classList.add('highlighted');
            artResaltado = event.currentTarget.textContent.trim();
			console.log("Objeto seleccionado:", event.currentTarget.textContent);
        
        event.stopPropagation(); 
    }

    liTags.forEach(item => {
        item.addEventListener('click', seleccionarLi);		
    });

}


document.addEventListener('DOMContentLoaded', () => {    
resaltar();
arbolMenu();
});

/* Funcion a borrar. */
function recorrerMesas() {
	console.log(`Las mesas disponibles son: `);
	arrMesas.forEach((arr) => {
		console.log(arr);
	});
	return arrMesas;
}


