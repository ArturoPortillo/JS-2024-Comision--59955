/* ############# Funcion constructora del menu ############# */

function Producto(id, articulo, precio) {
	this.id = id;
	this.articulo = articulo;
	this.precio = precio;
}

/* funcion para restaurar el menu si lo modificamos/borramos */

function restaurarDB() {
	fetch('https://66ebf35e2b6cf2b89c5c91f8.mockapi.io/dataBaseapi')
    .then((response) => response.json())
    .then((data) => {

        let backup = document.querySelector('.backupmsg')
    
        datosMenu.length = 0;
        datosMenu.push(...data)
        console.log("Listado de menú recuperado.");
        arbolMenu()
        renderMenu()
        backup.innerHTML = `
        <div class="backupmsg">
            <img src="img/check-0.png" alt="" srcset="" class="icoSize">Menú original recuperado.
        </div>
`

	}).catch ((error) => {
        backup.innerHTML = `
        <div class="backupmsg">
            <img src="img/exclIcon" alt="" srcset="" class="icoSize">No se puede conectar a la base de datos.
        </div>
`
	});
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

/* Guardar Menú  y cargar Menu*/

function guardarMenu() {
	const menuJson = JSON.stringify(datosMenu)
	localStorage.setItem("menu", menuJson);
}

function descargarMenu() {

	if (localStorage.hasOwnProperty('menu')) {
	let menu = localStorage.getItem("menu");
	menu = JSON.parse(menu);
	datosMenu.splice(0, datosMenu.length, ...menu);
	console.log(datosMenu);
    }
} descargarMenu()




let articulo;
let precio = 0;
let id = datosMenu.length;


/* ############ Funcion para cargar Articulos al array de menu  ############# */

function cargarMenu() {
		let nuevoArtinput = document.querySelector('.nuevoArticulo')
		let nuevoPrecioinput = document.querySelector('.nuevoPrecio');
		let nuevoRubro = document.querySelector('.selectedRubro')
		console.log(nuevoRubro)
		
		let nuevoArticulo = nuevoArtinput.value.trim();
		console.log(nuevoArticulo)

		let nuevoPrecio = parseInt(nuevoPrecioinput.value);
		console.log(nuevoPrecio)

		let asignarRubro = document.querySelector('.selectedRubro').selectedOptions[0].value;
		console.log(asignarRubro)

        let cargarErr = document.querySelector('.cargarErrcontainer');

		if (nuevoArticulo == ""  || isNaN(nuevoPrecio) || asignarRubro == "") {
            cargarErr.innerHTML = `
                    <div class="cargarErr">
                        <img src="img/exclIcon.png" alt="" srcset="" class="icoSize">Ingresa datos válidos.
                    </div>
            `
			return;
		} else { 
			id += 1; 
			const producto = {
				articulo: nuevoArticulo,
				precio: nuevoPrecio,
				id: id,
				rubro: asignarRubro
			}; 	
			
			datosMenu.push(producto);
			console.table(datosMenu);
			cargarErr.innerHTML = `
                    <div class="cargarErr">
                        <img src="img/check-0.png" alt="" srcset="" class="icoSize">Producto cargado con exito.
                    </div>
            `
            guardarMenu()
			arbolMenu()
			
			document.querySelector('.cargarForm').onsubmit = e => {
				e.preventDefault();
				e.target.submit();
				e.target.reset();
				return false;
			};
		}

}

/* ############ Actualizar datos Arbol menu ############# */

async function arbolMenu() {
    
    let arbolMenu = document.querySelector('#arbolMenu');
    arbolMenu.innerHTML = "<summary>Lista de rubros</summary>";

    const ordenFijo = ['Cafeteria', 'Bebidas', 'Comida', 'Tortas', 'Entradas', 'Cervezas', 'Tragos'];

    const rubros = [...new Set(datosMenu.map((menu) => menu.rubro))].sort((a, b) => ordenFijo.indexOf(a) - ordenFijo.indexOf(b));	

    let nuevoArbol = "" 

    ordenFijo.forEach((rubro, index) => {

        let itemsDelRubro = datosMenu.filter((menu) => menu.rubro === rubro);

        let nuevaRama = `
        <ul>                 
            <details>
                <summary>${index + 1} - ${rubro}</summary>
                <ul>
                    ${itemsDelRubro.map((item) => `<li onclick="editarArticulo()">${item.articulo}</li>`).join('')}
                </ul>
            </details>
        </ul>`;
        nuevoArbol += nuevaRama;
    });
    arbolMenu.innerHTML += nuevoArbol;
    resaltar()
}


let actualizarArticulo = document.querySelector('.actualizarArticulo')

actualizarArticulo.addEventListener('click',editarArticulo)

/* ############ Editar Articulos  ############# */

function editarArticulo() {

    let buscar = document.querySelector('.barraBuscar');
    let resultado = document.querySelector('.resultado');
    let editarArt = document.querySelector('.editarArticulo');
    let editarPrecio = document.querySelector('.editarPrecio');
    let editarRubro = document.querySelector('.editRubro');
    let resForm = document.querySelector('.formularioEdit');


    function actualizarInputs(itemText) {
        const item = datosMenu.find(target => target.articulo.trim() === itemText.trim());
        if (item) {
            editarArt.value = item.articulo;
            editarPrecio.value = item.precio;
            editarRubro.value = item.rubro;

            editarArt.dataset.originalArticulo = item.articulo;
            editarPrecio.dataset.originalPrecio = item.precio;
            editarRubro.dataset.originalRubro = item.rubro;
        }
    }
    

    const index = datosMenu.findIndex(target => target.articulo.trim() === event.currentTarget.textContent.trim());

    if (index !== -1) {
        

        buscar.addEventListener('keyup', function() {
            let buscarArt = buscar.value.toLowerCase();
            let artBuscado = datosMenu.filter(producto => producto.articulo.toLowerCase().includes(buscarArt));

            let artEncontrado = artBuscado.map(producto => 
                `<ul><li>${producto.articulo}</li></ul>`
            ).join('');

            resultado.innerHTML = artEncontrado;


            document.querySelectorAll('.resultado li').forEach(item => {
                item.addEventListener('click', function () {
                    actualizarInputs(this.textContent);
                });
            });
            resaltar(); 
        });

        document.querySelectorAll('#arbolMenu li').forEach(item => {
            item.addEventListener('click', function () {
                actualizarInputs(this.textContent);
            });
        });


        actualizarInputs(datosMenu[index].articulo);


        editarArt.removeEventListener('input', editarArt);
        editarPrecio.removeEventListener('input', editarPrecio);
        editarRubro.removeEventListener('input', editarRubro);


        resForm.onsubmit = function (e) {
            e.preventDefault(); 


            const itemIndex = datosMenu.findIndex(target => target.articulo.trim() === editarArt.dataset.originalArticulo.trim());
            
            if (itemIndex !== -1) {

                datosMenu[itemIndex].articulo = editarArt.value;
                datosMenu[itemIndex].precio = parseFloat(editarPrecio.value) || 0;
                datosMenu[itemIndex].rubro = editarRubro.value;
                guardarMenu()

                console.log("Artículo actualizado:");
                console.table(datosMenu);
            }


            editarArt.value = '';
            editarPrecio.value = '';
            editarRubro.value = '';
            arbolMenu();

        };
    }
}

/* ############ Habilitar borrar articulos ############# */

function habilitarDel() { 
    let borrarArt = document.querySelector('.borrar')
    console.log(borrarArt)

    let checkStats = document.querySelector('.check')
    console.log(checkStats);

    let habilitarDel = document.querySelector('.habilitarDel')
    habilitarDel.disabled = false;

    if (checkStats.checked) {
        console.log("Esta chequeado");
        habilitarDel.disabled = false;
    } else {
        console.log("No esta chequeado");
        habilitarDel.disabled = true;
    }  
}

/* ############ Borrar articulos ############# */

function borrarArt(){

    let editarArt = document.querySelector('.editarArticulo')
    let checkStats = document.querySelector('.check')
    let habilitarDel = document.querySelector('.habilitarDel')
    console.log(checkStats);

    const index = datosMenu.findIndex((target) => target.articulo.trim() === editarArt.value.trim());

    if (index !== -1) {
        console.log("Match encontrado: ");
        console.log(datosMenu[index]);
        console.log("Ubicacion a borrar: ");        
        console.log(index);      
        console.log("Articulo a borrar");
        console.log(datosMenu[index].articulo);

        datosMenu.splice(index, 1); 
        console.log("Articulo borrado.");
        checkStats.checked = false;    
        habilitarDel.disabled = true;
        guardarMenu()
        arbolMenu()
        renderMenu()
    }
}