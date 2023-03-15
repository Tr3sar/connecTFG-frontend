import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConexionListComponent } from './conexiones/conexion-list/conexion-list.component';
import { PublicationListComponent } from './feed/publication-list/publication-list.component';
import { GrupoListComponent } from './grupo/grupo-list/grupo-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "", redirectTo: "feed", pathMatch: "full"},
  {path: "feed",component: PublicationListComponent},
  {path: "conexiones",component: ConexionListComponent},
  {path: "grupo",component: GrupoListComponent},

  {path: "login",component: LoginComponent},
  {path:"**", redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
