import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  url='/api/';
  constructor(private http: HttpClient) { }

  getFacturas(): Observable<any> {
    return this.http.get(this.url+'Factura/getFacturas');
  }

  eliminarfactura(id: number): Observable<any> {
    return this.http.delete(this.url+'Factura/delFactura?id='+id);
  }

  guardarfactura(factura: factura): Observable<any> {
    return this.http.post(this.url+'Factura/addFactura', factura);
  }

}
