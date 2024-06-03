import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponent } from './COMPONENTS/show-list/show-list.component';
import { ListFormComponent } from './COMPONENTS/list-form/list-form.component';
import { TasksComponent } from './COMPONENTS/tasks/tasks.component';

const routes: Routes = [
  {path:'',redirectTo:'/showlist',pathMatch:'full'},
  {path:'showlist',component:ShowListComponent},
  {path:'listform',component:ListFormComponent},
  {path:':[name]/tasks',component:TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
