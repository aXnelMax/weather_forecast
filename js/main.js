const APIkeyWeather = "93e267578342448f8ae82600221106"; //free API key from www.weatherapi.com
const APIkeyIP = "c24ca686122a40fd8d25744da35dd2d5";    // free API key from abstractapi.com
const NUMBER_OF_NEXT_DAYS = 3;
let urlGetIP = `https://ipgeolocation.abstractapi.com/v1/?api_key=${APIkeyIP}`;

GetIP(urlGetIP, function (response) {

    let url = `http://api.weatherapi.com/v1/forecast.json?key=${APIkeyWeather}&q=${response.ip_address}&days=3&aqi=no&alerts=no`;

    getWeather(url, function (err, data) {
        if (err !== null) {
            return err;
        } else {       
            updateWeather (data);
        }
    });


});

// get user IP address 
function GetIP(url, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

// get weather 
function getWeather(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function updateWeather (data) {

    let days = document.querySelectorAll('.day__name');
    let temp = document.querySelectorAll('.temp_value');
    let nextDays = getDay();

    document.querySelector('.current__time').innerHTML = data.current.last_updated;
    document.querySelector('.current_temp').innerHTML = data.current.temp_c;
    document.querySelector('.current__weather').innerHTML = data.current.condition.text;
    document.querySelector('.location').innerHTML = data.location.name;
    document.querySelector('.humidity__value').innerHTML = data.current.humidity + "%";
    document.querySelector('.wind__value').innerHTML = data.current.wind_kph + "km";

    for (let i = 0; i < nextDays.length; i++) {
        days[i].innerHTML = nextDays[i];
        temp[i].innerHTML = data.forecast.forecastday[i].day.avgtemp_c;
    }
    
    console.log(data);
}

function getDay () {

    let date = new Date();
    let options = { weekday: 'long'};
    let nextDays = [];

    for (let i = 0; i < NUMBER_OF_NEXT_DAYS; i++){
    date.setDate(date.getDate()+1);
    nextDays.push(Intl.DateTimeFormat('en-US', options).format(date).charAt(0)); 
    }

    return nextDays;
}