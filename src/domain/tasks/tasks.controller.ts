import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth';
import { CreateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() { user }, @Body() body: CreateTaskDto) {
    return await this.tasksService.create(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll(@Req() { user }) {
    return await this.tasksService.findAll(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneById(@Req() { user }, @Param('id') id: string) {
    return await this.tasksService.delete(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() { user },
    @Param('id') id: string,
    @Body() body: CreateTaskDto,
  ) {
    return await this.tasksService.update(user.id, id, body);
  }
}
