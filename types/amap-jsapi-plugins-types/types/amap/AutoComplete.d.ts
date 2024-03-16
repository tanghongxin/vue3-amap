declare namespace AMap {
  /**
   * @description plugins - 根据输入关键字提示匹配信息
   * https://lbs.amap.com/api/jsapi-v2/documentation#autocomplete
   */
  export class AutoComplete {
    constructor(options?: AutoCompleteOptions);

    /**
     * 设置提示Poi类型，多个类型用“|”分隔，POI相关类型请在网站“相关下载”处下载，目前只支持Poi类型编码如“050000” 默认值：所有类别
     * @param type
     */
    setType(type: string): void;

    /**
     * 设置城市
     * @param city
     */
    setCity(city: string): void;

    /**
     * 设置是否强制限制城市
     * @param cityLimit
     */
    setCityLimit(cityLimit: boolean): void;

    /**
     * 根据输入关键字提示匹配信息，支持中文、拼音
     * @param keyword
     * @param callback
     */
    search(keyword: string, callback?: AutoCompleteSearchCallback): void;

    on(type: string, fn: any, context?: any, once?: boolean): void;

    off(type: string, fn: any, context?: any, once?: boolean): void;
  }

  export interface AutoCompleteOptions {
    type?: string;
    city?: string;
    datatype?: string;
    citylimit?: boolean;
    input?: string | HTMLDivElement;
    output?: string | HTMLDivElement;
    outPutDirAuto?: boolean;
    closeResultOnScroll?: boolean;
    lang?: string;
  }

  export interface AutoCompleteSearchCallback {
    status: 'complete' | 'error' | 'no_data';
    result: AutoCompleteSearchSearchResult | string | 0;
  }

  interface AutoCompleteSearchSearchResult {
    info: string;
    count: number;
    tips: Array<{
      name: string;
      district: string;
      adcode: string;
    }>;
  }
}
