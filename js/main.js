const APIkeyWeather = "93e267578342448f8ae82600221106"; //free API key from www.weatherapi.com
const APIkeyIP = "c24ca686122a40fd8d25744da35dd2d5";    // free API key from abstractapi.com

let urlGetIP = `https://ipgeolocation.abstractapi.com/v1/?api_key=${APIkeyIP}`; 

let test = httpGetAsync(urlGetIP, function (response) {

    let url = `http://api.weatherapi.com/v1/current.json?key=${APIkeyWeather}&q=${response.ip_address}&aqi=no`;

    getJSON(url, function (err, data) {
        if (err !== null) {
            return err;
        } else {
            document.querySelector('.current__time').innerHTML = data.current.last_updated;
            document.querySelector('.current_temp').innerHTML = data.current.temp_c;
            document.querySelector('.current__weather').innerHTML = data.current.condition.text;
            document.querySelector('.location').innerHTML = data.location.name;
            document.querySelector('.humidity__value').innerHTML = data.current.humidity + "%";
            document.querySelector('.wind__value').innerHTML = data.current.wind_kph + "km";

            console.log(data);
        }

    });

    function getJSON(url, callback) {
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

});

function httpGetAsync(url, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}
