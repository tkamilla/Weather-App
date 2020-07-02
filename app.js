const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e){
  if (e.keyCode == 13) {
    getResults(searchbox.value);
  }
};

function getResults(query){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=c1a84e35d376ec454e9fc6fbbd3b4279`)
    .then(weather => {
      return weather.json();
    })
    .then(displayResults);
};


function displayResults (weather){
  let city = document.querySelector('.city');
  city.textContent = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.date');
  date.textContent = dateBuilder(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  let current_temp = Math.round(weather.main.temp);
  let degree = temp.querySelector('span')
  
  let hilow = document.querySelector('.hi-low');
  hilow.textContent = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`

  let Fahrenheit = changeF(current_temp);
  let F_min = changeF(weather.main.temp_min);
  let F_max = changeF(weather.main.temp_max);

  let Celsius = (Fahrenheit -32) *5/9;
  let C_min = changeC(F_min);
  let C_max = changeC(F_max);

  
  
  // change Celsius to Fahrenheit
  temp.addEventListener('click', () => {
    if (temp.textContent == `${current_temp}°C`){
      temp.innerHTML = `${Math.round(Fahrenheit)}<span>°F</span>`;
      hilow.textContent = `${Math.round(F_max)}°F / ${Math.round(F_min)}°F`;
    } 
    else if (temp.innerHTML = `${Math.round(Fahrenheit)}<span>°F</span>`) {
      temp.innerHTML = `${Math.round(Celsius)}<span>°C</span>`;
      hilow.textContent = `${Math.round(C_max)}°C / ${Math.round(C_min)}°C`;
      degree.textContent = "°C"
      // console.log(Math.round(Fahrenheit));
      // console.log(degree.textContent);
      
     }
     else if (temp.innerHTML = `${Math.round(Celsius)}<span>°C</span>`){
      temp.innerHTML = `${Math.round(Fahrenheit)}<span>°F</span>`;
      hilow.textContent = `${Math.round(F_max)}°F / ${Math.round(F_min)}°F`;
     }
  })

  function changeF(f){
    return (f * 9/5) + 32;
  }
  function changeC(c){
    return (c -32) *5/9;
  }

  let weather_el = document.querySelector('.weather');
  weather_el.textContent = weather.weather[0].main;


  function dateBuilder(d) {
    let months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  searchbox.value = '';
}

