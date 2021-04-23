var miMapa = L.map("miMapa").setView([51.505, -0.09], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9yZ2VnYXJiYSIsImEiOiJja21vOTJ4Nm8waXppMnZrNTRoNXJlbXdiIn0.P_K9HjwwpSJQUkvKddhpcA",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery ©️ <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoiam9yZ2VnYXJiYSIsImEiOiJja21vOTJ4Nm8waXppMnZrNTRoNXJlbXdiIn0.P_K9HjwwpSJQUkvKddhpcA",
  }
).addTo(miMapa);

// miMapa.on("click", ({ latlng: { lat, lng } }) => {
//   console.log("latitud: " + lat);
//   console.log("longitud: " + lng);
// });

const climaCiudad = document.getElementById("climaCiudad");
const climaIcono = document.getElementById("climaIcono");
const climaTemp = document.getElementById("climaTemp");
const climaTempMin = document.getElementById("climaTempMin");
const climaTempMax = document.getElementById("climaTempMax");
const climaSensacion = document.getElementById("climaSensacion");
const climaHumedad = document.getElementById("climaHumedad");
const inputBusqueda = document.getElementById("inputBusqueda");
const cargando = document.getElementById("cargando");
const carouselMain = document.querySelector(".main-carousel");

const climaTemp_slider1 = document.getElementById("climaTemp_slider1");
const climaTemp_slider2 = document.getElementById("climaTemp_slider2");
const climaTemp_slider3 = document.getElementById("climaTemp_slider3");
const climaTemp_slider4 = document.getElementById("climaTemp_slider4");
const climaTemp_slider5 = document.getElementById("climaTemp_slider5");

const climaIcono_slider = document.getElementById("climaIcono_slider");
const climaIcono_slider2 = document.getElementById("climaIcono_slider2");
const climaIcono_slider3 = document.getElementById("climaIcono_slider3");
const climaIcono_slider4 = document.getElementById("climaIcono_slider4");
const climaIcono_slider5 = document.getElementById("climaIcono_slider5");

const slider_fecha1 = document.getElementById("slider_fecha1");
const slider_fecha2 = document.getElementById("slider_fecha2");
const slider_fecha3 = document.getElementById("slider_fecha3");
const slider_fecha4 = document.getElementById("slider_fecha4");
const slider_fecha5 = document.getElementById("slider_fecha5");

const dibujarClima = (rpta) => {
  climaCiudad.innerText = rpta.data.name;
  climaTemp.innerText = rpta.data.main.temp;
  climaTempMin.innerText = rpta.data.main.temp_min;
  climaTempMax.innerText = rpta.data.main.temp_max;
  climaSensacion.innerText = rpta.data.main.feels_like;
  climaHumedad.innerText = rpta.data.main.humidity;
  climaIcono.src = `http://openweathermap.org/img/wn/${rpta.data.weather[0].icon}@4x.png`;
};
/**https://openweathermap.org/forecast5 */
const getClimaByCityName = (ciudad) => {
  cargando.removeAttribute("hidden");
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=eb569ae1c71fff97331a167d5943f253&units=metric`
    )
    .then((rpta) => {
      dibujarClima(rpta);
      cargando.setAttribute("hidden", "hidden");
      // console.log(rpta);
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
  dibujarDiasClima(ciudad);
};

const dibujarClimaSlider = (rpta) => {
  climaIcono_slider.src = `http://openweathermap.org/img/wn/${rpta.data.list[0].weather[0].icon}@4x.png`;
  climaIcono_slider2.src = `http://openweathermap.org/img/wn/${rpta.data.list[1].weather[0].icon}@4x.png`;
  climaIcono_slider3.src = `http://openweathermap.org/img/wn/${rpta.data.list[2].weather[0].icon}@4x.png`;
  climaIcono_slider4.src = `http://openweathermap.org/img/wn/${rpta.data.list[3].weather[0].icon}@4x.png`;
  climaIcono_slider5.src = `http://openweathermap.org/img/wn/${rpta.data.list[4].weather[0].icon}@4x.png`;
  climaTemp_slider1.innerText = rpta.data.list[0].main.temp;
  climaTemp_slider2.innerText = rpta.data.list[1].main.temp;
  climaTemp_slider3.innerText = rpta.data.list[2].main.temp;
  climaTemp_slider4.innerText = rpta.data.list[3].main.temp;
  climaTemp_slider5.innerText = rpta.data.list[4].main.temp;
  slider__fecha1.innerText = rpta.data.list[0].dt_txt.substring(10, 0);
  slider__fecha2.innerText = rpta.data.list[1].dt_txt.substring(10, 0);
  slider__fecha3.innerText = rpta.data.list[2].dt_txt.substring(10, 0);
  slider__fecha4.innerText = rpta.data.list[3].dt_txt.substring(10, 0);
  slider__fecha5.innerText = rpta.data.list[4].dt_txt.substring(10, 0);

  var marker = L.marker([51.5, -0.09]).addTo(miMapa);
  miMapa.flyTo([+rpta.data.city.coord.lat, +rpta.data.city.coord.lon], 13);
  marker.setLatLng([+rpta.data.city.coord.lat, +rpta.data.city.coord.lon]);
};

const dibujarDiasClima = (ciudad) => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=eb569ae1c71fff97331a167d5943f253&units=metric`
    )
    .then((rpta2) => {
      dibujarClimaSlider(rpta2);
      console.log(rpta2);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**Flykity */
const iniciarFlickity = () => {
  const elem = document.querySelector(".main-carousel");
  const flick = new Flickity(elem, {
    // options
    cellAlign: "left",
    contain: true,
  });
};
iniciarFlickity();