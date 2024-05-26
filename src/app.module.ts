import { Module } from '@nestjs/common';
import { SchedulesModule } from './schedules/schedules.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [SchedulesModule, TaskModule]
})
export class AppModule {}
