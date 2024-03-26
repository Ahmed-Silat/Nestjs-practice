import { Body, Injectable } from '@nestjs/common';
import { Todo } from './types';

@Injectable()
export class TodoService {
  private todos: Todo[] = [{ id: 1, text: 'simple todo' }];

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo | undefined {
    const todo = this.todos.find((todo) => todo.id === id);
    return todo;
  }

  createTodo(text: string): Todo {
    const newTodo = { id: this.todos.length + 1, text: text };
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: number, text: string): Todo {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    this.todos[todoIndex] = { ...this.todos[todoIndex], text: text };
    return this.todos[todoIndex];
  }

  deleteTodo(id: number): Todo[] {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(index, 1);
    return this.todos;
  }
}
