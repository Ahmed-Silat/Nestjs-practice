import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './types';
import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('')
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }

  @Get('/:id')
  async getSpecificTodo(
    // @Param() param:{id:string}
    @Param('id') id: string,
  ): Promise<Todo> {
    // return this.todoService.getTodoById(param.id);
    const todo = await this.todoService.getTodoById(Number(id));
    if (todo) {
      return todo;
    }
    throw new NotFoundException('Not found todo');
  }

  @Post('')
  postTodos(@Body('text') text: string): Todo {
    return this.todoService.createTodo(text);
  }

  @Put('/:id')
  putTodos(@Param('id') id: string, @Body('text') text: string): Todo {
    return this.todoService.updateTodo(Number(id), text);
  }

  @Delete('/:id')
  deleteTodos(@Param('id') id: string): Todo[] {
    return this.todoService.deleteTodo(Number(id));
  }
}
