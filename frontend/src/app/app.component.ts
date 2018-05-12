import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private _http:Http) {
    this.c1.name = "eli"
   }
  title = 'app';
  c1:Cust = new Cust();
  usr:User = new User();
  taskList: Task[] = []

  ngOnInit() {
    this.getUser();
    this.getTasks();
  }

  getUser(){
    this.getUserData().subscribe(b => this.usr = b)
  }

  getTasks(){
    this.getTasksData().subscribe(b => this.taskList = b)
  }

  click1(){
    this.getAllBooks().subscribe(b => this.c1 = b)
  }
 
  getAllBooks()
  {
    return this._http
          .get(environment.API_URL+"/getcust/")
          .pipe(map(r => <Cust>r.json()))
  }

  getUserData()
  {
    return this._http
          .get(environment.API_URL+"/getuser/")
          .pipe(map(r => <User>r.json()))
  }

  getTasksData()
  {
    return this._http
          .get(environment.API_URL+"/gettasks/")
          .pipe(map(r => <Task[]>r.json()))
  }

}
 
export class Cust{
    name:string;
    age:number;
    city:string;
}

export class User{  
  id:number;
  name:string;
  email:string;
}

export class Task{  
  id:number;
  title:string;
  description:string;
  created:string;
  updated:string;
  created_by:number;
  assigned_to:number;
  assigned_on:string;
  completed_on:string;
  target_date:string;
  status:string;
}