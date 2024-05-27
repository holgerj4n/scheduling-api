import { Injectable } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { PostTaskRequest } from './models/post-task-request';
import { PutTaskRequest } from './models/put-task-request';
import { Task } from './models/task';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TaskService extends PrismaClient {

    async create(data: PostTaskRequest): Promise<Task> {
        const task = {
            id: uuid(),
            schedule_id: data.schedule_id,
            start_time: new Date(data.start_time),
            duration: data.duration,
            type: data.type
        }
        return this.task.create({ data: task });
    }

    async findById(task_id: string): Promise<Task> {
        return this.task.findUniqueOrThrow({
            where: { id: task_id }
        });
    }

    async findBySchedule(schedule_id: string): Promise<Task[]> {
        return this.task.findMany({
            where: { schedule_id: schedule_id }
        });
    }

    async update(task_id: string, data: PutTaskRequest): Promise<Task> {
        return this.task.update({
            where: { id: task_id },
            data: data
        });
    }

    async remove(task_id: string) {
        return this.task.delete({
            where: { id: task_id }
        });
    }
}