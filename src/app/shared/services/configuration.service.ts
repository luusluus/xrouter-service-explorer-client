import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ConfigurationService {
  private configuration: IServerConfiguration;
  constructor(private http: HttpClient) { }
  loadConfig() {
    return this.http.get<IServerConfiguration>('/api/Configuration/ConfigurationData')
      .toPromise()
      .then(result => {
        this.configuration = <IServerConfiguration>(result);
      }, error => console.error(error));
  }
  get getWebApiUrl() {
    return this.configuration.WebApiUrl;
  }
}
export interface IServerConfiguration {
    WebApiUrl: string;
}
