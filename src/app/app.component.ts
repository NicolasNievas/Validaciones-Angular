import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormComponent } from "./form/form.component";
import { Programador } from './interfaces/programador';
import { ProgService } from './services/prog.service';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from "./list/list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //providers: [ProgService]
})
export class AppComponent {
  title = 'validaciones';
  // lstProgramadores: Programador[] = [];
  // progEdit : Programador = new Programador()

  // private progServiceInject = inject(ProgService);

  // ngOnInit(): void {
  //   //this.lstProgramadores = this.progServiceInject.getProg();
  //     this.getProgramadores();
  // }

  // getProgramadores() {
  //   this.progServiceInject.getProg().subscribe(
  //     (data) => {
  //       this.lstProgramadores = data;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // // pushProg(p: Programador) {
  // //   this.lstProgramadores.push(p);
  // // }
  // eliminarProgramador(index: number) {
  //   //this.lstProgramadores.splice(index, 1);
  //   if(confirm('¿Estás seguro de eliminar el programador?')) {
  //     this.progServiceInject.deleteProg(index);
  //     this.getProgramadores();
  //   }
  // }
  // editar(index: number) {
  //   //TODO:
  //   } 
}
