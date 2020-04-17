// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// 20da204ebb253be898910df1ae2d3dd6
// https://openweathermap.org/img/wn/10d@2x.png    icon="10d" code
// https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
var date = new Date().toLocaleDateString();
console.log(date);

$("#submit").on("click", function(){
    var city = $("#search").val();
    console.log(city);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=20da204ebb253be898910df1ae2d3dd6";        
    //console.log (queryURL);

    $.ajax({   
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var temp = parseInt((response.main.temp - 273.15) * 1.80 +32);
        var date = new Date().toLocaleDateString();
        var icon = response.weather[0].icon;
        
        var iconImage = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        //console.log(icon);
        var imageElement = $("<img>");
        imageElement.attr("src", iconImage);
            
        
        $("#city").text(response.name + " (" + date + ")");
        //console.log(date); 
        $("#temp").text(temp + "° F ");
        $("#city").append(imageElement); 
        $("#humidity").text(response.main.humidity + "%"); 
        $("#wind-speed").text(response.wind.speed + " MPH");
        
       // $("#").val(response.);  

       var lat = response.coord.lat;
       var lon = response.coord.lon;
       var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=20da204ebb253be898910df1ae2d3dd6&lat=" + lat + "&lon=" + lon;
       //console.log(uvURL);
            
       
        $.ajax({   
            url: uvURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            uvValue = response.value;
            $("#uv-index").text(uvValue);      
            
        });// end of uv index jquery ajax function

            //=====================================================

        // http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
        
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=20da204ebb253be898910df1ae2d3dd6";
        
        //console.log(forecastURL);
             
        
         $.ajax({   
             url: forecastURL,
             method: "GET"
         }).then(function(response){
             console.log(response);
             var forecastArray = response.list.slice(1, 6); 
             console.log(forecastArray);

             var forecastDate = $(".forecast-date");
             var forecastIcon = $(".forecast-icon");
             var forecastTemp = $(".forecast-temp");
             var forecastHumidity = $(".forecast-humidity");
            
             for (var i = 0; i < forecastArray.length; i++){
                var fIcon = forecastArray[0].weather[0].icon;
                var forecastImage = "https://openweathermap.org/img/wn/" + fIcon + "@2x.png";
                var tempF = parseInt((forecastArray[i].main.temp - 273.15) * 1.80 +32);
                var date = new Date(forecastArray[i].dt_txt);
                console.log(date);
                forecastDate[i].textContent = (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getFullYear());                                                                      
                forecastIcon[i].src = forecastImage;
                forecastTemp[i].textContent = tempF + "° F ";
                forecastHumidity[i].textContent = forecastArray[i].main.humidity + " MPH";
             }                   
             
         });// end of forecast jquery ajax function   
      
       
    }); // end of weather jquery ajax function

}); // end of event listener

