import {Todo} from './todo';

export class TodoList {
	constructor(){
		this.todoList = [];
		this.todoList.push(new Todo('Work one'));
		this.todoList.push(new Todo('Work two'));
		this.todoList.push(new Todo('Work three'));
		this.todoList.push(new Todo('Work four'));
		this.newItem = '';
		
	}

	addTodo(){
		this.todoList.push(new Todo(this.newItem));
		this.newItem = '';
	}

	removeTodo(){
		this.todoList.splice(this.todoList.indexOf(this.todo), 1)
	}
}