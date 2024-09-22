/* Variables globales */

let arrMesas = [];
let meserosPorMesa = []; 
let selectedUser = null; 

/* ############# Traer Usuarios registrados desde index.html  ############# */

cargarUsuarios() 


/* ############# Funcion para recordar usuario en sesion  ############# */

function usuarioIniciado() {
	const nombreUsuario = localStorage.getItem("usuarioActivo");
	document.querySelector(
		".usuarioActivo"
	).textContent = `Usuario: ${nombreUsuario}`;

    if (!nombreUsuario.rol) {

        let comprobantesTab = document.querySelector('#comprobantes-tab');
        let menuTab = document.querySelector('#menu-tab');
        let empleadosTab = document.querySelector('#empleados-tab');

        comprobantesTab.disabled = true;
        menuTab.disabled = true;
        empleadosTab.disable = true;
    }
}

/* Guardar Mesas */

function guardarMesas() {
arrMesas;
console.log(arrMesas);
const saveTables = JSON.stringify(arrMesas)
console.log(saveTables);
localStorage.setItem("Plano",saveTables)
}

/* Cargar mesas */

function cargarMesas() {  
let getTables = localStorage.getItem("Plano");
    arrMesas = getTables ? JSON.parse(getTables) : [];

    console.log(arrMesas); 

    for (let i = 0; i < arrMesas.length; i++) {

        let arrLength = i + 1;
        let target = document.querySelector("#plano");
        let templateMesa = `<div class="modeloMesa" id="${arrLength}" onclick="abrirMesa(this)" draggable="true" ondragstart="drag(event)">MESA ${arrLength}</div>`;
        let mesaExistente = target.querySelector(`.grilla${arrLength}`);

        if (mesaExistente) {
            mesaExistente.innerHTML += templateMesa;
        } else {
            popDinamico("Limite de mesas alcanzado.");
            toggleVis("popUpdinamico");
            intervalo("popUpdinamico");
        }
    }
}
cargarMesas()

/* Guardar posicion de las mesas */

function guardarEstructura() {
    const elementoHtml = document.getElementById('plano');
    const estructuraHtml = {
        contenido: elementoHtml.innerHTML
    };

    const estructuraJSON = JSON.stringify(estructuraHtml);
    localStorage.setItem('htmlContent', estructuraJSON);
}

/* Cargar posicion de las mesas */

function cargarEstructura() {
    const cargarEstructura = localStorage.getItem('htmlContent');

if (cargarEstructura) {
    const parseData = JSON.parse(cargarEstructura);
    const targetElement = document.getElementById('plano');
    targetElement.innerHTML = parseData.contenido;

        arrMesas = []; 
        meserosPorMesa = [];
        const mesas = targetElement.querySelectorAll('.modeloMesa');

        mesas.forEach((mesa) => {
            arrMesas.push([]);
            meserosPorMesa.push(null);
        });
    }
}

/* Resetear Plano */

function confirmarReset() {
    Swal.fire({
        title: false,
        html: `
          <div class="popUpform animate__animated animate__zoomIn" draggable="true" ondragstart="drag(event)" id="mydiv">
            <div style="display: flex; flex-direction: row;">
              <div class="title-bar" id="mydivheader">
                <div class="title-bar-text innerHeader" style="margin:0 12rem 0 0;padding:0;">
                  <img src="img/favicon2.png" alt="" class="innerFavicon">
                  MiBar - Sistema de gestión Gastronomica
                </div>
                <div class="title-bar-controls">
                  <button type="button" aria-label="Close" class="cancelarRegistro" style="height:16px;width:14px;margin-top:3px;"></button>
                </div>
              </div>
            </div>
            <fieldset class="popUpset">
              <div class="popUp">
                <img src="img/LOGO MIBAR.png" alt="" class="logoMibarpop">
                <div style="text-align: center;">
                  <div class="popForm">
                    <p class="popupText" style="width:15rem; white-space: nowrap">Seguro que quieres reiniciar el plano?</p>
                    <p class="popupText"> Esta acción no se puede deshacer.</p>
                  </div>
                  <div style="margin-top:1rem;">
                    <button id="confirmBtn" class="swalcustomconfirm">OK</button>
                    <button id="cancelBtn" class="swalcustomcancel">Cancel</button>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        `,
        showCancelButton: false,
        showConfirmButton: false,
        customClass: {
            popup: 'swal2pop2'
        },
        didOpen: () => {
          dragElement(document.getElementById('mydiv'));

          document.getElementById('confirmBtn').addEventListener('click', function() {
            resetPlano();
          });

          document.getElementById('cancelBtn').addEventListener('click', function() {
            Swal.close();
          });

          let btnCerrar = document.querySelectorAll('.cancelarRegistro');
          btnCerrar.forEach(btn => {
            btn.addEventListener('click', () => {
              Swal.close(); 
            });
          });
        }
    });
}


function resetPlano() {
    localStorage.removeItem("Plano");
    localStorage.removeItem("htmlContent");
    location.reload()
}


usuarioIniciado()

/* ############# Funcion para crear Mesa nueva ########## */

async function crearMesa() {
	let nuevaMesa = [];

    if (arrMesas.length >= 63) {
        popDinamico("Limite de mesas alcanzado.");
        toggleVis("popUpform");
        intervalo("popUpform");
        return;
    }

	let arrLength = arrMesas.length + 1;
	arrMesas.push(nuevaMesa);
    meserosPorMesa.push(null);
    console.log(meserosPorMesa);
    
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
    guardarMesas() 
	return arrLength;
}

/* Elegir usuario al abrir mesa */

async function elegirUsuario() { 

	const inputOptions = usuariosRegistrados.reduce((options, usuarioObj) => {
		options[usuarioObj.usuario] = usuarioObj.usuario;
		return options;
	}, {});

	const { value: selectedUser } = await Swal.fire({

		customClass: {
			container: '...',
			popup: 'swal2pop',
			header: '...',
			title: 'swal2-title',
			closeButton: '...',
			icon: '...',
			image: '...',
			htmlContainer: '...',
			input: '...',
			inputLabel: '...',
			validationMessage: 'swal-valMsg',
			actions: '...',
			confirmButton: 'swalBtn',
			denyButton: 'swalBtn',
			cancelButton: 'swalBtn',
			loader: '...',
			footer: '....',
			timerProgressBar: '....',
		},

		title: "Mozo:",
		input: "select",
		inputOptions: inputOptions,  
		inputPlaceholder: "Selecciona un mozo",
		showCancelButton: true,
		inputValidator: (value) => {
			return new Promise((resolve) => {
				if (value) {
					resolve();
				} else {
					resolve("Mozo no seleccionado"); 
				}
			});
		}
	});
	return selectedUser;
}

/* #############  Funcion para abrir una mesa y agregar articulos a la mesa seleccionada ############# */

async function abrirMesa(mesa) {	

    let mesaSelec = parseInt(mesa.id);
    let eleccion = mesaSelec - 1;
    console.log("Ingresaste a la mesa " + (eleccion + 1));	

    const mesaOcupada = arrMesas[eleccion] && arrMesas[eleccion].length > 0;  
    
        if (!meserosPorMesa[eleccion]) {
        meserosPorMesa[eleccion] = await elegirUsuario();
        if (!meserosPorMesa[eleccion]) {
            return
    }
} 

let mesaDiv = document.getElementById(mesa.id);

if (!mesaOcupada) {
    mesaDiv.style.backgroundColor = '#EF7D7D';
    mesaDiv.style.borderColor = '#FF5E5E';
} else {
    mesaDiv.style.backgroundColor = 'rgb(111, 212, 111);';
}

mostrarMesa()

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


async function renderMesa(eleccion) {

    let mesaHeader = document.querySelector(".mesaHeader");
    let numeroMesa = parseInt(eleccion) + 1;
    mesaHeader.innerHTML = `
        <div class="title-bar-text">SALON</div>
        <div class="title-bar-text">MESA #${numeroMesa}</div>
        <div class="title-bar-text">MOZO: ${meserosPorMesa[eleccion]} </div>
        <div class="title-bar-controls">
            <button aria-label="Close" class="escMesa" onclick="ocultarMesa()"></button>
        </div>
    `;

    let contenidoArr = document.querySelector(".contenidoMesa");
    let getData = arrMesas[eleccion];
    contenidoArr.innerHTML = "";

    let contenidoMesa = "";
    getData.forEach((obj) => {
        contenidoMesa += `
            <tr>
                <td>${obj.id}</td>
                <td><li>${obj.articulo}</li></td>
                <td>${obj.cantidad}</td>
                <td>${obj.precio}</td>
                <td>${obj.precio * obj.cantidad}</td>
            </tr>
        `;
    });
    contenidoArr.innerHTML = contenidoMesa;

    let totalOriginal = 0;
    arrMesas[eleccion].forEach((articulo) => {
        totalOriginal += articulo.precio * articulo.cantidad;
    });

    let totalDescontado = totalOriginal;
    let porcentajeDescontado = 0;

    if (getData.totalDescontado !== undefined && getData.totalOriginal !== undefined && getData.porcentajeDescontado !== undefined) {
        porcentajeDescontado = getData.porcentajeDescontado;
        totalDescontado = totalOriginal - (totalOriginal * (porcentajeDescontado / 100));
        
    }

    let mesaTotal = document.querySelector('.mesaTotal');
    mesaTotal.innerHTML = `
        <li><b>Monto: $${totalOriginal.toFixed(2)}</b></li>
        <li><b>Descuento: ${porcentajeDescontado}%</b></li>
        <li><b>Total: $${totalDescontado.toFixed(2)}</b></li>
    `;

    resaltar();
    prepararBotones(eleccion);
}

function aplicarDescuento(eleccion, porcentajeDescontado) {
    let mesaSeleccionada = arrMesas[eleccion];
    let totalOriginal = mesaSeleccionada.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    let totalDescontado = totalOriginal - (totalOriginal * (porcentajeDescontado / 100));

    mesaSeleccionada.totalDescontado = totalDescontado;
    mesaSeleccionada.totalOriginal = totalOriginal;
    mesaSeleccionada.porcentajeDescontado = porcentajeDescontado;

    renderMesa(eleccion);
}

/* ############## Conseguir el objeto-evento ############# */

function escucharEvento(event) {
    let action = event.currentTarget.value;
    console.log("Button pressed: " + action);
    const eleccion = event.currentTarget.dataset.eleccion; 
    console.log(eleccion)
    modCantidades(action, eleccion);
}


/* ############## limpiar listeners ############# */

function prepararBotones(eleccion) {
    let btnValue = document.querySelectorAll('.panelBtn');
    btnValue.forEach(btn => {
        btn.dataset.eleccion = eleccion;

        btn.removeEventListener('click', escucharEvento);
        
        btn.addEventListener('click', escucharEvento);
    });
}


/* ############## funcion para modificar valores en la mesa ############# */


async function modCantidades(action, eleccion, mesa) {
    let mesaTotal =  document.querySelector('.mesaTotal')

    const mesas = Array.from(document.querySelectorAll('.modeloMesa'));

    mesas.sort((a, b) => {
                return parseInt(a.id) - parseInt(b.id);
            });

    const mesaDiv = mesas[eleccion];

    if (action === "mozo") {
        const nuevoMozo = await elegirUsuario();
        if (nuevoMozo) {
            meserosPorMesa[eleccion] = nuevoMozo;
            renderMesa(eleccion); 
        }
        return;
    }

    if (action === "desc") {     

        const { value: porcentajeDescontado } = await Swal.fire({
            title: 'Ingresa un porcentaje a descontar (0-100)',
            input: 'number',
            inputAttributes: {
                min: 0,
                max: 100,
                step: 1
            },
            inputValue: "",
            confirmButtonText: 'Apply',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (value === '' || isNaN(value) || value < 0 || value > 100) {
                    return 'Ingresa un porcentaje a descontar.';
                }
            }
        });

        if (porcentajeDescontado === undefined) {
            return;
        }

        aplicarDescuento(eleccion, porcentajeDescontado);
        console.log(mesaTotal)            

        let total = mesaSeleccionada.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        let discountAmount = (porcentajeDescontado / 100) * total;
        let totalDescontado = total - discountAmount;
        mesaSeleccionada.totalDescontado = totalDescontado;
        mesaSeleccionada.totalOriginal = total;
        mesaSeleccionada.porcentajeDescontado = porcentajeDescontado;

        console.log(`Discount applied: ${porcentajeDescontado}%`);
        console.log(`Original total: $${total.toFixed(2)}`);
        console.log(`Discounted total: $${totalDescontado.toFixed(2)}`);

        renderMesa(eleccion); 
    }  

    if (action === "anular") {
        arrMesas[eleccion] = [];
        meserosPorMesa[eleccion] = ""
        mesaDiv.style.backgroundColor = 'rgb(111, 212, 111)';
        mesaDiv.style.borderColor = 'rgb(111, 212, 111)';
    }

    if (action === "factB") {        
        mesasFactB.push(arrMesas[eleccion])
        totalFactB = sumTotal(mesasFactB);
        console.log("Total ventas Fact B: " + totalFactB);
        console.log("Total ventas Fiscal: " + totalFiscal);
        totalSales = totalFactB + totalFiscal;
        console.log("Ventas totales: " + totalSales);
        mesaDiv.style.backgroundColor = 'rgb(111, 212, 111)';
        mesaDiv.style.borderColor = 'rgb(111, 212, 111)';
        arrMesas[eleccion] = [];
        meserosPorMesa[eleccion] = ""
        ocultarMesa()
        renderFacturacion()
    }

    if (action === "fiscal") {
        mesasFiscal.push(arrMesas[eleccion])
        totalFiscal = sumTotal(mesasFiscal);
        console.log("Total ventas Fact B: " + totalFactB);
        console.log("Total ventas Fiscal: " + totalFiscal);
        totalSales = totalFactB + totalFiscal;
        console.log("Ventas totales: " + totalSales);
        mesaDiv.style.backgroundColor = 'rgb(111, 212, 111)';
        mesaDiv.style.borderColor = 'rgb(111, 212, 111)';
        arrMesas[eleccion] = [];
        meserosPorMesa[eleccion] = ""
        ocultarMesa()
        renderFacturacion()
    }

    if (!artResaltado) {
        console.log("No item highlighted!");
        return;
    }

    const mesaSeleccionada = arrMesas[eleccion];
    const itemIndex = mesaSeleccionada.findIndex(item => item.articulo.trim() === artResaltado);

    if (itemIndex !== -1) {
        resaltarUltArt(artResaltado);
        if (action === "+") {
            mesaSeleccionada[itemIndex].cantidad += 1; 
            resaltar(mesaSeleccionada[itemIndex])
          
        } else if (action === "-") {
            if (mesaSeleccionada[itemIndex].cantidad > 0) {
                mesaSeleccionada[itemIndex].cantidad -= 1; 
            }
            if (mesaSeleccionada[itemIndex].cantidad === 0) {
                mesaSeleccionada.splice(itemIndex, 1);
            } 
            } else if (action === "borrar") {
                mesaSeleccionada.splice(itemIndex, 1);
            } else if (action === "trans") {
                
                const itemIndex = mesaSeleccionada.findIndex(item => item.articulo.trim() === artResaltado);
                if (itemIndex !== -1) {

                    const { value: destino} = await Swal.fire({
                        title: 'Ingresa numero de mesa destino:',
                        input: 'number',
                        inputAttributes: {
                            min: 0,
                            max: arrMesas.length,
                            step: 1
                        },
                        inputValue: "",
                        confirmButtonText: 'Apply',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                        inputValidator: (value) => {
                            if (value === '' || isNaN(value) || value < 1 || value > arrMesas.length) {
                                return 'Ingresa un numero valido.';
                            }
                        }
                    });
                    const mesaDestino = destino - 1;                    
                    
                    if (isNaN(mesaDestino) || mesaDestino < 0 || mesaDestino >= arrMesas.length) {
                        console.log("Numero de mesa invalido.");
                        return;
                    }        
                    const moverArticulo = mesaSeleccionada.splice(itemIndex, 1)[0];                    
                    arrMesas[mesaDestino].push(moverArticulo);
                    renderMesa(eleccion)
                } 
            }
        } 
        if (action === "trans") {
            renderMesa(destino);
        }
        renderMesa(eleccion);    
        resaltar(artResaltado);        
    }          

function sumTotal(mesasArray) {
    let total = 0;
    mesasArray.forEach(mesa => {
        mesa.forEach(item => {
            total += item.precio; 
        });
    });
    return total;
}


/* ############## Funcion para cargar el menu ############# */

async function renderMenu(eleccion, selectedRubro) {
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
                let selectAuto = arrMesas[eleccion].slice(-1)
                console.log(selectAuto);
                
                console.log(`Artículo ${artIngresado.articulo} agregado a la mesa ${eleccion + 1}`);
                renderMesa(eleccion);
                resaltarUltArt(arrMesas[eleccion]);
            }
        };
    });
}

function removerUltResaltar() {
    const allItems = document.querySelectorAll('li');
    allItems.forEach(item => {
        item.classList.remove('highlighted');
    });
}

function resaltarUltArt(mesa) {
    if (mesa.length > 0) {
        const ultArt = mesa[mesa.length - 1];
        const liTags = document.querySelectorAll('li');

        removerUltResaltar();

        liTags.forEach(item => {
            if (item.textContent.includes(ultArt.articulo)) {
                item.classList.add('highlighted');
                artResaltado = item.textContent.trim();
                console.log("Último objeto resaltado:", item.textContent);
            }
        });
    }
}

/* Funcion para bloquear y desbloquear el plano */

let bloquearPlano = document.querySelector(".lock");

function cambiarCandado() {
	bloquearPlano.addEventListener("click", () => {
        console.log("Abri el candado, move las mesas y cerralo para guardar la posicion.");
        
        const lockText = document.querySelector('.estadoCandadotxt');
        const lockFixedsize = document.querySelector('.lock');
		let estadoCandado = bloquearPlano.src;

		/*Selector de classes que "empiezan con" https://www.w3schools.com/cssref/sel_attr_begin.php */
		let mesasVisibles = document.querySelectorAll('[class^="grilla"]');
		const sumarMesa = document.querySelector(".addTable");
        const sumarMesaTxt = document.querySelector(".btnPlus p")
        const restaurarPlano = document.querySelector(".restorePlane")

		if (estadoCandado.includes("Close")) {
			candadoPlano = document.querySelector(".lock").src = "Open.png";
            lockFixedsize.style.width = "23px";
            lockFixedsize.style.height = "23px";
            sumarMesa.style.height = "25px";
            sumarMesa.style.width = "25px"
            sumarMesaTxt.style.visibility = "visible";
			sumarMesa.style.visibility = "visible";
            restaurarPlano.style.display = "block";
            lockText.innerHTML = "Bloquear plano"
			mesasVisibles.forEach((mesa) => {
				mesa.style.visibility = "visible";
			});
		} else if (estadoCandado.includes("Open")) {
			candadoPlano = document.querySelector(".lock").src = "Close.png";
            lockFixedsize.style.width = "19px";
            lockFixedsize.style.height = "23px";
            sumarMesa.style.height = "25px";
            sumarMesa.style.width = "25px"  
            sumarMesaTxt.style.visibility = "hidden";
			sumarMesa.style.visibility = "hidden";
            restaurarPlano.style.display = "none";
            lockText.innerHTML = "Desbloquear plano"
			mesasVisibles.forEach((mesa) => {
				mesa.style.visibility = "hidden";
			});
            guardarEstructura();
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
    setInterval(cargarComprobantes, 2000)
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

function resaltar(articulo) {

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

    const objAresaltar = Array.from(liTags).find(item => item.textContent.trim() === articulo);
    
    if (objAresaltar) {
        objAresaltar.classList.add('highlighted');
        artResaltado = articulo;
        console.log("Objeto seleccionado:", articulo);
    }
}

document.addEventListener('DOMContentLoaded', () => {    
resaltar();
arbolMenu();
cargarEstructura()
usuarioIniciado()
});