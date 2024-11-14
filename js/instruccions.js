//Variable
let tancaFinestra = document.getElementById("tancaFinestra");

//evento para cerrar la ventana
tancaFinestra.addEventListener("click", tanca);

//función para cerrar la ventana de las instrucciones
function tanca() {
    window.close()
}