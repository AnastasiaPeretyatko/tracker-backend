import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { ApiException } from 'src/common/exceptions/api.exceptions';
import { TaskScheduleService } from '../task_schedule';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskScheduleService: TaskScheduleService,
  ) {}

  async findOneById(id: string) {
    return await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.taskSchedule', 'taskSchedule')
      .leftJoinAndSelect('task.taskLogs', 'taskLogs')
      .where('task.id = :id', { id })
      .getOne();
  }

  async create(userId: string, body: CreateTaskDto) {
    const { title, description, ...scheduleData } = body;

    const task_schedule = await this.taskScheduleService.create(scheduleData);

    const task = this.taskRepository.create({
      title,
      description,
      ownerId: userId,
      taskSchedule: task_schedule,
    });

    await this.taskRepository.save(task);

    return this.findOneById(task.id);
  }

  async update(userId: string, taskId: string, body: UpdateTaskDto) {
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

  async findAll(userId: string) {
    return await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.taskSchedule', 'taskSchedule')
      .leftJoinAndSelect('task.taskLogs', 'taskLogs')
      .where('task.owner_id = :ownerId', { ownerId: userId })
      .andWhere('task.is_active = :isActive', { isActive: true })
      .orderBy('taskLogs.date', 'ASC')
      .getMany();
  }
}
