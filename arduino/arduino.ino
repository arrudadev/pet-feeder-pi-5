#include "WiFiEsp.h"
#include <ArduinoJson.h>
#include <Servo.h>

#define WIFI_SSID "" // your network SSID (name)
#define WIFI_PASSWORD "" // your network password

Servo servoMotor;
WiFiEspClient espClient;

char server[] = "";
int port = 0;

int status = WL_IDLE_STATUS; // the Wifi radio's status
const int servoDigitalPin = 6; //Digital pin used by the servo motor

unsigned long lastConnectionTime = 0; // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 1000; // delay between updates, in milliseconds

void setup() {
  // initialize serial for debugging
  Serial.begin(115200);
  
  // initialize serial for ESP module
  Serial3.begin(115200);

//  setupWifiConnection();

  servoMotor.attach(servoDigitalPin); // Association of digital pin to object of Servo type
  servoMotorInitialPosition();
}

void loop() {
  delay(2000);
  servoMotorFeedPosition();
  delay(2000);
  servoMotorInitialPosition();
  /*
  while (espClient.available()) {
    handleHttpResponse();
  }

  // if postingInterval seconds have passed since your last connection,
  // then connect again and send data
  if (millis() - lastConnectionTime > postingInterval) {
    httpRequest();
  }
  */
}

void setupWifiConnection() {
  // initialize ESP module
  WiFi.init(&Serial3);

  // check for the presence of the shield
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue
    while (true);
  }

  // attempt to connect to WiFi network
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(WIFI_SSID);
    
    // Connect to WPA/WPA2 network
    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  }

  // you're connected now, so print out the data
  Serial.println("You're connected to the network");
  printWifiStatus();
}

void printWifiStatus() {
  // print the SSID of the network you're attached to
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength
  long rssi = WiFi.RSSI();
  Serial.print("Signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

void httpRequest() {
  // close any connection before send a new request
  // this will free the socket on the WiFi shield
  espClient.stop();

  // if there's a successful connection
  if (espClient.connect(server, port)) {
    Serial.println("Connecting...");    
    
    // send the HTTP PUT request
    espClient.println(F("GET /feed HTTP/1.1"));
    espClient.println("Host: " + String(server));
    espClient.println("Connection: close");
    espClient.println();

    // note the time that the connection was made
    lastConnectionTime = millis();
  }
  else {
    // if you couldn't make a connection
    Serial.println("Connection failed");
  }
}

void handleHttpResponse() {
  // ignore headers and read to first json bracket
  espClient.readStringUntil('{');

  // get json body (everything inside of the main brackets)
  String jsonStrWithoutBrackets = espClient.readStringUntil('}');

  // Append brackets to make the string parseable as json
  String jsonStr = "{" + jsonStrWithoutBrackets + "}";

  Serial.println(jsonStr);

  if (jsonStr.indexOf('{', 0) >= 0) {
    const size_t bufferSize = JSON_OBJECT_SIZE(1) + 20;
    DynamicJsonBuffer jsonBuffer(bufferSize);

    JsonObject &responseJson = jsonBuffer.parseObject(jsonStr);
    
    const char *feedStatus = responseJson["feed"];

    if (String(feedStatus) == "FEED_NOW") {
      servoMotorFeedPosition();
    } else {
      servoMotorInitialPosition();
    }
  }
}

void servoMotorInitialPosition() {
  servoMotor.write(0);
}

void servoMotorFeedPosition() {
  servoMotor.write(90);
}
