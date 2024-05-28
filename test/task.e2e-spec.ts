import { HttpStatus, INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { SchedulesService } from "./../src/schedules/schedules.service";
import { TaskModule } from "./../src/task/task.module";
import { TaskService } from "./../src/task/task.service";
import * as request from 'supertest';

describe('Tasks (e2e)', () => {
    let app: INestApplication;
    let taskId: string;
    let scheduleId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TaskModule]
        }).compile();

        const taskService = moduleFixture.get<TaskService>(TaskService);
        const schedulesService = new SchedulesService(taskService);

        scheduleId = (await schedulesService.create({
            account_id: 101,
            agent_id: 202,
            start_time: "2025-06-01T00:00:00.000Z",
            end_time: "2025-07-01T00:00:00.000Z"
        })).id;
        taskId = (await taskService.create({
            schedule_id: scheduleId,
            start_time: "2025-06-01T00:00:00.000Z",
            duration: 24,
            type: 'work'
        })).id;

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('POST /tasks', async () => {
        const response = await request(app.getHttpServer())
            .post('/tasks')
            .send({
                schedule_id: scheduleId,
                start_time: "2025-06-15T00:00:00.000Z",
                duration: 24,
                type: 'break'
            });

        expect(response.status).toEqual(HttpStatus.CREATED);
        expect(response.body.id).toBeTruthy();
    });

    test('GET /tasks/<id>', async () => {
        const response = await request(app.getHttpServer()).get(`/tasks/${taskId}`);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.id).toEqual(taskId);
    });

    test('GET /tasks?schedule_id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/tasks?schedule_id=${scheduleId}`);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.data).toBeDefined();
        expect(response.body.data[0].schedule_id).toEqual(scheduleId);
    });

    test('PUT /tasks/<id>', async () => {
        const response = await request(app.getHttpServer())
            .put(`/tasks/${taskId}`)
            .send({ duration: 72 });
        
        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.duration).toEqual(72);
    });

    test('DELETE /tasks/<id>', async () => {
        const response = await request(app.getHttpServer()).delete(`/tasks/${taskId}`);

        expect(response.status).toEqual(HttpStatus.OK);
    });
});