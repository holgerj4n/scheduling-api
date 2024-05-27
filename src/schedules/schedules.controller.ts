import { Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseFilters,
    UsePipes,
    ValidationPipe } from "@nestjs/common";
import { PostScheduleRequest } from "./models/post-schedule-request";
import { PutScheduleRequest } from "./models/put-schedule-request";
import { SchedulesService } from "./schedules.service";
import { Schedule } from "./models/schedule";
import { GetSchedulesResponse } from "./models/get-schedules-response";
import { NotFoundExceptionFilter } from "./../common/not-found.filter";

@Controller('schedules')
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseFilters(new NotFoundExceptionFilter())
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    /**
     * POST /schedules
     * 
     * @param postScheduleRequest Required parameters to create a new schedule
     * @returns The created schedule
     */
    @Post()
    async create(@Body() postScheduleRequest: PostScheduleRequest): Promise<Schedule> {
        console.log(`POST schedule ${JSON.stringify(postScheduleRequest)}`);
        return this.schedulesService.create(postScheduleRequest);
    }

    /**
     * GET /schedules/<id>
     * 
     * @param id The UUID of the schedule to retrieve
     * @returns The schedule corresponding to the given UUID
     */
    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Schedule> {
        console.log(`GET schedule by id ${id}`);
        return this.schedulesService.findById(id);
    }

    /**
     * GET /schedules?param=<id>
     * 
     * @param account_id An integer representing an account ID
     * @returns All schedules that belong to the given account
     */
    @Get() // TODO accept agent_id query parameter
    async findByQuery(@Query('account', ParseIntPipe) account_id: number): Promise<GetSchedulesResponse> {
        console.log(`GET schedules by account ${account_id}`);
        const schedules = await this.schedulesService.findByAccount(account_id);
        return { data: schedules };
    }

    /**
     * PUT /schedules/<id>
     * 
     * @param id The UUID of the schedule to update
     * @param putScheduleRequest Fields of the schedule that should be updated
     * @returns The updated schedule
     */
    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() putScheduleRequest: PutScheduleRequest
    ): Promise<Schedule> {
        console.log(`PUT schedule ${id} ${JSON.stringify(putScheduleRequest)}`);
        return this.schedulesService.update(id, putScheduleRequest);
    }

    /**
     * DELETE /schedules/<id>
     * 
     * @param id The UUID of the schedule to delete
     */
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        console.log(`DELETE schedule by id ${id}`);
        await this.schedulesService.remove(id);
    }
}