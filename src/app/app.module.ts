import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PagesComponent } from './components/pages/pages.component';
import { AdminPagesComponent } from './components/admin-pages/admin-pages.component';
import { AdminAddPageComponent } from './components/admin-add-page/admin-add-page.component';
import { FormsModule } from '@angular/forms';
import { AdminEditPageComponent } from './components/admin-edit-page/admin-edit-page.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';

import { PageService } from './services/page.service';
import { SidebarService } from './services/sidebar.service';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UploadlogoComponent } from './components/uploadlogo/uploadlogo.component';

const appRoutes:Routes =[
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},  
  {path:'admin/pages',component:AdminPagesComponent},
  {path:'admin/addpage',component:AdminAddPageComponent},
  {path:'admin/editpage/:PageId',component:AdminEditPageComponent},
  {path:'admin/sidebar',component:AdminSidebarComponent},
  {path:'admin/upload-logo',component:UploadlogoComponent},
  {path:'',component:PagesComponent},
  {path:':pages',component:PagesComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PagesComponent,
    AdminPagesComponent,
    AdminAddPageComponent,
    AdminEditPageComponent,
    AdminSidebarComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AdminNavbarComponent,
    UploadlogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PageService,
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
