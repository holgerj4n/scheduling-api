import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { Schedule } from "./models/schedule";
import { PutScheduleRequest } from "./models/put-schedule-request";
import { PostScheduleRequest } from "./models/post-schedule-request";

@Injectable()
export class SchedulesService {
    private readonly schedules: Schedule[] = [];

    create(data: PostScheduleRequest): Schedule {
        const schedule = {
            id: uuid(),
            account_id: data.account_id,
            agent_id: data.agent_id,
            start_time: new Date(data.start_time),
            end_time: new Date(data.end_time)
        }
        this.schedules.push(schedule);
        return schedule;
    }

    findById(schedule_id: string): Schedule | undefined {
        return this.schedules.find(x => x.id === schedule_id);
    }

    findByAccount(account_id: number): Schedule[] {
        return this.schedules.filter(x => x.account_id === account_id);
    }

    update(schedule_id: string, data: PutScheduleRequest): Schedule | undefined {
        const schedule = this.schedules.find(x => x.id === schedule_id);
        if (schedule) {
            schedule.agent_id = data.agent_id ?? schedule.agent_id;
            schedule.start_time = data.start_time ? new Date(data.start_time) : schedule.start_time;
            schedule.end_time = data.end_time ? new Date(data.end_time) : schedule.end_time;
        }
        return schedule;
    }

    remove(schedule_id: string) {
        const index = this.schedules.findIndex(x => x.id === schedule_id);
        this.schedules.splice(index, 1);
    }
}