
/* Tests del cursor */
/* Fuente: https://stackoverflow.com/questions/4564251/change-the-mouse-pointer-using-javascript */

let elementToChange = document.getElementsByTagName("body")[0];
elementToChange.style.cursor = "url('test2.png'), default";

let style = document.createElement('style');
style.innerHTML = `
    body, button {
        cursor: url('./test2.png'), default;
    }
`;
document.head.appendChild(style);
/* % CPU random */

function usoCPU() {

	let CpuUsage = Math.floor(Math.random() * 101)
	let randomCPU = document.querySelectorAll('.cpu')

	randomCPU.forEach((cpu) => {
			cpu.innerHTML = `CPU Usage: ${CpuUsage}%`
	})
}
setInterval(usoCPU, 2000)

/* Draggear ventana */
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

document.querySelectorAll('table.interactive').forEach(element => {
    element.addEventListener('click', (event) => {
      const row = event.path.find(element => element.tagName === 'TR' && element.parentElement.tagName === 'TBODY');
      if (row) {
        row.classList.toggle('highlighted');
      }
    })
  });
