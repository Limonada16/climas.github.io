const climaCiudad = document.getElementById("climaCiudad");
const climaIcono = document.getElementById("climaIcono");
const climaTemp = document.getElementById("climaTemp");
const climaTempMin = document.getElementById("climaTempMin");
const climaTempMax = document.getElementById("climaTempMax");
const climaSensacion = document.getElementById("climaSensacion");
const climaHumedad = document.getElementById("climaHumedad");
const formBusqueda = document.getElementById("formBusqueda");
const inputBusqueda = document.getElementById("inputBusqueda");
const cargando = document.getElementById("cargando");
const swiperPa = document.querySelector(".swiper-wrapper");

const dibujarClima = (rpta) => {
  climaCiudad.innerText = rpta.data.name;
  climaTemp.innerText = rpta.data.main.temp;
  climaTempMin.innerText = rpta.data.main.temp_min;
  climaTempMax.innerText = rpta.data.main.temp_max;
  climaSensacion.innerText = rpta.data.main.feels_like;
  climaHumedad.innerText = rpta.data.main.humidity;
  climaIcono.src = `http://openweathermap.org/img/wn/${rpta.data.weather[0].icon}@4x.png`;

};


var miMapa = L.map('miMapa').setView([8.640764905085144, -80.27160644531251], 8);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9yZ2VnYXJiYSIsImEiOiJja21vOTJ4Nm8waXppMnZrNTRoNXJlbXdiIn0.P_K9HjwwpSJQUkvKddhpcA', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1Ijoiam9yZ2VnYXJiYSIsImEiOiJja21vOTJ4Nm8waXppMnZrNTRoNXJlbXdiIn0.P_K9HjwwpSJQUkvKddhpcA'
}).addTo(miMapa);

var marker = L.marker([51.5, -0.09]).addTo(miMapa);

const marcaMapa = (lati,long)=>{
    var marker = L.marker([51.5, -0.09]).addTo(miMapa);
    miMapa.flyTo([lati, long], 13);
    marker.setLatLng([lati, long]);
    
}

const getClimaByCityName = (ciudad) => {
  cargando.removeAttribute("hidden");
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=688909002c8819a2aac8946783366928&units=metric`
    )
    .then((rpta) => {
      dibujarClima(rpta);
      cargando.setAttribute("hidden", "hidden");
      marcaMapa(rpta.data.coord.lat,rpta.data.coord.lon);
    })
    .catch((error) => {
      console.log(error);
      cargando.setAttribute("hidden", "hidden");
      alert("Error! ingrese un nombre correcto");
    });
};

formBusqueda.onsubmit = (e) => {
  e.preventDefault();
  let ciudad = inputBusqueda.value.trim();
  if (ciudad === "") return;
  getClimaByCityName(ciudad);
  dibujarClimasDesp(ciudad);
};



const dibujarClimasDesp = (ciudad) => {
  //axios es una libreria que nos facilita usar promesas para consumir apis
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=688909002c8819a2aac8946783366928&units=metric`
    )
    .then((respuesta) => {
      iterarClimas(respuesta);
    });
};

const iterarClimas = (respuesta) => {
  swiperPa.innerHTML = "";
  respuesta.data.list.forEach((objRep) => {
      const swiper = document.createElement("div");
      swiper.classList.add("swiper-slide");
      swiper.innerHTML = `
          <div class="card text-white bg-dark mb-3" style="max-width: 540px;">
              <div class="row g-0">
                  <div class="col-md-4">
                  <img src="..." alt="...">
                  </div>
                  <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title ">${objRep.main.temp}&#8451</h5>
                      <p class="card-text "><i class="fas fa-calendar-minus"></i> ${objRep.dt_txt.substring(0,10)}</p>
                      <p class="card-text "><small class="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                  </div>
              </div>
              </div>`
      swiperPa.appendChild(swiper);
  })
  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
};
