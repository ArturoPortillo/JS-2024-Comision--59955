

/* #############  PopUp dinamico ############# */

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
              <p class="popupText">${texto}</p>
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

/* Tutorial */

function tutorial() {
	let popupDinamico = document.querySelector('.popupDinamico')
	popupDinamico.innerHTML = `
          <div class="popUpform animate__animated animate__zoomIn" draggable="true" ondragstart="drag(event)" id="mydiv">
            <div class="window">
              <div class="title-bar" id="mydivheader">
                <span class="labelContainer">
                  <img src="img/favicon2.png" alt="" class="innerFavicon">
                  <div class="title-bar-text" style="white-space: nowrap">MiBar - Sistema de gestión Gastronomica</div>
                </span>
                <div class="title-bar-controls">
                  <button aria-label="Close" style="transform:translateX(-25%)" class="cancelarRegistro"></button>
                </div>
              </div>
              <img src="img/tutorial.png" alt="" class="tutorialImg">
            </div>
          </div>
    </div>
	`
	dragElement(document.getElementById("mydiv"));
	popupDinamico
	toggleVis("popUpform")
	let btnCerrar = document.querySelectorAll('.cancelarRegistro');
    btnCerrar.forEach(btn => {
        btn.addEventListener("click", function() {
            toggleVis('popUpform');
        });
    });
}

/* Tests del cursor */

let style = document.createElement('style');
style.innerHTML = `
    body, button {
        cursor: url('windows98.cur'), default;
    }
`;
document.head.appendChild(style);


/* % CPU random */

function usoCPU() {

	let CpuUsage = Math.floor(Math.random() * 101)
	let randomCPU = document.querySelectorAll('.cpu')

    let imageIndex = Math.floor(CpuUsage / 10);
	
    randomCPU.forEach((cpu) => {		
		cpu.innerHTML = `<img src="img/${imageIndex}.0.ico" alt=""> CPU Usage: ${CpuUsage}%`;

    });
}
setInterval(usoCPU, 3000)

/* Test */

let comprobantesInterval; 

function cargarComprobantes() {
    let loadingMsg = document.querySelector('#comprobantes-tab')

    let imgIndex = Math.floor(Math.random() * 2) + 1; 
/*     let boomIndex = Math.floor(Math.random() * 3) + 1;
    let boomIndex2 = Math.floor(Math.random() * 3) + 1; 
    let boomIndex3 = Math.floor(Math.random() * 3) + 1; 
    let boomIndex4 = Math.floor(Math.random() * 3) + 1; */
    let cmdErr = Math.floor(Math.random() * 4) + 1;
    let cmdErr2 = Math.floor(Math.random() * 4) + 1;
    let colorSwitch = Math.floor(Math.random() * 3) + 1; 
    let colorSwitch2 = Math.floor(Math.random() * 3) + 1;
    let colorSwitch4 = Math.floor(Math.random() * 4) + 1;

    loadingMsg.innerHTML = `
<!--             <img src="img/${boomIndex}.ico" alt="" class="boomImg"> -->

<!--             <img src="img/cmd${cmdErr}.ico" alt="" style="margin-left:10rem;"> -->
            <label for="" class="labelContainer" style="flex-direction:column;">
<!--             <img src="img/${boomIndex2}.ico" alt="" style="margin-left:10rem;"> -->
              <img src="img/err${imgIndex}.ico" alt="" class="glitchedImg">
<!--               <img src="img/cmd${cmdErr2}.ico" alt="" style="margin-right:10rem;"> -->
              <p style="font-family:deadcrt;" class="fontColor${colorSwitch4}"><b>ERROR AL CARGAR CONTENIDO.<!-- <img src="img/${boomIndex4}.ico" alt="" class="boomImg"> --></b></p>
              <div>
                <p style="font-family:deadcrt;" class="fontColor${colorSwitch2}"><b>CONTACTE CON EL ADMINISTRADOR.</b></p>
              </div>
            </label>
<!--             <img src="img/${boomIndex3}.ico" alt=""> -->
    `
}

/* Hacer visible/invisible nuestra ventana de registro(codigo reciclable) */

function toggleVis(clase) {

	let popUp = document.querySelector(`.${clase}`)
	console.log(popUp)

    if (popUp) {
		if (popUp.classList.contains('vis')) {
        popUp.classList.remove('vis');
        popUp.classList.add('invis');
    } else {
        popUp.classList.remove('invis');
        popUp.classList.add('vis');
    }  
	}else {
        console.log(`No se encontro la clase: '${clase}'`);
    }
};

function intervalo(clase) {
	setTimeout(() => toggleVis(clase), 1000);
}


/* Ejecutar tutorial/legend */

function help() {
	tutorial()
}

window.onkeydown = (evt) => {
    switch (evt.keyCode) {
      case 112:
        evt.preventDefault();
        help()
        break;
      default:
        return;
    }
  };

  
/* Ocultar mesa del plano */

const btnCerrar = document.querySelector('.ocultarMesa');
btnCerrar.style.display = "none";

function ocultarMesa() {
	const btnCerrar = document.querySelector('.ocultarMesa');	

    if (btnCerrar.style.display === "none") {
        btnCerrar.style.display = "flex";
        btnCerrar.style.visibility = "visible";
    } else {
        btnCerrar.style.display = "none";
        btnCerrar.style.visibility = "hidden";
    }
}

function mostrarMesa(){
	const btnCerrar = document.querySelector('.ocultarMesa');	

    if (btnCerrar.style.display === "visible") {
		btnCerrar.style.display = "none";
        btnCerrar.style.visibility = "hidden";

    } else {
		btnCerrar.style.display = "flex";
        btnCerrar.style.visibility = "visible";
    }
}

/* Hora */

const paginaActual = window.location.href; 

function fechaSistema() {
	const date = new Date();	
		document.querySelector(".fecha").textContent = `Fecha: ${date.toLocaleDateString()} | Hora: ${date.toLocaleTimeString()};`;	
}


/* Draggear ventana */

/* Fuente: https://www.w3schools.com/HOWTO/tryit.asp?filename=tryhow_js_draggable */
//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		/* if present, the header is where you move the DIV from:*/
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - pos2 + "px";
		elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}


