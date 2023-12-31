// https://apiwww.easylogcloud.com//Users.svc/Favourites?APIToken=b87d29a5-e4f9-11ed-bebe-0a94be46f06a&userGUID=3b0a168a-0bea-11ee-bebe-0a94be46f06a&localTime=false

function displayWeatherDevice () {
    const url = 'https://apiwww.easylogcloud.com//Users.svc/Favourites';
    const apiToken = 'b87d29a5-e4f9-11ed-bebe-0a94be46f06a';
    const userGUID = '3b0a168a-0bea-11ee-bebe-0a94be46f06a';
    const localTime = false;

    const params = {
        APIToken: apiToken,
        userGUID: userGUID,
        localTime: localTime
    };

    const queryParams = new URLSearchParams(params).toString();
    const apiUrl = `${url}?${queryParams}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(dataWeatherDevice => {
        // Lấy GUID và MACAddress cần tìm
        var GUID = "f7fb63d3-fb79-11ed-bebe-0a94be46f06a";
        var MACAddress = "98:8B:AD:22:47:75"; //CUT1_B

        //Tìm đối tượng JSON theo GUID và MACAdress
        var objectCut1B = dataWeatherDevice.find(item => item.GUID === GUID && item.MACAddress === MACAddress);

        // kiểm tra đối tượng JSON và lấy nhiệt độ và độ ẩm
        if (objectCut1B && objectCut1B.channels) {
            var temperatureChannel = objectCut1B.channels.find(channel => channel.type === "Temperature");
            var humidityChannel = objectCut1B.channels.find(channel => channel.type === "Humidity");

            if (temperatureChannel) {
                var temperature = temperatureChannel.currentReading;
                document.getElementById("temperature").textContent = "Nhiệt độ: " + temperature + " °C";
            } else {
                document.getElementById("temperature").textContent = "Không tìn thấy";
            }

            if (humidityChannel) {
                var humidity = humidityChannel.currentReading;
                document.getElementById("humidity").textContent = "Độ ẩm: " + humidity + " %";
                //UpdateHumidityIcon(humidity);
            } else {
                document.getElementById("humidity").textContent = "Không tìm thấy"
            }
        } else {  
            console.log("Không tình thấy GUID và MACAddress cụ thể trong dữ liệu JSON.")
        }
    

        // Lấy thời gian từ hệ thống
        if (objectCut1B && objectCut1B.currentReadings) {
            var datetimeString = objectCut1B.currentReadings.datetime;
            var regex = /\/Date\((\d+)([+-]\d+)\)\//;
            var match = regex.exec(datetimeString);

            if (match) {
                var datetimeMilliseconds = parseInt(match[1]);
                var datetimeOffset = parseInt(match[2]);

                var datetime = new Date(datetimeMilliseconds);
                datetime.setUTCMilliseconds(datetime.getUTCMinutes() + datetimeOffset);

                var year = datetime.getFullYear();
                var month = datetime.getMonth() + 1; // Tháng được đánh số từ 0 - 11, nên cần +1 để đạt giá trị thực tế
                var day = datetime.getDate();
                var hours = datetime.getHours();
                var minutes = datetime.getMinutes();
                var seconds = datetime.getSeconds();

                document.getElementById("datetimeDevice").textContent = "Ngày: " + year + "-" + month + "-" + day;

                document.getElementById("datetime2").textContent = "Giờ: " + hours + ":" + minutes + ":" + seconds;
                console.log("ngày:", day);
            }
        }

        // Lấy dung lượng battery
        if (objectCut1B && objectCut1B.batteryLevel) {
            var batteryLevelValue = objectCut1B.batteryLevel;
            console.log("Dung lượng pin:", batteryLevelValue);
            document.querySelector(".batteryLevel-status").textContent = "Battery: " + batteryLevelValue;

            var imageNumberBattery = document.querySelector(".image-battery");
            if (batteryLevelValue == 13) {
                imageNumberBattery.style.background = "url(./assets/css/Image/batt_critical.png) no-repeat 0 0%";
            } else if (batteryLevelValue == 2) {
                imageNumberBattery.style.background = "url(./assets/css/Image/battLevel2.png)";
                
            }
            

        }
        UpdateHumidityIcon(humidity);
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
} 

displayWeatherDevice ();
setInterval(displayWeatherDevice, 20000);


// var iconElement = document.querySelector(".image-light");
// iconElement.src ="./assets/css/Image/pic_bulbon.gif";