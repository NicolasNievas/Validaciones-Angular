import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
    // Rutas de la aplicación
    {path: 'form', component: FormComponent},
    {path: 'list', component: ListComponent},
    {path: 'detail/:id', component: DetailComponent},
    {path: '', redirectTo: '/list', pathMatch: 'full'}
];
