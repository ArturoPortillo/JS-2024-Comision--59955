

const mesasFactB = []; 
const mesasFiscal = [];
const totalCobrado = [];

let totalFactB = parseInt(0);
let totalFiscal = parseInt(0);


function renderFacturacion() {
    let totalSales = totalFactB + totalFiscal;

    let promedio = totalSales/(mesasFactB.length + mesasFiscal.length)

    let facturacion = document.querySelector('#facturacion-tab')
    console.log(facturacion);
    
    console.log(totalFactB);
    
    facturacion.innerHTML = "";
    
    facturacion.innerHTML += `
          <h1 class="facturacion-title">RESUMEN DE VENTAS</h1>
          
          <p class="facturacion-header">Ventas por comprobante</p>
          <hr class="solid">
          <div class="facturacionContainer">
            <div class="facturacion">
              <p>Fact B: <span>$</span>${totalFactB}</p>
              <p>Ticket Fiscal: <span>$</span>${totalFiscal}</p>

            </div>
            <div class="facturacion">
              <p><span class="hash">#</span>${mesasFactB.length}</p>
              <p><span class="hash">#</span>${mesasFiscal.length}</p>

            </div>
          </div>
          <p class="facturacion-header">Resumen ventas:</p>
          <hr class="solid">
          <div class="facturacionContainer">
            <div class="facturacion">
              <p>Total operaciones:</p>
              <p>Promedio por operacion:</p>
              <p>Total cobrado:</p>
            </div>
            <div class="facturacion">
              <p><span class="hash">#</span>${mesasFactB.length + mesasFiscal.length}</p>
              <p><span>$</span>${promedio}</p>
              <p><span>$</span>${totalSales}</p>
            </div>
          </div>
    `
}

