// https://apiwww.easylogcloud.com//Users.svc/Favourites?APIToken=b87d29a5-e4f9-11ed-bebe-0a94be46f06a&userGUID=3b0a168a-0bea-11ee-bebe-0a94be46f06a&localTime=false
//https://apiwww.easylogcloud.com/Users.svc/Favourites?APIToken=b87d29a5-e4f9-11ed-bebe-0a94be46f06a&userGUID=1e9d7262-d903-11ee-991b-0a94be46f06a&localTime=false
function displayWeatherDevice () {
    const url = 'https://apiwww.easylogcloud.com//Users.svc/Favourites';
    const apiToken = 'b87d29a5-e4f9-11ed-bebe-0a94be46f06a';
    const userGUID = '1e9d7262-d903-11ee-991b-0a94be46f06a';
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
        var GUID = "ba12a005-fb7b-11ed-bebe-0a94be46f06a";
        var MACAddress = "98:8B:AD:22:49:B9"; //FTYALine166

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
                // Xóa thuộc tính "animation" hiện tại
                 imageNumberBattery.style.removeProperty("animation");

                 // Thêm thuộc tính "animation" mới với giá trị "sprite 3s steps(10) infinite"
                 imageNumberBattery.style.animation = "sprite 3s steps(10) infinite";
 
                // battery critical = pin cạn kiệt
                imageNumberBattery.style.background = "url(./assets/css/Image/batt_critical.png) no-repeat 0 0%";  
                
            } else if (batteryLevelValue == 2) {
                // battery Level 2
                imageNumberBattery.style.background = "url(./assets/css/Image/battLevel2.png)";         
            } else if (batteryLevelValue == 3) {
                // battery Level 3
                imageNumberBattery.style.background = "url(./assets/css/Image/battLevel2.png)";
            } else if (batteryLevelValue == 4) {
                // battery Level 4
                imageNumberBattery.style.background = "url(./assets/css/Image/battLevel4.png)";
            } else if (batteryLevelValue == 12  || batteryLevelValue == 5) {
                // battery Level 12 full
                imageNumberBattery.style.background = "url(./assets/css/Image/battLevel5.png)";
            } else if (batteryLevelValue == 11) {
                // Xóa thuộc tính "animation" hiện tại
                imageNumberBattery.style.removeProperty("animation");
                // Thêm thuộc tính "animation" mới với giá trị "sprite 3s steps(6) infinite"
                imageNumberBattery.style.animation = "sprite 3s steps(6) infinite";
                // battery Level 11 charge
                imageNumberBattery.style.background = "url(./assets/css/Image/batt_charging.png) no-repeat 0 0%";
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
