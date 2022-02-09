import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  @Output() addTodo: EventEmitter<Todo> =new EventEmitter(); 
  text:string;
  

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    if(this.text){
    const todo={
      _id: "89",
      todo:this.text,
      isCompleted:false 
     }
    console.log("some todo has benn submitted");
    this.addTodo.emit(todo);
    }
    else{
    console.log("");
    }
  }

}
