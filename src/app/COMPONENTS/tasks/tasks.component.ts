import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../Service/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent  {
  tasks=[];
  header:any=''
  isTask=true;
  isCompleted=[];

constructor(private  route:ActivatedRoute,private apiservice:ApiServiceService){
  this.route.paramMap.subscribe(params => {
    const name = params.get("[name]");
    this.header=name?.toString();
    this.onTask(this.header);
    console.log(name);
  });
}
  async onTask(id:string){
    [this.tasks,this.isCompleted]= await this.apiservice.getTasks(id); 
  }
  sendData(value:any){
    console.log(value);
    this.createtask(value);
  }

  async createtask(value:any){
    await this.apiservice.createTask(value,this.header);
    this.onTask(this.header);
    console.log(value+this.header);
  }
  async deleteTask(index:any){
    console.log("INDEX: " +index)
    await this.apiservice.deleteTask(this.header,index);
    this.onTask(this.header);
  }
  async editTask(name:string,index:any){
    console.log("INDEX: " +index+"name:"+name)
    await this.apiservice.editTask(name,index,this.header);
    this.onTask(this.header)
  }
  async completion(index:number){
    await this.apiservice.taskCompletion(index,this.header)
  }
}
