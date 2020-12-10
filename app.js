const city = document.querySelector('#city_name');
const latitude = document.querySelector('.lat');
const longitude = document.querySelector('.long');
const weather_icon=document.querySelector('.icon_weather');
const description = document.querySelector('#description');
const sunrise = document.querySelector('#timeup');
const sunset = document.querySelector('#timedown');
const temp = document.querySelector('#temp_no');
const pressure = document.querySelector('#pressure_no');
const humidity = document.querySelector('#humidity_no');
const wind = document.querySelector('#wind_no');
const wind_deg = document.querySelector('#deg');
const max_temp = document.querySelector('#max');
const min_temp = document.querySelector('#min');
const search = document.querySelector('#search');


const api='e3a638ef4768d4e3e709fca063763bb5';

window.addEventListener('load',()=>{
let long;
let lat;

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
long = position.coords.longitude;
lat=position.coords.latitude;
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`)
.then(res=>res.json())
.then(data=>
    {
        send(data);
        timeup(data.sys.sunrise);
    search.value='';
    }
    
 ).catch(err=>{alert("city not found")});
    });
}

})



function send(data){
    console.log(data);
    city.innerHTML = data.name;
    latitude.innerText = "Lat : " + data.coord.lat||0;
    longitude.innerHTML ="Long :" + data.coord.lon||0;
    weather_icon.src=`https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    description.innerHTML=data.weather[0].description;
    temp.innerHTML=parseInt((data.main.temp)-273.15);
    pressure.innerHTML=data.main.pressure;
    humidity.innerHTML=data.main.humidity;
    wind.innerHTML=data.wind.speed;
    wind_deg.innerHTML=data.wind.deg;
    max_temp.innerHTML=parseInt((data.main.temp_max)-273.15);
    min_temp.innerHTML=parseInt((data.main.temp_min)-273.15);


    
 };

 function timeup(unix){
    let unix_timestamp = unix;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    sunrise.innerHTML=formattedTime;
 }
 function timedown(unix){
    let unix_timestamp = unix;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    sunset.innerHTML=formattedTime;
 }

 

 fetch(`https://api.openweathermap.org/data/2.5/weather?q=shimoga&appid=${api}`)
 .then(res=>res.json())
 .then(data=>console.log(data));



search.addEventListener('keyup'||'click',(e)=>{

  if(e.keyCode==13){
    const  city=search.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
    .then(res=>res.json())
    .then(data=>
        {
            send(data);
            timeup(data.sys.sunrise);
        search.value='';
          
        }).catch(err=>{alert("city not found")})
  }
 

});
