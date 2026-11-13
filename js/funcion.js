class LoteTela {

    constructor(id, tipoFibra, kilogramos) {

        this.id = id;
        this.tipoFibra = tipoFibra;
        this.kilogramos = kilogramos;
        this.agua = this.calcularAgua();
    }

    // Método para calcular el agua 

    calcularAgua() {

        let litros = 0;
        if (this.tipoFibra === "algodon") {
            litros = this.kilogramos * 10000;
        } else {
            litros = this.kilogramos * 300;
        }
        return litros;
    }
}


const botonCalcular = document.getElementById("btnCalcular");
const selectFibra = document.getElementById("tipoFibra");
const inputKilos = document.getElementById("kilosTela");
const textoAguaTotal = document.getElementById("aguaTotal");
const listaHistorial = document.getElementById("historialLotes");



botonCalcular.onclick = function() {

    const fibraSeleccionada = selectFibra.value;
    const cantidadKilos = Number(inputKilos.value);
    const historial = JSON.parse(localStorage.getItem("lotesTextil")) || [];
    const idUnico = "LOTE-" + (historial.length + 1);
    const nuevoLote = new LoteTela(idUnico, fibraSeleccionada, cantidadKilos);


    historial.push(nuevoLote);
    localStorage.setItem("lotesTextil", JSON.stringify(historial));


    inputKilos.value = "";
    actualizarPantalla();

};


function actualizarPantalla() {

    const historial = JSON.parse(localStorage.getItem("lotesTextil")) || [];
    listaHistorial.innerHTML = "";
    let acumuladoTotal = 0;

    // Recorrer el historial con un ciclo sencillo

    for (let i = 0; i < historial.length; i++) {
        const lote = historial[i];
        acumuladoTotal = acumuladoTotal + lote.agua;

        // Crear el elemento de la lista

        const item = document.createElement("li");
        item.className = "list-group-item bg-dark text-white d-flex justify-content-between align-items-center";
        item.innerHTML = `${lote.id} - ${lote.tipoFibra} (${lote.kilogramos} kg)  <strong>${lote.agua.toLocaleString()} Litros</strong>`;
        listaHistorial.appendChild(item);

    }

    // Modificar el textContent del total acumulado en el DOM

    textoAguaTotal.textContent = acumuladoTotal.toLocaleString();

}