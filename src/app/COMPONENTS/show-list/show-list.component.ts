import { Component } from '@angular/core';
import { ApiServiceService } from '../../Service/api-service.service';
import { window } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.scss'
})
export class ShowListComponent {
  detail: any=[];
  tasks:any=[];
  isFormList:boolean=false;
  isTask:boolean=false;
  newListType=''

  constructor(private apiservice:ApiServiceService,private router:Router){
    this.getlist();

  }
  async getlist(){
    await this.apiservice.showList();
    this.detail=this.apiservice.list;
  }

  sendData(value:string){
    console.log(value);
    this.newListType=value;
    this.handlecreate();
  }

  async handlecreate(){
    if(this.newListType.trim()){
      await this.apiservice.createList(this.newListType);
      this.newListType='';
      this.isFormList=false;
      this.getlist();
    }
    else{
      console.log("empty");
      this.newListType='';
      this.isFormList=false;
    }
  }
  async onListclick(name:string){
    this.router.navigateByUrl(`${name}/tasks`)
  }

  async editList(name:any,id:string){
    console.log(name,id);
    this.apiservice.editList(name,id);
    this.getlist();
    
  }

  async deleteList(name:string){
    this.apiservice.deleteList(name);
    this.getlist();
  }
  editllist(value:any){}
}
