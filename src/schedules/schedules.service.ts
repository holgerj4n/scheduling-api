import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { Schedule } from "./models/schedule";
import { PutScheduleRequest } from "./models/put-schedule-request";
import { PostScheduleRequest } from "./models/post-schedule-request";
import { PrismaClient } from "@prisma/client";
import { TaskService } from "./../task/task.service";

@Injectable()
export class SchedulesService extends PrismaClient {
    constructor (private readonly taskService: TaskService) {
        super();
    }

    async create(data: PostScheduleRequest): Promise<Schedule> {
        const schedule = {
            id: uuid(),
            account_id: data.account_id,
            agent_id: data.agent_id,
            start_time: new Date(data.start_time),
            end_time: new Date(data.end_time)
        }
        return this.schedule.create({ data: schedule });
    }

    async findById(schedule_id: string): Promise<Schedule> {
        return this.schedule.findUniqueOrThrow({ 
            where: { id: schedule_id }
        });
    }

    async findByAccount(account_id: number): Promise<Schedule[]> {
        return this.schedule.findMany({
            where: { account_id: account_id }
        });
    }

    async update(schedule_id: string, data: PutScheduleRequest): Promise<Schedule> {
        return this.schedule.update({
            where: { id: schedule_id },
            data: data
        })
    }

    async remove(schedule_id: string) {
        const removeTasks = this.taskService.removeAllForSchedule(schedule_id);
        const removeSchedule = this.schedule.delete({
            where: { id: schedule_id }
        });
        await this.$transaction([removeTasks, removeSchedule]);
    }
}