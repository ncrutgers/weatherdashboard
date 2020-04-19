// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// 20da204ebb253be898910df1ae2d3dd6
// https://openweathermap.org/img/wn/10d@2x.png    icon="10d" code
// https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
var date = new Date().toLocaleDateString();

$("#submit").on("click", function(){
    var city = $("#search").val();
    console.log(city);
    // api weather query by city
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=20da204ebb253be898910df1ae2d3dd6";

    $.ajax({   
        url: queryURL,
        method: "GET"
    }).then(function(response){
        //console.log(response);

        weatherResults = response;
        localStorage.setItem("weatherResults", JSON.stringify(weatherResults));
        console.log(typeof localStorage.getItem("weatherResults"));
    
        // calculate farenheit
        var temp = parseInt((weatherResults.main.temp - 273.15) * 1.80 +32);        
        var date = new Date().toLocaleDateString();
        // weather icon code from openweather
        var icon = weatherResults.weather[0].icon;
        // icon png url
        var iconImage = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        // create image element & attribute
        var imageIconEl = $("<img>");
        imageIconEl.attr("src", iconImage);
        // write key values to html element
        $("#city").text(weatherResults.name + " (" + date + ")");        
        $("#temp").text(temp + "° F ");
        $("#city").append(imageIconEl);
        $("#humidity").text(weatherResults.main.humidity + "%");
        $("#wind-speed").text(weatherResults.wind.speed + " MPH");
        
        var latitude = weatherResults.coord.lat;
        var longitude = weatherResults.coord.lon;

        getUVIndex(latitude, longitude);
        getForeCast(city);

    });
}); 

function getUVIndex(lat, lon) {

    // api uv query by latitude & longitude
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=20da204ebb253be898910df1ae2d3dd6&lat=" + lat + "&lon=" + lon;
            
    $.ajax({   
        url: uvURL,
        method: "GET"
    }).then(function(response){
        //console.log(response);
        var uvValue = response.value;        
        localStorage.setItem("uvValue", uvValue);
      
        $("#uv-index").text(uvValue);  

        if (uvValue <= 2) {
            $("#uv-index").css({"background-color": "green"});
        } else if (uvValue <= 5) {
            $("#uv-index").css("background-color", "yellow");
        } else if (uvValue <= 7) {
            $("#uv-index").css("background-color", "orange");
        } else if (uvValue <= 10) {
            $("#uv-index").css("background-color", "red"); 
        } else {
            $("#uv-index").css("background-color", "violet");
        }                     
    });
}
 
function getForeCast(cityStr) {        
    // forecast query url by city
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityStr + "&appid=20da204ebb253be898910df1ae2d3dd6";    

    $.ajax({   
        url: forecastURL,
        method: "GET"
    }).then(function(response){
        //console.log(response);
        var forecastList = response.list;
        //console.log(forecastList);
        localStorage.setItem("forecastList", JSON.stringify(forecastList));
        console.log(typeof localStorage.getItem("forecastList"));
        
        var j = 0;
        for (var i = 7; i < forecastList.length; i+=8) {

            var fIcon = forecastList[i].weather[0].icon;
            var forecastImage = "https://openweathermap.org/img/wn/" + fIcon + "@2x.png";
            var tempF = parseInt((forecastList[i].main.temp - 273.15) * 1.80 +32);
            var date = new Date(forecastList[i].dt_txt);
            var humidity = forecastList[i].main.humidity;

            var forecastDate = $(".forecast-date");
            var forecastIcon = $(".forecast-icon");
            var forecastTemp = $(".forecast-temp");
            var forecastHumidity = $(".forecast-humidity");            
            
            if (j < forecastDate.length) {

                forecastDate[j].textContent = (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getFullYear());                                                                                 
                forecastIcon[j].src = forecastImage;
                forecastTemp[j].textContent = tempF + "° F ";
                forecastHumidity[j].textContent = humidity + " MPH";
                j++;            
            
            }
        }
    });
}

function generateWeatherButtons() {

    //localStorage.setItem("weatherResults", JSON.stringify(weatherResults));
    //localStorage.setItem("uvValue", uvValue);

    //localStorage.setItem("forecastList", JSON.stringify(forecastList));

}

       
      
       
    



