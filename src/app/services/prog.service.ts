import { Injectable } from '@angular/core';
import { Programador } from '../interfaces/programador';

@Injectable({
  providedIn: 'root'
})
export class ProgService {

  private ltsProgramadores: Programador[] = [];

  addPush(p : Programador){
    this.ltsProgramadores.push(p);
  }

  getProg(){
    return this.ltsProgramadores;
  }

  deleteProg(index: number){
    this.ltsProgramadores.splice(index, 1);
  }

}
