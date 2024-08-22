
/* Solamente un pequeño script para evitar que el mensaje "Para iniciar sesion por primera vez debes registrarte." aparezca sin importar si estamos en la pagina de inicio o dentro de la plataforma, con esto logro que aparezca solamente en index.html */

const paginaActual = window.location.href;

if (paginaActual.includes('/index.html')) {
    alert("Bienvenido a MiBar! Sistema de gestion gastronomica" + "\n\n" + "Para iniciar sesion por primera vez debes registrarte.");
} else {
    alert("Bienvenido a MiBar! Sistema de gestion gastronomica" + "\n\n" + "El sistema se encuentra en mantenimiento, vuelve mas tarde.");
}

/* Variable usuario y contraseña */

let usuario = "";
let contrasena = "";
let idEmpleado = 0;
let rol = '';

/* Funcion constructora de usuario estableciendo su rol */

function Empleado(usuario, contrasena, idEmpleado, rol) {
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.idEmpleado = idEmpleado;
    this.rol = rol;
}

/* Base de datos de usuarios registrados */

const usuariosRegistrados = [{usuario: "admin", contrasena: "admin", idEmpleado: 0, rol: "admin"}]


/* Funcion de registro */

const empleado = {
    usuario: "",
    contrasena: "",
    idEmpleado: 0,
    rol: "",
};  


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

    let nuevoUsuario = prompt("Ingresa nuevo nombre de usuario: ").toLowerCase().replace(/\s+/g, '');
    let contrasenaUsuario = prompt("Ingresa un PIN: ").toLowerCase().replace(/\s+/g, '');
    
    if(isNaN(nuevoUsuario) && !isNaN(contrasenaUsuario)) {
        console.log("Usuario no contiene valores numericos."+"\n\n"+"La contraseña es un valor numerico, no contiene letras."); 

        usuario = nuevoUsuario;
        contrasena = contrasenaUsuario;
        idEmpleado = +idEmpleado + 1;
        rol = '';

        console.log("Usuario: " + usuario +  "\n" + "Contraseña: " + contrasena);
        console.log("Usuario registrado exitosamente");   

        empleado.usuario = usuario;
        empleado.contrasena = contrasena;
        empleado.idEmpleado = idEmpleado;
        empleado.rol = rol;

        const nuevoEmpleado = new Empleado(usuario, contrasena, idEmpleado, rol);
        usuariosRegistrados.push(nuevoEmpleado)
        console.log(nuevoEmpleado)
        console.table(usuariosRegistrados)

    } else if (!isNaN(nuevoUsuario)){
        alert("Error al registrar usuario, usuario no debe contener valores numericos");
        console.log("Error al registrar usuario, usuario no debe contener valores numericos");
    } else if (isNaN(contrasenaUsuario)){
        alert("Error al registrar usuario, PIN debe ser un valor numerico.");
        console.log("Error al registrar usuario, PIN debe ser un valor numerico.");
    }
}

/* Funcion inicio de sesion */

    function inicioSesion() {

        let validarDatos = false;
        let usuarioActivo;
        
        console.table("Los usuarios registrados son:" + usuariosRegistrados)
        
        for (let i = 0; i < 3; i++){

            let campoUsuario = prompt("Ingresa nombre de usuario: ").toLowerCase().replace(/\s+/g, '');
            let campoContrasena = prompt("Ingresa contraseña: ").toLowerCase().replace(/\s+/g, ''); 


            usuariosRegistrados.forEach(usuario => {

                if (usuario.usuario == campoUsuario && usuario.contrasena == campoContrasena) {
                    alert("Ingresaste correctamente")
                    usuarioActivo = campoUsuario;
                    console.log("el usuario activo es: "+ usuarioActivo)
                    window.location.href = "platform.html";             
                    validarDatos = true;
                }
            })

            if (validarDatos) { 
                break;
            } else if (i<2) {
                alert("Usuario no encontrado o contraseña incorrecta. Te quedan " + (2 - i) + " intentos.");
            } else {
                alert("Usuario no encontrado o contraseña incorrecta. Superaste el límite de intentos, intenta más tarde.");
            }
            
        }         
        return usuarioActivo;
    }

/* Funcion constructora del menu*/

function Producto (id, articulo, precio) {
    this.id= id;
    this.articulo = articulo;
    this.precio = precio;
}

const datosMenu = [{articulo: "Café con leche", precio: 3100, id: 1}
];

let articulo;
let precio = 0;
let id = 1;



/* Funcion para ver el menu disponible */

function menuDisponible() {
    console.log(`Articulos disponibles: `);            
    datosMenu.forEach((menu)=>{
        const contenido=`ID: ${menu.id}\nArticulo: ${menu.articulo}\nPrecio: $${menu.precio}`
        console.log(contenido)
    });
    return datosMenu;
}
/* FUNCION CON .MAP QUE REGRESABA EL ARRAY COMO STRING Y NO ME SERVIA PARA LA FUNCION abrirMesa() */
/* function menuDisponible() {

    console.log(`Articulos disponibles: `);            
    const menu = datosMenu.map((menu)=>{
            const contenido=`ID: ${menu.id}\nArticulo: ${menu.articulo}\nPrecio: $${menu.precio}`
            console.log(contenido)
                return contenido;
            });
    return menu;
} */


/* Funcion para cargar Articulos al array de menu */

function cargarMenu() {

    while (true){
        let nuevoArticulo = prompt("Ingresa un nuevo articulo: " + "\n\n" + "Ingresa '0' para salir.").trim();
        
        if (nuevoArticulo === "0") {
            console.log("No se han cargado más articulos.")
            break;
        } 
        
        let nuevoPrecio = parseInt(prompt("ingresa precio del articulo: " + "\n\n" + "Ingresa '0' para salir."));
        
        if (nuevoArticulo === "0") {
            console.log("No se han cargado más articulos.")
            break;
        } 
                
        if (!isNaN(nuevoArticulo) || isNaN(nuevoPrecio)) {
            console.log("Ingresa datos validos")
            break;
        } else {
                    
        id += 1;
        const producto = {
            articulo: nuevoArticulo,
            precio: nuevoPrecio,
            id: id
        };

        datosMenu.push(producto);
        console.table(datosMenu);
        menuDisponible()
        }
        }
    };

/* Array de mesas */

    const arrMesas = [[],[],[]]
    

function crearMesa() {
    let nuevaMesa = [];
    let arrLength = arrMesas.length + 1;
    arrMesas.push(nuevaMesa)
    console.log("creaste una nueva mesa.")
    console.log("Numero de mesa creada: " + arrLength)
    console.log(arrMesas)
}

function recorrerMesas() {
    console.log(`Las mesas disponibles son: `)  
    arrMesas.forEach((arr)=>{
        console.log(arr)
    });
    return arrMesas
}


function abrirMesa() {

    let mesaSelec = parseInt(prompt("Indica el numero de mesa que deseas abrir: "))

        if (isNaN(mesaSelec) || mesaSelec < 1 || mesaSelec > arrMesas.length) {
            console.log(`Ingresa un numero valido de mesa`)
            return;
        }
    let eleccion = mesaSelec - 1;

    console.log("Ingresaste a la mesa "+mesaSelec)
    
    console.log("Ingresa el ID del articulo que deseas agregar:");
    const menu = menuDisponible();
    let idArticulo = parseInt(prompt("Ingresa el ID del articulo que deseas agregar:"));
    
    if (isNaN(idArticulo)) {
        console.log("El ID ingresado no es un número.");
        return;
    }

    const artIngresado = menu.find((producto) => producto.id === idArticulo);
    
    if (artIngresado) {
        console.log(`El ID ingresado es ${idArticulo}. Artículo: ${artIngresado.articulo}, Precio: $${artIngresado.precio}`);
        arrMesas[eleccion].push(artIngresado)
    } else {
        console.log("No se encontró ningún artículo con ese ID.");
    }
    console.table(arrMesas)
    }

/* FUNCIONES DE PESTAÑAS */

    document.addEventListener("DOMContentLoaded", function() {

        const tabs = document.querySelectorAll('li[role="tab"]');
    
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
                
            tab.setAttribute('aria-selected', 'true');
            });
        });
    });

    /* TEST */

    const date=new Date()
    
    if (paginaActual.includes('platform.html')) {
        document.querySelector('.fecha').textContent= `Fecha: ${date.toLocaleDateString()} | Hora: ${date.toLocaleTimeString()};`;

        alert("Abre la consola para acceder a las opciones disponibles")

        console.log(`
            
            Funciones disponibles dentro de la plataforma: 

            1. menuDisponible(): nos permite ver el listado de articulos disponibles.

            2. cargarMenu(): nos permite cargar articulos a nuestro menú.

            3. crearMesa(): nos permite agregar una mesa vacia a nuestro array de mesas.

            4. abrirMesa(): nos permite abrir una mesa y cargar articulos a una mesa.
            `)
    }

/*     document.querySelector('.usuarioActivo').textContent=`Usuario: ${usuarioActivo};`; */


/* Codigo viejo

Funcion de inicio de sesion 

PRIMER FUNCION DE INICIO DE SESION, REEMPLAZADA POR UNA QUE BUSQUE EL USUARIO DENTRO DE NUESTRO ARRAY DE USUARIOS.
    function inicioSesion() {

    for (let i = 0; i < 3; i++){
        let campoUsuario = prompt("Ingresa nombre de usuario: ").toLowerCase().replace(/\s+/g, '');
        let campoContrasena = prompt("Ingresa contraseña: ").toLowerCase().replace(/\s+/g, '');

            console.log("El usuario deberia ser: " + empleado.usuario);    
            console.log("Usuario ingresado: " + campoUsuario);
            console.log("La contraseña deberia ser: " + empleado.contrasena);    
            console.log("Contraseña ingresada: " + campoContrasena);

    if (campoUsuario === empleado.usuario && campoContrasena === empleado.contrasena){
        alert("Ingresaste correctamente.");
        window.location.href = "platform.html"; 
        console.log("Ingresaste correctamente");
        break;
    } else if (i<2){
        alert("Usuario no encontrado."+"\n"+"Te quedan " + (2 - i) + " intentos.");
        console.log("Usuario no encontrado");
    } else {
        alert("Usuario no encontrado."+"\n"+"Superaste el limite de intentos, intenta mas tarde.")
        }    
    }
} */


