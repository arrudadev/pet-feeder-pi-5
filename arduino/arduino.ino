#include <Servo.h>

const int servoDigitalPin = 6; //Digital pin used by the servo motor

Servo servoMotor;

void setup() {
  delay(2000);
  servoMotor.attach(servoDigitalPin); // Association of digital pin to object of Servo type
  servoMotor.write(0); // Starts the servo motor at 0 degrees
}

void loop() {
  delay(5000);
  servoMotor.write(90); // Rotates at 90 degrees
  delay(5000);
  servoMotor.write(0); // Returns to 0 degrees
}
