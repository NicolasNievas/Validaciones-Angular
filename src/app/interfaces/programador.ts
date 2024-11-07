import { Contacto } from './contacto';

export interface Programador {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    habilidades: string[];
    contacto: Contacto;
    proyectos: Proyectos[];
}

export interface Proyectos{
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
}

