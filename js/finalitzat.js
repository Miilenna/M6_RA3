let infoNavegador = navigator.userAgent;

if (infoNavegador.includes("Chrome")) {
    document.body.style.backgroundColor = "#a4eda5";
} else if (infoNavegador.includes("Mozilla")) {
    document.body.style.backgroundColor = "#ffa500";
}