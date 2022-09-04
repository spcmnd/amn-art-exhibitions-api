export interface WeatherForecast {
  today: string;
  tomorrow: string;
}

export interface WeatherFromGeoCoordinatesResponseDTO {
  properties: {
    forecast: string;
  };
}

export interface WeatherForecastResponseDTO {
  properties: {
    periods: WeatherForecastPeriodDTO[];
  };
}

export interface WeatherForecastPeriodDTO {
  number: number;
  name: string;
  shortForecast: string;
  startTime: string;
}
