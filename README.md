# Server-Side API: Weather Dashboard

Weather dashboard build that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities, specifically current weather, uv index, climate icon representation, and 5 day forecast.
Use of `localStorage` to store any persistent data.


## User Story

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance Criteria

GIVEN a weather dashboard with form inputs
* WHEN user searches for a city
    THEN user is presented with current and future conditions for that city and that city is added to the search history with use of buttons
* WHEN user views current weather conditions for that city
    THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
* WHEN I view the UV index
    THEN I am presented with a color that indicates whether the conditions are low, moderate to high, very high to extreme
* WHEN I view future weather conditions for that city
    THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
* WHEN I click on a city in the search history
    THEN I am again presented with current and future conditions for that city
* WHEN I open the weather dashboard
    THEN I am presented with the last searched city forecast or last selected search history
    
Deployed Site: https://ncrutgers.github.io/weatherdashboard



