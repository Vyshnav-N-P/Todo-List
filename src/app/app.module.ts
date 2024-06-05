import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { ShowListComponent } from './COMPONENTS/show-list/show-list.component';
import { ListFormComponent } from './COMPONENTS/list-form/list-form.component';
import {MatDialog} from '@angular/material/dialog';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TasksComponent } from './COMPONENTS/tasks/tasks.component';
import { EditmodalComponent } from './COMPONENTS/editmodal/editmodal.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowListComponent,
    ListFormComponent,
    TasksComponent,
    EditmodalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgClass,
    NgIf,
    NgFor,
    RouterLink,
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
