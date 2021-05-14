#include "WiFiEsp.h"
#include "SoftwareSerial.h"
#include <Servo.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define ORG "" // Organization ID
#define DEVICE_TYPE "" // Device type
#define DEVICE_ID "" // Device ID
#define TOKEN "" // Authentication token

#define WIFI_SSID "" // your network SSID (name)
#define WIFI_PASSWORD "" // your network password

Servo servoMotor;
WiFiEspClient espClient;

char server[] = ORG ".messaging.internetofthings.ibmcloud.com";
char authenticationMethod[] = "use-token-auth";
char token[] = TOKEN;
char clientId[] = "d:" ORG ":" DEVICE_TYPE ":" DEVICE_ID;

const char publishTopic[] = "iot-2/evt/status/fmt/json";
const char responseTopic[] = "iotdm-1/response";
const char manageTopic[] = "iotdevice-1/mgmt/manage";
const char updateTopic[] = "iotdm-1/device/update";
const char rebootTopic[] = "iotdm-1/mgmt/initiate/device/reboot";

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
  String payload = "{\"d\":";
  payload += counter++;
  payload += "}";  
  
  Serial.print("Sending payload: ");
  Serial.println(payload);
  
  if (mqttClient.publish(publishTopic, (char *)payload.c_str())) {
    Serial.println("Publish ok");
    connectToTheIBMCloudMQTTWhenNotConected();
  } else {
    Serial.println("Publish failed");
    connectToTheIBMCloudMQTTWhenNotConected();
  }
  
  delay(5000);
  servoMotor.write(90); // Rotates at 90 degrees
  delay(5000);
  servoMotor.write(0); // Returns to 0 degrees
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
      Serial.print(".");
      delay(500);
    }
    Serial.println();
  }
}
