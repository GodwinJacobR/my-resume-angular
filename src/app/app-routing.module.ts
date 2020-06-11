import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './errorpage/errorpage.component';


const routes: Routes = [
 {path: '', redirectTo: '/auth', pathMatch: 'full'},
 {path: 'auth', component: AuthComponent},
 { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page Not Found'} },
 { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
