import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Todo'; 
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  
 
  todos:Todo[]=[];
  doneTodos:Todo[]=[];
  
  private URL="http://localhost:5000/todos";
  constructor(private http: HttpClient) {
      }
    
   
  ngOnInit(): void 
  {
    console.log("ngOnInit");
    this.http.get<Todo[]>(this.URL,{responseType:'json'}).subscribe(data=>{
     
      this.initializeTodos(data);
    });
  }

  initializeTodos(list:Todo[])
  {
    list.forEach((todo:Todo)=>
    {
      const currentTodo:Todo={
        _id:todo._id,
        todo:todo.todo,
        isCompleted:todo.isCompleted,
        
      }
      console.log(todo);
      if(todo.isCompleted){
        this.doneTodos.push(currentTodo);
        console.log(currentTodo)
      }
      else{
        this.todos.push(currentTodo);
        console.log(currentTodo)
      }
      
    });
  }

  deleteTodo(todo:Todo){
    console.log(todo);
    if(todo.isCompleted){
      const index= this.doneTodos.indexOf(todo);
      this.doneTodos.splice(index,1);
    }
    else{
      const index= this.todos.indexOf(todo);
      this.todos.splice(index,1);
    }
    this.http.delete(this.URL+"/"+todo._id)
        .subscribe(data =>  console.log(data));
  }
  
  addTodo(todo:Todo){

    console.log(todo);
    console.log("Adding todo");
    this.http.post<any>(this.URL, { todo: todo.todo, isCompleted:todo.isCompleted }).subscribe(data => {
        todo._id = data._id;
    });
    this.todos.push(todo);
  }

  toggleTodo(todo:Todo){
    console.log(todo);
    if(todo.isCompleted){
      const index= this.doneTodos.indexOf(todo);
      todo.isCompleted=false;
      this.todos.push(todo);
      this.doneTodos.splice(index,1);
      
      
    }
    else{
      const index= this.todos.indexOf(todo);
      todo.isCompleted=true;
      this.doneTodos.push(todo);
      this.todos.splice(index,1);
      
    }
    
    this.http.put(this.URL+"/"+todo._id, {todo:todo.todo,isCompleted:todo.isCompleted})
        .subscribe(data =>  console.log(data));
  }
  
}
