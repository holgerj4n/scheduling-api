import { Body,
    Controller,
    Delete,
    Get, 
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { PostTaskRequest } from './models/post-task-request';
import { PutTaskRequest } from './models/put-task-request';
import { Task } from './models/task';
import { GetTasksResponse } from './models/get-tasks-response';

@Controller('tasks')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    /**
     * POST /tasks
     * 
     * @param postTaskRequest Required parameters to create a new task
     * @returns The created task
     */
    @Post()
    async create(@Body() postTaskRequest: PostTaskRequest): Promise<Task> {
        console.log(`POST task ${postTaskRequest}`);
        return this.taskService.create(postTaskRequest);
    }

    /**
     * GET /tasks/<id>
     * 
     * @param id The UUID of the task to retrieve
     * @returns The task corresponding to the given UUID
     */
    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
        console.log(`GET task by id ${id}`);
        return this.taskService.findById(id);
    }

    /**
     * GET /tasks?param=<id>
     * 
     * @param schedule_id A UUID representing a schedule ID
     * @returns All tasks that belong to the given schedule
     */
    @Get()
    async findByQuery(@Query('schedule', ParseUUIDPipe) schedule_id: string): Promise<GetTasksResponse> {
        console.log(`GET tasks by schedule ${schedule_id}`);
        const tasks = await this.taskService.findBySchedule(schedule_id);
        return { data: tasks };
    }

    /**
     * PUT /tasks/<id>
     * 
     * @param id The UUID of the task to update
     * @param putTaskRequest Fields of the task that should be updated
     * @throws NotFoundException if there is no task with the given UUID
     * @returns The updated task
     */
    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() putTaskRequest: PutTaskRequest
    ): Promise<Task> {
        console.log(`PUT task ${id} ${putTaskRequest}`);
        return this.taskService.update(id, putTaskRequest);
    }

    /**
     * DELETE /tasks/<id>
     * 
     * @param id The UUID of the task to delete
     */
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        console.log(`DELETE task by id ${id}`);
        await this.taskService.remove(id);
    }
}