#include "WiFiEsp.h"
#include "SoftwareSerial.h"
#include <Servo.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define ORG "p4b5ix" // Organization ID
#define DEVICE_TYPE "arduinomegawifi" // Device type
#define DEVICE_ID "arduinomegawifi01" // Device ID
#define TOKEN "S&aEMl*qNarGDl&++g" // Authentication token

#define WIFI_SSID "Alexandre" // your network SSID (name)
#define WIFI_PASSWORD "14241201" // your network password

Servo servoMotor;
WiFiEspClient espClient;

char server[] = ORG ".messaging.internetofthings.ibmcloud.com";
char authenticationMethod[] = "use-token-auth";
char token[] = TOKEN;
char clientId[] = "d:" ORG ":" DEVICE_TYPE ":" DEVICE_ID;

const char subscribeTopic[] = "iot-2/cmd/commandR1/fmt/json";

int status = WL_IDLE_STATUS; // the Wifi radio's status

const int servoDigitalPin = 6; //Digital pin used by the servo motor

void callback(char* publishTopic, uint8_t* payload, unsigned int payloadLength);

PubSubClient mqttClient(server, 1883, callback, espClient);

int counter = 0;

void setup() {
  // initialize serial for debugging
  Serial.begin(115200);
  
  // initialize serial for ESP module
  Serial3.begin(115200);

  configureWifiConnection();

  connectToTheIBMCloudMQTTWhenNotConected();
    
  servoMotor.attach(servoDigitalPin); // Association of digital pin to object of Servo type
  servoMotor.write(0); // Starts the servo motor at 0 degrees
}

void loop() { 
  connectToTheIBMCloudMQTTWhenNotConected();
  
//  delay(3000);
//  servoMotor.write(90); // Rotates at 90 degrees
//  delay(3000);
//  servoMotor.write(0); // Returns to 0 degrees
}

void configureWifiConnection() {
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

void callback(char* publishTopic, uint8_t* payload, unsigned int length) {
  Serial.println("callback invoked");
}

void connectToTheIBMCloudMQTTWhenNotConected() {
  if (!!!mqttClient.connected()) {
    Serial.print("Reconnecting client to ");
    Serial.println(server);
    while (!!!mqttClient.connect(clientId, authenticationMethod, token)) {
      mqttClient.subscribe(subscribeTopic);
      Serial.print(".");
      delay(500);
    }
    Serial.println();
  }
}

//void loop() {
//  while (client.available()) {
//    handleHttpResponse();
//  }
//
//  // if postingInterval seconds have passed since your last connection,
//  // then connect again and send data
//  if (millis() - lastConnectionTime > postingInterval) {
//    httpRequest();
//  }
//}
//
//// this method makes a HTTP connection to the server
//void httpRequest() {
//  Serial.println();
//    
//  // close any connection before send a new request
//  // this will free the socket on the WiFi shield
//  client.stop();
//
//  // if there's a successful connection
//  if (client.connect(server, port)) {
//    Serial.println("Connecting...");    
//    
//    // send the HTTP PUT request
//    client.println(F("GET /actions HTTP/1.1"));
//    client.println("Host: " + String(server));
//    client.println("Connection: close");
//    client.println();
//
//    // note the time that the connection was made
//    lastConnectionTime = millis();
//  }
//  else {
//    // if you couldn't make a connection
//    Serial.println("Connection failed");
//  }
//}
//
//void handleHttpResponse() {
//  // ignore headers and read to first json bracket
//  client.readStringUntil('{');
//
//  // get json body (everything inside of the main brackets)
//  String jsonStrWithoutBrackets = client.readStringUntil('}');
//
//  // Append brackets to make the string parseable as json
//  String jsonStr = "{" + jsonStrWithoutBrackets + "}";
//
//  Serial.println(jsonStr);
//
//  if (jsonStr.indexOf('{', 0) >= 0) {
//    const size_t bufferSize = JSON_OBJECT_SIZE(1) + 20;
//    DynamicJsonBuffer jsonBuffer(bufferSize);
//
//    JsonObject &responseJson = jsonBuffer.parseObject(jsonStr);
//
//    // get and print the value of the action key in our json object
//    const char *action = responseJson["action"];
//    const char *plug = responseJson["plug"];
//    
//    Serial.println("action -> " + String(action));
//    Serial.println("plug -> " + String(plug));
//  }
//}
