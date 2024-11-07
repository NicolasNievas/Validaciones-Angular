import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ProgService } from '../services/prog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Programador } from '../interfaces/programador';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  private readonly progService = inject(ProgService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  programador: Programador | undefined;

  ngOnInit(): void {
    //Obtener el id del programador
      const id = this.route.snapshot.paramMap.get('id');
      //Si existe el id, obtener el programador por id
      if(id){
        this.progService.getProgById(id).subscribe({
          next: (prog) => {
            this.programador = prog;
          },
          //Si hay un error, mostrarlo en consola y redirigir a la lista
          error: (error) => {
            console.error(error);
            this.router.navigate(['/list']);
          }
        })
      }
  }

  //Redirigir a la lista con boton 'Volver'
  goBack(){
    this.router.navigate(['/list']);
  }
}
