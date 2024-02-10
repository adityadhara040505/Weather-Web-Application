const apikey = "f349017823b2dcc53dba584a69f214dd";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.getElementById("searchbtn");
const fullscreen = document.getElementById("fullscreen");
var state=false;

async function checkWeather(city){
    const response = await fetch(apiurl+city+`&appid=${apikey}`);
    var data = await response.json();
    console.log(data);
    var sunrise = new Date(data.sys.sunrise);
    var sunset = new Date(data.sys.sunset);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+" °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+" %";
    document.querySelector(".wind").innerHTML = data.wind.speed+" km/hr";
    document.querySelector(".temp_min").innerHTML = data.main.temp_min;
    document.querySelector(".temp_max").innerHTML = data.main.temp_max;
    if(state){
        document.querySelector(".Pressure").innerHTML=data.main.pressure+" Pa";
        document.querySelector(".SeaLevel").innerHTML=data.main.sea_level+" meters";
        document.querySelector(".GroundLevel").innerHTML=data.main.grnd_level+" meters";
        document.querySelector(".visibility").innerHTML=data.visibility;
        document.querySelector(".sunRise").innerHTML=sunrise.getHours()+" : "+sunrise.getMinutes();
        document.querySelector(".sunSet").innerHTML=sunset.getHours()+" : "+sunset.getMinutes();
    }else{
        document.getElementById("card").style="width: 400px; height: 560px";
        document.getElementById("weatherOnFull").style.visibility= "hidden";
    }
}

async function showWeatherOnFullScreen(){
    document.getElementById('fullscreenBTN').className="bi bi-fullscreen-exit";
    document.getElementById("card").style="width: 1100px";
    document.getElementById("weatherOnFull").style.visibility= "visible";
}

fullscreen.addEventListener("click",()=>{
    state=!state;
    if (state) {
        showWeatherOnFullScreen();
        checkWeather(searchbox.value);
    }else{
        document.getElementById('fullscreenBTN').className="bi bi-arrows-fullscreen";
        checkWeather(searchbox.value);
    }
});
searchbtn.addEventListener("click",()=>{
    checkWeather(searchbox.value);
})
const timel = document.getElementById("time");
const datel = document.getElementById("date");
const days = ["Sunday","Monday","Tuesday","Thursday","Friday","Saturday"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
setInterval(()=>{
    const time = new Date();
    const month =time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >=13 ? hour%12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour>=12 ? "PM" : "AM";
    timel.innerHTML = (hoursIn12HrFormat<10?0+hoursIn12HrFormat:hoursIn12HrFormat)+" : "+minutes+ampm;
    datel.innerHTML = days[day]+", "+date+" "+months[month];
}, 1000);