import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './employee/add/add.component';
import { DetailComponent } from './employee/detail/detail.component';
import { EditComponent } from './employee/edit/edit.component';
import { ListComponent } from './employee/list/list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee/list', component: ListComponent },
  { path: 'employee/detail/:id', component: DetailComponent },
  { path: 'employee/add', component: AddComponent },
  { path: 'employee/edit/:id', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
