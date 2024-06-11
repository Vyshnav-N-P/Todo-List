import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../Service/api-service.service';
import { ActivatedRoute,Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  Lists:any;
  tasks=[];
  header:any=''
  isTask=true;
  isCompleted=[];
  index:number=0;

constructor(private  route:ActivatedRoute,private apiservice:ApiServiceService,private router: Router){
  this.route.paramMap.subscribe(params => {
    const name = params.get("[name]");
    this.header=name?.toString();
    console.log(name);
  });
  const lists:any=localStorage.getItem('Lists');
  this.Lists=JSON.parse(lists);
  for (let index = 0; index < this.Lists.length; index++) {
    const element = this.Lists[index];  
    if(element.name===this.header){
      this.tasks=element.tasks;
      this.isCompleted=element.completion;
      this.index=index;
    }

}
}
ngOnInit(): void {
    this.LoadLocaleStorage()
}
LoadLocaleStorage(){
  if(this.isLocalStorageAvailable()){
    const Storedlists:any=localStorage.getItem(`Lists`);
    const storedTasks=JSON.parse(Storedlists)
    console.log(storedTasks.tasks);
    
    if(storedTasks.tasks && storedTasks.completion){
      this.tasks=storedTasks.tasks;
      this.isCompleted=storedTasks.completion;
      console.log(storedTasks);
      
      console.log("Stored tasks was existing");
    }
    else{
      console.log("Stored tasks was found but empty");
      this.onTask(this.header);
    }
  }
  else{
    console.log("Stored tasks was NOT found but empty");
      this.onTask(this.header);
    }
}
isLocalStorageAvailable(): boolean {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

  async onTask(id:string):Promise<void>{
    [this.tasks,this.isCompleted]= await this.apiservice.getTasks(id);
    if(this.isLocalStorageAvailable()){
      this.UdateLocalStorage(this.index);
    }
  }

  async UdateLocalStorage(i:number):Promise<void>{
    this.Lists[i] = { ...this.Lists[i], tasks: this.tasks, completion: this.isCompleted };
    localStorage.setItem(`Lists`,JSON.stringify(this.Lists)) ;
    console.log(this.Lists);
  }

  sendData(value:any):void{
    console.log(value);
    this.createtask(value);
  }

  async createtask(value:any):Promise<void>{
    await this.apiservice.createTask(value,this.header);
    this.onTask(this.header);
    console.log(value+this.header);
    if(this.isLocalStorageAvailable()){
      this.UdateLocalStorage(this.index);
    }
   
  }
  async deleteTask(index:any):Promise<void>{
    console.log("INDEX: " +index)
    await this.apiservice.deleteTask(this.header,index);
    this.onTask(this.header);
    if(this.isLocalStorageAvailable()){
      this.UdateLocalStorage(this.index);
    }
   
  }
  async editTask(name:string,index:any):Promise<void>{
    console.log("INDEX: " +index+"name:"+name)
    await this.apiservice.editTask(name,index,this.header);
    this.onTask(this.header)
    if(this.isLocalStorageAvailable()){
      this.UdateLocalStorage(this.index);

    }
   
  }
  async completion(index:number):Promise<void>{
    await this.apiservice.taskCompletion(index,this.header)
    if(this.isLocalStorageAvailable()){
      this.UdateLocalStorage(this.index);

    }
   
  }

  homeClick(){
    this.router.navigateByUrl(`/`);
    
  }
}

