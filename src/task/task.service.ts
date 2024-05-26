import { Injectable } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { PostTaskRequest } from './models/post-task-request';
import { PutTaskRequest } from './models/put-task-request';
import { Task } from './models/task';

@Injectable()
export class TaskService {
    private readonly tasks: Task[] = [];

    create(data: PostTaskRequest): Task {
        const task = {
            id: uuid(),
            schedule_id: data.schedule_id,
            start_time: new Date(data.start_time),
            duration: data.duration,
            type: data.type
        }
        this.tasks.push(task);
        return task;
    }

    findById(task_id: string): Task | undefined {
        return this.tasks.find(x => x.id === task_id);
    }

    findBySchedule(schedule_id: string): Task[] {
        return this.tasks.filter(x => x.schedule_id === schedule_id);
    }

    update(task_id: string, data: PutTaskRequest): Task | undefined {
        const task = this.tasks.find(x => x.id === task_id);
        if (task) {
            task.start_time = data.start_time ? new Date(data.start_time) : task.start_time;
            task.duration = data.duration ?? task.duration;
            task.type = data.type ?? task.type;
        }
        return task;
    }

    remove(task_id: string) {
        const index = this.tasks.findIndex(x => x.id === task_id);
        this.tasks.splice(index, 1);
    }
}