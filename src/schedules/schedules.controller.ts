import { Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    ValidationPipe } from "@nestjs/common";
import { PostScheduleRequest } from "./models/post-schedule-request";
import { PutScheduleRequest } from "./models/put-schedule-request";
import { SchedulesService } from "./schedules.service";
import { Schedule } from "./models/schedule";
import { GetSchedulesResponse } from "./models/get-schedules-response";

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @Post()
    async create(@Body(ValidationPipe) postScheduleRequest: PostScheduleRequest): Promise<Schedule> {
        console.log(postScheduleRequest);
        return this.schedulesService.create(postScheduleRequest);
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Schedule> {
        console.log(`GET schedule by id ${id}`);
        const schedule = this.schedulesService.findById(id);
        if (!schedule) throw new NotFoundException();
        return schedule;
    }

    @Get()
    async findByAccount(@Query('account', ParseIntPipe) account_id: number): Promise<GetSchedulesResponse> {
        console.log(`GET schedules by account ${account_id}`);
        const schedules = this.schedulesService.findByAccount(account_id);
        return { data: schedules };
    }

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipe) putScheduleRequest: PutScheduleRequest
    ): Promise<Schedule> {
        console.log(putScheduleRequest);
        const schedule = this.schedulesService.update(id, putScheduleRequest);
        if (!schedule) throw new NotFoundException();
        return schedule;
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        this.schedulesService.remove(id);
    }
}