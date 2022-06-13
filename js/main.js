

const APIkey = prompt("Enter valid key: ", "");

fetch('https://api.ipify.org')
.then(function(response) {
  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: ' + response.status);
    return;
  }

  // Examine the text in the response
  response.text().then(function(responseText) {
    URL = `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${responseText}&aqi=no`;
    
    getJSON(URL, function (err, data) {
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


  });
})
.catch(function(err) {
  console.log('Fetch Error :-S', err);
});



function getJSON (url, callback) {
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


