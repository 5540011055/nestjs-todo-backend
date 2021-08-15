import { Injectable } from '@nestjs/common';
import { TodoList } from './entity/todo-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  // todoArray: TodoList[] = [];

  constructor(
    @InjectRepository(TodoList)
    private readonly todoRepository: Repository<TodoList>,
  ) {}

  async createOrUpdate(todo: TodoList): Promise<TodoList> {
    return await this.todoRepository.save(todo);
  }

  async findOne(id: number): Promise<TodoList> {
    return await this.todoRepository.findOne({ id: id });
  }

  async findAll(): Promise<TodoList[]> {
    return await this.todoRepository.find();
  }

  // async delete(id: number): Promise<DeleteResult> {
  //   return await this.todoRepository.delete({ id: id });
  // }
  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }

  async findByUserId(userId: string) {
    return await this.todoRepository.query(
      'select * from todo_list where userId = "' + userId + '" ',
    );
  }
}
