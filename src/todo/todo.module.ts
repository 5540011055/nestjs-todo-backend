import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entity/todo-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
