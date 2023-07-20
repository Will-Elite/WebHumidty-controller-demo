function displayopenweathermap() {

const lat = 10.781; // Giá trị latitude
const lon = 106.951; // Giá trị longitude
const appidweather = "1409870ee5f29377a06e3418bf22881e"; // Giá trị API key (App ID)

const apiUrlweather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appidweather}&lang=vi`;



fetch(apiUrlweather)
  .then(response => response.json())
  .then(dataWeather => {
   // console.log(dataWeather);
    // Xử lý dữ liệu

    // Xử lý nhiệt độ thời tiết
    const temperatureKelvin = dataWeather.main.temp;
    console.log("Nhiệt độ:", temperatureKelvin);
    const kelvin = temperatureKelvin; // Giả sử nhiệt độ là 300 Kelvin
    const celsius = kelvin - 273.15; // Áp dụng công thức chuyển đổi

    console.log("Độ C:", celsius); // In ra độ C tương ứng

    const temperatureCelsius = celsius; // Nhiệt độ ban đầu
    const roundedTemperature = Math.ceil(temperatureCelsius); // Làm tròn lên

    console.log("Nhiệt độ sau làm tròn:", roundedTemperature);

   
    const TemperatureweatherElement = document.querySelector(".weather-temp");
    TemperatureweatherElement.innerHTML = `${roundedTemperature}&deg;C`;


    // xử lý độ ẩm thời tiết
    const humidityWeather = dataWeather.main.humidity;
    console.log("Độ ẩm:", humidityWeather);

    const HumidityWeatherElement = document.querySelector(".value-weather-Humidity");
    HumidityWeatherElement.innerHTML = `${humidityWeather}%`;
    

    // xử lý tốc độ gió thòi tiết

    const windSpeedWeather = dataWeather.wind.speed;
    console.log("Tốc độ gió:", windSpeedWeather);

    const windSpeedWeatherElement = document.querySelector(".value-weather-wind");
    windSpeedWeatherElement.innerHTML = `${windSpeedWeather}m/s`;


    // Xử lý description weather

    const descriptionWeather = dataWeather.weather[0].description;
    
    console.log("Thời tiết:", descriptionWeather);

    const descriptionWeatherElement = document.querySelector(".weather-desc");
    descriptionWeatherElement.innerHTML = `${descriptionWeather}`;

    
    
  })


  .catch(error => {
    console.log("Đã xảy ra lỗi: ", error);
  });

}

  //Xử lý ngày giờ
  var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function UpdateDay() {
        dateRealtimeDay = new Date();
        
        const DayTime = day[dateRealtimeDay.getDay()];
        console.log("Thứ:", DayTime);
        
        const daytimeElement = document.querySelector(".date-dayname");
        daytimeElement.innerHTML = `${DayTime}`; 
        
        const dateTimeMonth = dateRealtimeDay.getDate() + '  ' + month[dateRealtimeDay.getMonth()];
        console.log("ngày tháng:", dateTimeMonth);

        const dateTimeMonthElement = document.querySelector(".date-day");
        dateTimeMonthElement.innerHTML= `${dateTimeMonth}`;
      
    }

    
    // function UpdateTime () {
    //     dateRealtime = new Date();

    //     const TimeHourMiSecond = dateRealtime.getHours() + ':' + dateRealtime.getMinutes() + ':' + dateRealtime.getSeconds();
    //     console.log("thời gian:", TimeHourMiSecond);

    //     const TimeHourMiSecondElement = document.querySelector(".date-timesecond");
    //     TimeHourMiSecondElement.innerHTML = `${TimeHourMiSecond}`;
    // }

    // UpdateTime();
    // setInterval(UpdateTime, 1000);
        
   
    function UpdateTime() {
        const dateRealtime = new Date();
      
        const hours = dateRealtime.getHours();
        const minutes = dateRealtime.getMinutes();
        // const seconds = dateRealtime.getSeconds();
      
        // const TimeHourMiSecond = hours + ':' + minutes + ':' + seconds;
        const TimeHourMiSecond = hours + ':' + minutes;
        //console.log("Thời gian:", TimeHourMiSecond);
      
        const TimeHourMiSecondElement = document.querySelector(".date-timesecond");
        TimeHourMiSecondElement.textContent = TimeHourMiSecond;
      }

UpdateDay();
UpdateTime();
setInterval(UpdateTime, 60000);



displayopenweathermap();
setInterval(displayopenweathermap, 1000000);


    
