import { FormControl, ValidationErrors } from "@angular/forms";

//Validador de fecha que no permite que la fecha de inicio sea mayor a la fecha de hoy
//Se puede utilizar en toda la app

export class ValidatorFecha{
    static validarFecha(control: FormControl) : ValidationErrors | null {
        const fecha = new Date(control.value);
        const fechaHoy = new Date();

        if(fecha > fechaHoy){
            alert('La fecha de inicio no puede ser mayor a la fecha de hoy');
            return {errorFechaInicio: true};
        }
        return null;
    }
}