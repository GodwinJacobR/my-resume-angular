import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './errorpage/errorpage.component';
import { HomeComponent } from './home/home.component';
import { CertificationsComponent } from './certifications/certifications.component';


const routes: Routes = [
 {path: '', redirectTo: '/home', pathMatch: 'full'},
 {path: 'home', component: HomeComponent},
 {path: 'auth', component: AuthComponent},
 {path: 'certifications', component: CertificationsComponent},
 { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page Not Found'} },
 { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
