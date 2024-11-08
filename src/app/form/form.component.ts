import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Programador } from '../interfaces/programador';
import { CommonModule } from '@angular/common';
import { ProgService } from '../services/prog.service';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ValidatorFecha } from '../validatorFecha';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  //providers: [ProgService]
})
export class FormComponent implements OnInit{
  //son lo mismo
  //constructor(private progService: ProgService) { }
  private progServiceInject = inject(ProgService);
  private router = inject(Router);

  habilidadesSeleccionada = new FormControl(); //Control para la habilidad seleccionada

  form: FormGroup = new FormGroup({
    //controls deben ser igual a los nombres del HTML
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)], this.dniUnicoValidadr()),
    //FormArray ejemplo para un combo
    //Vacio para mandarle una coleccion de habilidades y el validador unicaHabilidadValidator
    habilidades: new FormArray([], [Validators.required, this.unicaHabilidadValidator]), 
    contacto: new FormGroup({
       email: new FormControl('', [Validators.required, Validators.email]),
       //FormArray ejemplo para enviar un string, un input
       redSocial: new FormArray([]) //Vacio para mandarle una coleccion de redes sociales
    }),
    //FormArray ejemplo para un objeto completo
    proyectos: new FormArray([]),
  });

  // ---------------------- FormArray ----------------------

  //Pasos para crear un formulario reactivo (FormArray) Get , Add , Remove
  //Este es el Get (es un getter para obtener las habilidades)
  get habilidades(){
    //Llamamos al formulario (form) y a la propiedad controls y dentro de control contiene las propiedades, validaciones, etc
    //en este caso habilidades
    return this.form.controls['habilidades'] as FormArray; //Casteamos a FormArray
  }

  //Este es el Add
  agregarHabilidad(){
    const habilidad = new FormControl(this.habilidadesSeleccionada.value)
    this.habilidades.push(habilidad); //El push recibe un control, no se le puede pasar un string
  }
  
  //Este es el Remove
  eliminarHabilidad(index: number){
    this.habilidades.removeAt(index);
  }

  //Mismos pasos para RedSocial

  get redSocial(){
    //Llamamos al formulario (form) y a la propiedad controls busca la propiedad contacto 'Objeto dentro de mi Formulario' y
    // dentro de contacto y con get obtenemos el valor de redSocial
    return this.form.controls['contacto'].get('redSocial') as FormArray;
  }

  // Array de inputs para agregar redes sociales
  agregarRedSocial(){
    const redSocial = new FormControl('', [Validators.required]);
    this.redSocial.push(redSocial);
  }

  // Eliminar red social
  eliminarRedSocial(index: number){
    this.redSocial.removeAt(index);
  }

  get proyectos(){
    return this.form.controls['proyectos'] as FormArray;
  }

  //FormArray para agregar objeto completo
  agregarProyecto(){
    const proyect = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      fechaInicio: new FormControl(new Date(), [Validators.required, ValidatorFecha.validarFecha]),
      fechaFin: new FormControl(new Date())
    })
    this.proyectos.push(proyect);
  }

  //Eliminar proyecto
  eliminarProyecto(index: number){
    this.proyectos.removeAt(index);
  }

  // ---------------------- Validacion Asincroica (DNI) ----------------------

  //Validador asincrono para el DNI
  //Devuelve una validacion asincronica. El formulario ya tiene esta propiedad.
  dniUnicoValidadr() : AsyncValidatorFn{
    return (control: AbstractControl) : Observable<ValidationErrors | null> => {
      //Opcion uno para validar el DNI filtrando el DNI del getProg
      const dni = control.value;
      return this.progServiceInject.getProg().pipe(
        map((programadores: Programador[]) => {
          const existe = programadores.some((p) => p.dni === dni);
          return existe ? {dniUnico: true} : null;
        }),
        catchError(() => {
          alert('Error al buscar el DNI');
          return of({error: 'Error al buscar el DNI'});
        })
      );
      //Opcion dos para validar el DNI con un servicio y crear el getProgByDni
      /*
      return this.progServiceInject.getProgByDni(control.value).pipe(
        map(data => {
          return data.length > 0 ? {dniUnico: true} : null;
        }),
        catchError(() => {
          alert('Error al buscar el DNI');
          return of({error: 'Error al buscar el DNI'});
        })
      );
      */
    }
  }

  // ---------------------- Validacion Sincronica ----------------------

  //Validador Sincronico para que no haya habilidades duplicadas
  //Se coloca este metodo en el formGroup de mi formulario cuando definimos que va a ser un FormArray
  unicaHabilidadValidator(formArray: FormArray ): ValidationErrors | null {
    const selectedHabilidades = formArray.controls.map((control) => control.value);
    const unicas = new Set(selectedHabilidades).size === selectedHabilidades.length;
    return unicas ? null : {unicaHabilidad: true};
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //@Output() enviadoEmit = new EventEmitter<Programador>();
  prog: Programador | undefined;
  listHabilidades : string[] = [
    ' Angular', ' React', ' Vue', ' Java', ' C#', ' Python',
  ]

  sendForm() {
    console.log(this.form);
    if (this.form.valid) {
      this.prog = this.form.value as Programador;
      console.log(this.prog);
      this.progServiceInject.addPush(this.prog).subscribe({
        next: (data) => {
          console.log(data);
          alert('Programador agregado');
          this.router.navigate(['/list']);
        },
        error: (error) => {
          console.log(error);
          alert('Error al agregar programador');
        }
      }
      );
    } else{
      alert('Formulario invalido');
    }
  }

  // router para redireccionar a la lista
  onCancel(){
    this.router.navigate(['/list']);
  }
}
