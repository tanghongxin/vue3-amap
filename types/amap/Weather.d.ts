declare namespace AMap {
  /**
   * @description plugins - 天气查询服务，根据城市名称或区域编码返回城市天气预报信息，包括实时天气信息和四天天气预报。
   * https://lbs.amap.com/api/jsapi-v2/documentation#weather
   */
  export class Weather {
    constructor();

    /**
     * 查询实时天气信息
     * @param city
     * @param callback
     */
    getLive(city: string, callback: WeatherLiveCallback): void;

    /**
     * 查询四天预报天气，包括查询当天天气信息
     * @param city
     * @param callback
     */
    getForecast(city: string, callback: WeatherForecastCallback): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface WeatherLiveCallback {
    err: object | null;
    liveData: {
      info: string;
      province: string;
      city: string;
      adcode: string;
      weather: string;
      temperature: string;
      windDirection: string;
      windPower: number;
      humidity: string;
      reportTime: string;
    };
  }

  export interface WeatherForecastCallback {
    err: object | null;
    forecastData: {
      info: string;
      province: string;
      city: string;
      adcode: string;
      reportTime: string;
      forecast: Array<{
        date: string;
        week: string;
        dayWeather: string;
        nightWeather: string;
        dayTemp: number;
        nightTemp: number;
        dayWindDir: string;
        dayWindPower: string;
        nightWindPower: string;
      }>;
    };
  }
}
