import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './errorpage/errorpage.component';
import { HomeComponent } from './home/home.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { CertificateComponent } from './certifications/certificate/certificate.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { FilterCertsPipe } from './certifications/filter-certs.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    ErrorPageComponent,
    HomeComponent,
    CertificationsComponent,
    CertificateComponent,
    AboutMeComponent,
    FilterCertsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
