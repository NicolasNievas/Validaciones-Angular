import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProgService } from '../services/prog.service';
import { Router } from '@angular/router';
import { Programador } from '../interfaces/programador';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [ProgService]
})
export class ListComponent implements OnInit {
  ltsProgramadors: Programador[] = [];
  filtro = new FormControl('');
  prog: Programador | undefined;
  
  private restService = inject(ProgService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getProgramadors();
  }

  getProgramadors() {
    // filtro para buscar programadores por nombre o apellido dinamicamente
    this.filtro.valueChanges.subscribe( data => {
      if(data === null || data === ''){
        return this.getProgramadors();
      }
      this.ltsProgramadors = this.ltsProgramadors.filter(
        p => p.nombre.toUpperCase().includes(data.toUpperCase()) || p.apellido.toUpperCase().includes(data.toUpperCase())
      )
    })
    this.restService.getProg().subscribe( prog => {
      this.ltsProgramadors = prog;
      console.log(this.ltsProgramadors);
    })
  }

  //Eliminar a un prog por id
  delete(id?: string){
    if(id == null) return;
    if(confirm('¿Estás seguro de eliminar el programador?')) {
      this.restService.deleteProg(id).subscribe(
        () => {
          this.getProgramadors();
        }
      );
    }
  }

  //Redireccionar al formulario con el boton 'Crear Programador'
  navigateToForm() {
    this.router.navigate(['/form']);
  }

  //Redireccionar y mostrar los detalles de un programador por id
  viewDetail(id: string){
    if(id == null) return;
    this.router.navigate(['/detail', id]);
  }
}
