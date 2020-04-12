// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// 20da204ebb253be898910df1ae2d3dd6

$("#submit").on("click", function(){
    var city = $("#search").val();
    console.log(city);

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=20da204ebb253be898910df1ae2d3dd6";
    console.log (queryURL);

    $.ajax({   
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#city").text(city.charAt(0).toUpperCase() + city.slice(1)); 
        $("#temp").text(response.main.temp); 
        $("#humidity").text(response.main.humidity); 
        $("#wind-speed").text(response.wind.speed);
       // $("#").val(response.);  


    });

});