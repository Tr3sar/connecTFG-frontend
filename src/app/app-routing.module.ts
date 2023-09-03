import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConexionListComponent } from './conexiones/conexion-list/conexion-list.component';
import { PublicationListComponent } from './feed/publication-list/publication-list.component';
import { GrupoListComponent } from './grupo/grupo-list/grupo-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './core/guards/auth.guard'
import { NotificatonListComponent } from './notifications/notificaton-list/notificaton-list.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "feed", component: PublicationListComponent, canActivate: [AuthGuard] },
  { path: "conexiones", component: ConexionListComponent, canActivate: [AuthGuard] },
  {path: "grupo/:id",component: GrupoListComponent, canActivate: [AuthGuard]},
  { path: "grupo", component: GrupoListComponent, canActivate: [AuthGuard] },
  { path: "notifications", component: NotificatonListComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "profile/:id", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
