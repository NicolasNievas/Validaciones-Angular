import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Programador } from '../interfaces/programador';
import { CommonModule } from '@angular/common';
import { ProgService } from '../services/prog.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  //providers: [ProgService]
})
export class FormComponent {
  //@Output() enviadoEmit = new EventEmitter<Programador>();
  prog : Programador = new Programador();
  listHabilidades : string[] = [
    'Angular', 'React', 'Vue', 'Java', 'C#', 'Python',
  ]
  habilidadesSeleccionada: string = '';

  //son lo mismo
  //constructor(private progService: ProgService) { }
  private progServiceInject = inject(ProgService);

  sendForm(form : NgForm) {
    if(form.valid) {
      console.log(this.prog);
      this.progServiceInject.addPush(this.prog);
      //this.enviadoEmit.emit(this.prog);
      this.prog = new Programador();
      this.habilidadesSeleccionada = '';
    } else {
      alert('Faltan datos');
    }
  }

  agregarHabilidades(){
    if(!this.prog.habilidades.includes(this.habilidadesSeleccionada)){
      this.prog.habilidades.push(this.habilidadesSeleccionada);
    }
  }

  eliminarHabilidad(index: number){
    this.prog.habilidades.splice(index, 1);
    }
}
