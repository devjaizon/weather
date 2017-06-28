var data;
var key = '&appid=305d9458ed8308746072a28e793b45f5';
var unit = 'imperial';
function loadData() {
    $.ajax({
        url: 'http://ip-api.com/json',
        dataType: "jsonp",
        success: function (dt) {
            country = dt.country;
            lon = '&lon=' + dt.lon;
            lat = 'lat=' + dt.lat;
            region = dt.regionName;
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?' + lat + lon + '&units=' + unit + key,
                dataType: "jsonp",
                success: function (jsn) {
                    data = jsn;
                    icon = data.weather[0].icon;
                    desc = data.weather[0].description;
                    if(unit === 'imperial') {
                        ts = '°F'
                    } else {
                        ts = '°C'
                    }
                    console.log(data.main.temp);

                    $('#city-style').text(data.name+', '+region);
                    $('#country-style').text(country);
                    $('#weather-description').text(data.weather[0].description);
                    $('#temp').html('<p>' + data.main.temp + ' ' + ts + '</p>');
                    $('.description img').attr('src', 'http://openweathermap.org/img/w/' + icon + '.png');
                    if(desc === "few clouds") {
                        $('body').css('background-image', 'url(img/few-clouds.jpg)');
                    } else if(desc === "clear sky") {
                        $('body').css('background-image', 'url(img/clear-sky.jpg)');
                    } else if(desc === "scattered clouds") {
                        $('body').css('background-image', 'url(img/scattered-clouds.jpg)');
                    } else if(desc === "broken clouds") {
                        $('body').css('background-image', 'url(img/broken-clouds.jpg)');
                    } else if(desc === "shower rain") {
                        $('body').css('background-image', 'url(img/shower-rain.jpg)');
                    } else if(desc === "rain") {
                        $('body').css('background-image', 'url(img/rain.jpg)');
                    } else if(desc === "thunderstorm") {
                        $('body').css('background-image', 'url(img/thunderstorm.jpg)');
                    } else if(desc === "snow") {
                        $('body').css('background-image', 'url(img/snow.jpg)');
                    } else if(desc === "mist") {
                        $('body').css('background-image', 'url(img/mist.jpg)');
                    } else {
                        $('body').css('background-image', 'url(img/default.jpg)');
                    }

                }
            });
        }
    });
};
$(document).ready(function() {
    loadData();
    $('#load').on('click', function() {
        if(unit === 'imperial') {
            unit = 'metric'
        } else {
            unit = 'imperial'
        }
        loadData();
    });
});