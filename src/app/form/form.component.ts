import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Programador } from '../programador';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  prog : Programador = new Programador();
  listHabilidades : string[] = [
    'Angular', 'React', 'Vue', 'Java', 'C#', 'Python',
  ]
  habilidadesSeleccionada: string = '';

  sendForm(form : NgForm) {
    if(form.valid) {
      console.log(this.prog);
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
