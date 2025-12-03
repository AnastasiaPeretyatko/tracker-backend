import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto';
import { ApiException } from 'src/common/exceptions/api.exceptions';
import { TaskSchedule } from '../task_schedule/task_schedule.entity';
import { TaskScheduleService } from '../task_schedule';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(TaskSchedule)
    private taskScheduleRepository: Repository<TaskSchedule>,
    private readonly taskScheduleService: TaskScheduleService,
  ) {}

  async findAll(userId: string) {
    return await this.taskRepository.find({
      where: { ownerId: userId },
    });
  }

  async findOneById(id: string) {
    return await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.taskSchedule', 'taskSchedule')
      .where('task.id = :id', { id })
      .getOne();
  }

  async create(userId: string, body: CreateTaskDto) {
    const task = this.taskRepository.create({
      title: body.title,
      description: body.description,
      ownerId: userId,
    });

    await this.taskRepository.save(task);

    return await this.findOneById(task.id);
  }

  async update(userId: string, taskId: string, body: CreateTaskDto) {
    const task = await this.findOneById(taskId);
    if (!task) throw ApiException.notFound('Task not found');

    if (task.ownerId !== userId)
      throw ApiException.notAllowed('You are not the owner of this task');

    await this.taskRepository.update(
      { id: taskId },
      { ...body, updatedAt: new Date() },
    );
    return await this.findOneById(taskId);
  }

  async delete(userId: string, taskId: string) {
    const task = await this.findOneById(taskId);
    if (!task) throw ApiException.notFound('Task not found');

    if (task.ownerId !== userId)
      throw ApiException.notAllowed('You are not the owner of this task');

    await this.taskRepository.delete({ id: taskId });

    return {
      statusCode: 200,
      message: 'Task deleted successfully',
    };
  }

  async createTaskSchedule(userId: string, dto: any) {
    const task = await this.create(userId, dto);

    if (!task) throw ApiException.notFound('Task not found');

    const taskSchedule = await this.taskScheduleService.create({
      taskId: task.id,
      ...dto,
    });

    if (!taskSchedule) throw ApiException.notFound('Task schedule not found');

    return await this.findOneById(task.id);
  }
}
