import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() todoDelete: EventEmitter<Todo> =new EventEmitter();
  @Output() toggle: EventEmitter<Todo> =new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onClick(todo:Todo){
      console.log("onclick has been triggered");
      this.todoDelete.emit(todo);
  }

  onChange(todo:Todo){
    console.log("onChange has benn triggered");
    this.toggle.emit(todo);
}

}
