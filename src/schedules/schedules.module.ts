import { Module } from "@nestjs/common";
import { SchedulesController } from "./schedules.controller";
import { SchedulesService } from "./schedules.service";
import { TaskModule } from "./../task/task.module";

@Module({
    imports: [TaskModule],
    controllers: [SchedulesController],
    providers: [SchedulesService]
})
export class SchedulesModule {}