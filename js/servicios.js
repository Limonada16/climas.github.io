export const getClimasByName = async (busqueda)=>{
    let rpta = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${busqueda}&appid=688909002c8819a2aac8946783366928`);
    return rpta.data.city;
}