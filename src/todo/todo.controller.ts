import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoList } from './entity/todo-list.entity';
import { ConfigService } from '@nestjs/config';

@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private config: ConfigService,
  ) {}

  @Post('/post')
  @HttpCode(HttpStatus.CREATED)
  async createTodo(@Body() newTodo: CreateTodoDto): Promise<TodoList> {
    const todo = new CreateTodoDto();
    todo.userId = newTodo.userId;
    todo.title = newTodo.title;
    todo.subtitle = newTodo.subtitle;
    todo.createdAt = new Date();
    return await this.todoService.createOrUpdate(todo);
  }

  @Get('/get')
  async findAlbums(): Promise<TodoList[]> {
    console.log(__dirname);
    console.log(this.config.get('TEST'));
    return await this.todoService.findAll();
  }

  @Get('/get/:id')
  async findAlbum(@Param('id') id: number): Promise<TodoList> {
    return await this.todoService.findOne(id);
  }

  @Put('/update/:id')
  async updateAlbum(
    @Param('id') id: number,
    @Body() createAlbumDto: CreateTodoDto,
  ): Promise<TodoList> {
    const todo = await this.todoService.findOne(id);
    todo.title = createAlbumDto.title;
    todo.subtitle = createAlbumDto.subtitle;
    return await this.todoService.createOrUpdate(todo);
  }

  @Delete('delete/:id')
  async deleteAlbum(@Param('id') id: number): Promise<any> {
    await this.todoService.delete(id);
    return { success: true };
  }
}
