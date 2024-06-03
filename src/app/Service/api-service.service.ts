import { Injectable } from '@angular/core';
import axios from 'axios'
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  list:any;
  tasks:any;
  isCompleted:any;

  constructor() {

   }



   //LIST API

  async showList(){
    try {
      const response=await axios.get('http://localhost:3000/showlist/');
      if(response.status==200){
        this.list=response.data;
        console.log(response.data);
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  async createList(name:string){
    try {
      const response=await axios.post('http://localhost:3000/showlist/createlist',{name:name})
      if(response.status==200){
        console.log("Creation Successfull");
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  async editList(name:string,id:string){
    try {
      console.log(name+id);
      
      const response=await axios.post('http://localhost:3000/showlist/editlist/',{name:name,id:id})
      if(response.status==200){
        console.log("Editing Successfull");
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  async deleteList(name:any){
    try {
      const response=await axios.delete(`http://localhost:3000/showlist/deletelist/${name}`,{withCredentials:true})
      if(response.status==200){
        console.log("Deleting Successfull");
      }
    } catch (error) {
      console.log(error);
      
    }
  }





  //TASK API

  async getTasks(id:any):Promise<any>{
    try {
      const response=await axios.get(`http://localhost:3000/showlist/${id}/tasks`,{withCredentials: true});
      if(response.status==200){
        this.tasks=response.data.task;
        this.isCompleted=response.data.isCompleted;
        console.log(this.tasks + this.isCompleted);
        return [this.tasks,this.isCompleted];

      }
    } catch (error) {
      console.log(error);
      
    }
  }
  async createTask(task:any,name:string){
    try {
      console.log(task);
      await axios.post(`http://localhost:3000/showlist/${name}/tasks`,{value:task},{withCredentials:true});
    } catch (error) {
      console.log(error);
      
    }
  }
  async editTask(name:string,index:any,listname:string){
    try {
      console.log(name+index+listname);
      
      const response=await axios.post('http://localhost:3000/showlist/editTask',{name:name,index:index,listname:listname})
      if(response.status==200){
        console.log("Editing Successfull");
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  //Task Completion Toggle
  async taskCompletion(index:number,listname:string){
    console.log(index);
    await axios.post(`http://localhost:3000/showlist/tasks/changeCompletion`,{i:index,listname:listname},{withCredentials:true});
  }
  async deleteTask(name:string,i:any){
    try {
      console.log(i,name);
      await axios.delete(`http://localhost:3000/showlist/${name}/tasks/${i}`,{withCredentials:true});
    } catch (error) {
      console.log(error);
      
    }
  }

}