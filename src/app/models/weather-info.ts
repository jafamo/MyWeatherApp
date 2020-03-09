export interface WeatherInfo {
   ts: number;          //tiempo de adquisición (milisegundos)
   desc?: string;       //descripcion tiempo
   icon?: string;       //icono para tiempo
   temp: number;        //temperatura
   temp_max?: number;   //temperatura maxima
   temp_min?: number;   //temperatura minima
   clouds?: number;     //% de nubes
   humidity?: number;   //% humedad
   pressure?: number;   //presión
   wind?: number;       //velocidad del viento
   rain?: number;       //volumen de lluvia
   snow?: number;       //volumen de nieve
}
