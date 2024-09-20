function arbolEmpleados() {
    let arbolEmpleados = document.querySelector('.arbolEmpleados');

    arbolEmpleados.innerHTML = "<summary class='listaEmp'>Lista de empleados</summary>";
    

    let nuevoArbol = `
        <details id="listaEmpleados">
            <summary>Empleados</summary>
            <ul>
    `;
    
    usuariosRegistrados.forEach(usuario => {
        console.log(usuario.usuario);        
        nuevoArbol += `<li onclick="editarEmpleado()">${usuario.usuario}</li>`;
    });

    nuevoArbol += `
            </ul>
        </details>
    `;    
    arbolEmpleados.innerHTML += nuevoArbol;    
    resaltar();
} 

arbolEmpleados();

let actualizarEmpleado = document.querySelector('.actualizarEmpleado')
console.log(actualizarEmpleado);

actualizarEmpleado.addEventListener('click',editarEmpleado)

function editarEmpleado() {
    let editarEmpleadoInput = document.querySelector('.editEmpleado');
    let editarContrasenaInput = document.querySelector('.editContrasena');
    let editarRolSelect = document.querySelector('#editarRolSelect');
    let resForm = document.querySelector('.formEditempleado');

    function actInput(datoText) {
        console.log('actInput called with:', datoText);

        const dato = usuariosRegistrados.find(target => target.usuario.trim() === datoText.trim());
        console.log("Esto es un dato:", dato);

        if (dato) {
            console.log('User found:', dato);

            editarEmpleadoInput.value = dato.usuario;
            editarContrasenaInput.value = dato.contrasena;
            editarRolSelect.value = dato.rol.toLowerCase(); ;

            editarEmpleadoInput.dataset.originalUsuario = dato.usuario;
            editarContrasenaInput.dataset.originalContrasena = dato.contrasena;
            editarRolSelect.dataset.originalRol = dato.rol;
        }
    }

    document.querySelectorAll('#listaEmpleados li').forEach(item => {
        item.addEventListener('click', function () {
            actInput(this.textContent);
        });
    });

    resForm.onsubmit = function (e) {
        e.preventDefault();

        const originalUsuario = editarEmpleadoInput.dataset.originalUsuario.trim();
        const datoIndex = usuariosRegistrados.findIndex(target => target.usuario.trim() === originalUsuario);

        if (datoIndex !== -1) {
            usuariosRegistrados[datoIndex].usuario = editarEmpleadoInput.value.trim();
            usuariosRegistrados[datoIndex].contrasena = parseInt(editarContrasenaInput.value);
            usuariosRegistrados[datoIndex].rol = editarRolSelect.value.trim();
            console.log(usuariosRegistrados[datoIndex].rol);
            

            console.log("Empleado actualizado:");
            console.table(usuariosRegistrados);


            editarEmpleadoInput.value = '';
            editarContrasenaInput.value = '';
            editarRolSelect.value = '';

            arbolEmpleados();
        }
    };
}

function cargarEmpleado() {
    let nuevoEmpleadoinput = document.querySelector('.nuevoEmpleado')
    let nuevaContrasenainput = document.querySelector('.nuevaPass');
    let asignarRol = document.querySelector('.asignarRol')
    console.log(asignarRol)

    let nuevoEmpleado = nuevoEmpleadoinput.value.trim();
    console.log(nuevoEmpleado)

    let nuevaContrasena = parseInt(nuevaContrasenainput.value);
    console.log(nuevaContrasena)

    let nuevoRol = document.querySelector('.asignarRol').selectedOptions[0].value;
    console.log(nuevoRol)

    if (nuevoEmpleado == ""  || isNaN(nuevaContrasena) || nuevoRol == "") {
/*         cargarErr.innerHTML = `
                <div class="cargarErr">
                    <img src="exclIcon.png" alt="" srcset="" class="icoSize">Ingresa datos válidos.
                </div>
        ` */
        alert("TEST")
        return;
    } else { 
        const usuario = {
            usuario: nuevoEmpleado,
            contrasena: nuevaContrasena,
            rol: nuevoRol
        }; 	
        
        usuariosRegistrados.push(usuario);
        console.table(usuariosRegistrados);
        alert("Usuario cargado exitosamente.")
/*         cargarErr.innerHTML = `
                <div class="cargarErr">
                    <img src="check-0.png" alt="" srcset="" class="icoSize">Producto cargado con exito.
                </div>
        ` */
        arbolEmpleados()
        document.querySelector('.formcargarEmpleado').onsubmit = e => {
            e.preventDefault();
            e.target.submit();
            e.target.reset();
            return false;
        };
    }
}


function habilitarDeleteEmpleado() { 
    let borrarEmpleado = document.querySelector('.borrarEmpleado')
    console.log(borrarEmpleado)

    let checkStats = document.querySelector('.checkEmp')
    console.log(checkStats);

    let habilitarDelEmpleado = document.querySelector('.habilitarDeleteEmp')
    habilitarDelEmpleado.disabled = false;

    if (checkStats.checked) {
        console.log("Esta chequeado");
        habilitarDelEmpleado.disabled = false;
    } else {
        console.log("No esta chequeado");
        habilitarDelEmpleado.disabled = true;
    }  
}

function borrarEmpleado(){

    let editarEmpleadoInput = document.querySelector('.editEmpleado');
    let checkStats = document.querySelector('.checkEmp')
    let habilitarDelEmpleado = document.querySelector('.habilitarDeleteEmp')
    console.log(checkStats);

    const index = usuariosRegistrados.findIndex((target) => target.usuario.trim() === editarEmpleadoInput.value.trim());

    if (index !== -1) {
        console.log("Match encontrado: ");
        console.log(usuariosRegistrados[index]);
        console.log("Ubicacion a borrar: ");        
        console.log(index);      
        console.log("Articulo a borrar");
        console.log(usuariosRegistrados[index].usuario);

        usuariosRegistrados.splice(index, 1); 
        console.log("Articulo borrado.");
        checkStats.checked = false;
        habilitarDelEmpleado.disabled = true;
        arbolEmpleados()
    }
    fetchData()
}


