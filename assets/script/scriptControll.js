// https://api.openweathermap.org/data/2.5/weather?lat=10.781&lon=106.951&appid=1409870ee5f29377a06e3418bf22881e
 



function updateSwitchText(checkbox) {
    const switchTextElement = document.getElementById("switchText");
    switchTextElement.textContent = checkbox.checked ? "Manual" : "Auto";
     
    console.log(switchTextElement.textContent);
    
   

    if (checkbox.checked) {
        onButton.disabled = false;
        offButton.disabled = false;
    } else {
        onButton.disabled = true;
        offButton.disabled = true;
    }

}

    

function UpdateModeStatusFirst () {
    
    const switchTextElement = document.getElementById("switchText");
    const ModeStatus = switchTextElement.textContent;
    console.log("mode", ModeStatus);

     if (ModeStatus === "Manual") {
        onButton.disabled = false;
        offButton.disabled = false;
    } 
    if (ModeStatus === "Auto") {
        onButton.disabled = true;
        offButton.disabled = true;
     }
}  

function updateHumiditySetting() {
    const smallerSetting = document.getElementById("smaller-input").value;
    const biggerSetting = document.getElementById("bigger-input").value;

    localStorage.setItem("smallerLocalStorage", smallerSetting);
    localStorage.setItem("biggerLocalStorage", biggerSetting);

    console.log("số nhỏ đã nhập", smallerSetting);
    console.log("số lớn đã nhập", biggerSetting);

    var textElementSetup = document.querySelector(".humidity-status-setting");

    var numbersmallerSetting = parseFloat(smallerSetting);
    var numberbiggerSetting = parseFloat(biggerSetting);
    if(!isNaN(numbersmallerSetting) && !isNaN(numberbiggerSetting)) {
        if (numbersmallerSetting < numberbiggerSetting) {
        console.log("Bạn nhập đúng số")
        textElementSetup.textContent = "Độ ẩm từ: " + smallerSetting + " đến " + biggerSetting;
        textElementSetup.style.color = "white";
       } else if (numbersmallerSetting >= numberbiggerSetting) {
        console.log("Bạn nhập sai, Mời nhập lai! ");
        textElementSetup.textContent = "Bạn nhập sai, Mời nhập lại!";
        textElementSetup.style.color = "red";
       }

    } else {
        console.log("không nhập, nhập sai");
        textElementSetup.textContent = "Nhập sai, nhập lại!!";
    }

}

// function turnOnButton () {
//     // thực hiện hành động khi bật nút
//     console.log("Bật nút");
// }

// function turnOffButton () {
//     // thực hiện hành động khi tắt nút
//     console.log("Tắt nút");
// }

function sendRequest(statusDevice) {
    const url = `http://172.20.10.11/?may=${statusDevice}`;

    var dataDeviceStatusElement1 = document.querySelector(".button-status");
        dataDeviceStatusElement1.textContent = statusDevice;
        console.log("Nút nhấn:",statusDevice);
    fetch(url)
    .then(respone => respone.text())
    .than(dataDevice => {
        var dataDeviceStatusElement = document.querySelector(".button-status");
        dataDeviceStatusElement.textcontent = dataDevice;
    })
    .catch(error => {
        console.error("Yêu cầu thất bại. Lỗi:", error);
    });
}

function updatedataDevice () {
    const deviceUrl = 'http://172.20.10.11';

    fetch(deviceUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(dataDeviceStatus => {
        var datareadDeviceElement = document.querySelector(".Notification-valueSetup");
        var datareadStatusElement = document.querySelector(".statusofdevice");
        if (dataDeviceStatus === null) {
            datareadDeviceElement.textContent = "Thiết bị sự cố"
            
        } else {
            datareadDeviceElement.textContent = "Thiết bị đang hoạt động";
            datareadStatusElement.textContent = dataDeviceStatus;
        }

    })
    .catch(error => {
        console.log("Yêu cầu thất bại. Lỗi:", error);
        document.querySelector(".Notification-valueSetup").textContent = "Thiết bị không hoạt động";
    });
}


function UpdateHumidityIcon(Datahumidity) {
    var smallerSettingIcon = document.getElementById("smaller-input").value;
    var biggerSettingIcon = document.getElementById("bigger-input").value;
   
    var iconElement = document.querySelector(".image-light");
    console.log("hinh Light", Datahumidity);
    console.log("bien light ", smallerSettingIcon);
    console.log("bien Oflight ", biggerSettingIcon);

    
    const switchTextStatusElement = document.getElementById("switchText");
    const checkModestatus = switchTextStatusElement.textContent;

    var smallerWrote = localStorage.getItem("smallerLocalStorage");
    var biggerWrote = localStorage.getItem("biggerLocalStorage");
    console.log("Smaii wrote", smallerWrote);
   
    document.querySelector(".small-localSotorage").textContent = "Đã cài: " + smallerWrote;
    document.querySelector(".big-localStorage").textContent = "Đã cài: " + biggerWrote;
    console.log("Chế độ manual", checkModestatus);
    if (checkModestatus === "Auto")
    {
        if (smallerWrote < biggerWrote)
        {
            if (Datahumidity < smallerWrote) {
                iconElement.src ="./assets/css/Image/pic_bulbon.gif";
                sendRequest('ON');
                console.log("hinh Light ON", Datahumidity);
                document.querySelector(".Notification-localStorage") = "Độ ẩm từ: " +smallerWrote;
        
            } else if (Datahumidity > biggerWrote) {
                iconElement.src = "./assets/css/Image/pic_bulboff.gif";
                sendRequest('OFF');
                console.log("hinh Light OFF", Datahumidity);
            }
        } else {
            console.log("Giá trị cài đặt sai");
        }
        
    } else {
        console.log("Chế độ manual");
    }    

}







// UpdateHumidityIcon(Datahumidity);

UpdateModeStatusFirst ();


updatedataDevice();

setInterval(updatedataDevice, 50000);



