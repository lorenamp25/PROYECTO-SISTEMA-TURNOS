import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../models';


@Injectable({
  providedIn: 'root'
})
export class TurnoService {
    url = "http://localhost/api/turnos"

    constructor(private http: HttpClient) {}

    getTurno(turnoId: string | null): Observable<any>  {
      return this.http.get(this.url + "/" + turnoId)
    }

    getListaTurnos(): Observable<any> {
        return this.http.get(this.url)
    }

    getTurnosDisponibles(): Observable<any> {
      return this.http.get("http://localhost/api/turnos/disponibles") 
    }

    reservarTurno(fecha: string, hora: string): Observable<any> {
      let body = {
        fecha,
        hora,
      }
      return this.http.post(this.url, body)
    }

    solicitarTurno(turno: Turno): Observable<any> {
      return this.http.post(this.url, turno)
    }
}

