import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/vehicle.interface';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VehicleService {

  constructor(private _http: Http) { }

  editedCar;

  baseUrl: string = 'http://localhost:8080/';
  extensionUrl: string = 'desapp-grouph-backend/rest/servicesVehicle/';

  addCar(vehicle: Vehicle): Observable<Response> {
     let url = this.baseUrl + this.extensionUrl + 'createVehicle';
     let header = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions ( { headers: header });

     return this._http.post(url, vehicle, options)
                      .map((res: any) => {
                        return res.json();
                      });
   }

   handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  editCar(vehicle: Vehicle): Observable<Response> {
     let url = this.baseUrl + this.extensionUrl + 'updateVehicle';
     let header = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions ( { headers: header });

     return this._http.put(url, vehicle, options)
                      .map((res: any) => {
                        return res._body;
                      });
  }

  deleteCar(id: number): Observable<Response> {
    let url = this.baseUrl + this.extensionUrl + 'deleteVehicle/' + id;
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions ( { headers: header });

     return this._http.delete(url, options)
                      .map((res: any) => {
                        return res._body;
                      });
  }


}
