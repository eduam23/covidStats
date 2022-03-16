window.onload = iniciar;

function iniciar() {
    let btnCargar = document.getElementById("btnCargar");
    btnCargar.addEventListener("click", clickBoton);

    let fecha = new Date(); //Fecha actual
    let mes = fecha.getMonth() + 1; //obteniendo mes
    let dia = fecha.getDate(); //obteniendo dia
    let ano = fecha.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    document.getElementById('inputFecha').value = ano + "-" + mes + "-" + dia;
}

cargarUrl = async (url) => {
    let response = await fetch(url);
    return response.json();
}

clickBoton = async () => {

    let fecha = document.getElementById("inputFecha").value;
    // console.log(fecha);
    if (fecha.trim() === "") {
        alert("Ingresar la fecha");
    } else {
        let pais = document.getElementById("selectPais").value;
        let url = "https://api.covid19tracking.narrativa.com/api/";
        let json = await cargarUrl(url + `${fecha}/country/${pais}`);

        let stats = json.dates[fecha].countries[pais];
        // console.log(stats);

        document.getElementById('today_confirmed').innerHTML = stats.today_confirmed;
        document.getElementById('today_deaths').innerHTML = stats.today_deaths;
        document.getElementById('today_new_confirmed').innerHTML = stats.today_new_confirmed;
        document.getElementById('today_new_deaths').innerHTML = stats.today_new_deaths;
        document.getElementById('today_new_open_cases').innerHTML = stats.today_new_open_cases;
        document.getElementById('today_new_recovered').innerHTML = stats.today_new_recovered;
        document.getElementById('today_open_cases').innerHTML = stats.today_open_cases;
        document.getElementById('today_recovered').innerHTML = stats.today_recovered;
    }


}