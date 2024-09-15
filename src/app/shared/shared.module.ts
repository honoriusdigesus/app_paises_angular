import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { SearchComponent } from './components/search/search.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    SidebarComponent,
    ContactPageComponent,
    SearchComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],exports: [
    HomePageComponent,
    AboutPageComponent,
    SidebarComponent,
    ContactPageComponent,
    SearchComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
