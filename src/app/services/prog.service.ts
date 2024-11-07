import { inject, Injectable } from '@angular/core';
import { Programador } from '../interfaces/programador';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgService {
  private $URL = 'http://localhost:3000/programadores';
  private http = inject(HttpClient);

  private ltsProgramadores: Programador[] = [];

  addPush(p : Programador): Observable<Programador>{
    return this.http.post<Programador>(this.$URL, p);
  }

  getProg(): Observable<Programador[]>{
    return this.http.get<Programador[]>(this.$URL);
  }

  getProgById(id: string): Observable<Programador>{
    return this.http.get<Programador>(`${this.$URL}/${id}`);
  }

  // metodo para buscar por dni asincronicamente
  // getProgByDni(dni: string) {
  // }

  deleteProg(id: string): Observable<Programador>{
    return this.http.delete<Programador>(`${this.$URL}/${id}`);
  }

  updateProg(p: Programador): Observable<Programador>{
    return this.http.put<Programador>(`${this.$URL}/${p.id}`, p);
  }

}
