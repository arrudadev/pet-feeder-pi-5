#include <HX711.h>

// pin configuration for HX711 module
const int PINO_DT = 3;
const int PINO_SCK = 2;

HX711 scale; // declaration of the scale object in the HX711 class of the library

float measure = 0;

void setup () {
  Serial.begin(57600);
  Serial.println("Celula de carga - Calibracao de Peso");
  Serial.println("Posicione um peso conhecido sobre a celula ao comecar as leituras");

  scale.begin(PINO_DT, PINO_SCK); // initialization and definition of the DT and SCK pins inside the scale object
  scale.set_scale(-612740); // Cleaning the scale value

  delay(2000);
  
  scale.tare(); // Zeroing the balance to disregard the structure's mass

  Serial.println("Balança Zerada");
}

void loop () {
  measure = scale.get_units(5);
    
  Serial.print("Leitura: ");
  Serial.println(measure, 3);

  scale.power_down();
  delay(1000);
  scale.power_up();
}
