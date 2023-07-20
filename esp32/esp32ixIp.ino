#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "Thinh";
const char* password = "thinh1234567";
// const char* ssid = "ELITE_Dorm";
// const char* password = "ELTlongthanh@";

WebServer server(80);

const int pin4 = 4;
int stutusPump = 0;

void handleRoot() {
  String message = "Hello Elite";
  if (stutusPump == 1){
     message = "Machine Pump ON"; 
  }
  else if (stutusPump == 2){
     message = "Machine Pump OFF";
  } else {
    message = "Hello Elite";
  }
  
  // Kiểm tra đường dẫn yêu cầu
  if (server.uri() == "/") {
    if (server.hasArg("may")) {
      String mayStatus = server.arg("may");
      if (mayStatus == "ON") {
        message = "Machine Pump ON"; 
        stutusPump = 1;
        digitalWrite(pin4, HIGH);  // Bật chân 4
        Serial.println("Machine Pump ON");
      } else if (mayStatus == "OFF") {
        message = "Machine Pump OFF";
        stutusPump = 2;
        digitalWrite(pin4, LOW);   // Tắt chân 4
        Serial.println("Machine Pump OFF");
      }
    }
  }
  
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/plain", message);
}

void setup() {
  Serial.begin(115200);
  
  pinMode(pin4, OUTPUT);
  
  IPAddress localIP(172, 20, 10, 11);
  IPAddress gateway(172, 20, 10, 1);
  IPAddress subnet(255, 255, 255, 0);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  WiFi.config(localIP, gateway, subnet);
  
  Serial.print("Connected to WiFi. IP address: ");
  Serial.println(WiFi.localIP());
  
  server.on("/", handleRoot);
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
}
