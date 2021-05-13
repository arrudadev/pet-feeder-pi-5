#include "WiFiEsp.h"
#include <Servo.h>

char ssid[] = "";      // your network SSID (name)
char password[] = "";  // your network password

int status = WL_IDLE_STATUS; // the Wifi radio's status

const int servoDigitalPin = 6; //Digital pin used by the servo motor

Servo servoMotor;

WiFiEspClient client; // Initialize the Ethernet client object

void setup() {
  // initialize serial for debugging
  Serial.begin(115200);
  
  // initialize serial for ESP module
  Serial3.begin(115200);

  configureWifiConnection();
    
  servoMotor.attach(servoDigitalPin); // Association of digital pin to object of Servo type
  servoMotor.write(0); // Starts the servo motor at 0 degrees
}

void loop() {
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
    Serial.println(ssid);
    
    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, password);
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
