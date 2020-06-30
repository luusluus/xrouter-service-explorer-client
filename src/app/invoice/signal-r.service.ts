import { Injectable, isDevMode } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ListUnspent} from './models/listunspent.model';
import { environment } from '../../environments/environment';
import { DataModel } from './models/data.model';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private listUnspent$: Subject<ListUnspent[]>;
  
  public data: ListUnspent[];

  private hubConnection: signalR.HubConnection

  constructor(){
    this.listUnspent$ = new Subject<ListUnspent[]>();
  }

  public getListUnspent(): Observable<ListUnspent[]> {
    return this.listUnspent$.asObservable();
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl(environment.ccSpvApiUrl.replace('/api', '') + 'data')
                            .build();

    this.hubConnection
      .start()
      .then(() => {
        if(isDevMode())
          console.log('Connection started')
      })
      .catch(err => {
        if(isDevMode())
          console.log('Error while starting connection: ' + err)
      })
  }

  public endConnection = () => {
    this.hubConnection.stop();
  }

  callback = (data) => {
    this.data = data;
    this.listUnspent$.next(data);
    if(isDevMode()){}
      // console.log(data);
  }

  public addTransferListUnspentDataListener = () => {
    this.hubConnection.on('transferlistunspent', this.callback);
  }

  public removeTransferListUnspentDataListener = () => {
    if(this.hubConnection)
      this.hubConnection.off('transferlistunspent', this.callback);
  }

  // public broadcastChartData = () => {
  //   this.hubConnection.invoke('broadcastchartdata', this.data)
  //   .catch(err => console.error(err));
  // }

  // public addBroadcastChartDataListener = () => {
  //   this.hubConnection.on('broadcastchartdata', (data) => {
  //     this.bradcastedData = data;
  //   })
  // }
  
}
