import type { UrlObject } from 'url';

export interface routeOptions {
  element?: any;
  name: string;
  icon?: string;
  params?: any;
}

export default class RouteBuilder<T> {
  path: string = '';
  name: string | undefined = '';
  params!: T;
  queryParams: { [key: string]: string | number } = {};

  setRouteParams(params: RouteBuilder<T>['params']) {
    this.params = params;
    return this;
  }

  setQueryParams(queryParams: any) {
    this.queryParams = queryParams;
    return this;
  }


  constructor(path: string, options?: routeOptions) {
    this.path = path;
    if (options) {
      this.name = options.name;
    }
    return this;
  }


  getPathWithParams(params: RouteBuilder<T>['params']) {
    let urlArr = String(this.path).split('/');
    let url: any;
    for (let [key, value] of Object.entries(params)) {
      url = urlArr.map(item => item.replace(`[${key}]`, String(value)));
    }
    return url.join('/');
  }
}