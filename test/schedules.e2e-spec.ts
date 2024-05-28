import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SchedulesModule } from './../src/schedules/schedules.module';
import { SchedulesService } from './../src/schedules/schedules.service';

describe('Schedules (e2e)', () => {
    let app: INestApplication;
    let testId: string;
    const testRequest = {
        account_id: 101,
        agent_id: 202,
        start_time: "2025-06-01T00:00:00.000Z",
        end_time: "2025-07-01T00:00:00.000Z"
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [SchedulesModule]
        }).compile();

        const schedulesService = moduleFixture.get<SchedulesService>(SchedulesService);
        const schedule = await schedulesService.create(testRequest);
        testId = schedule.id;

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('POST /schedules', async () => {
        const response = await request(app.getHttpServer())
            .post('/schedules')
            .send(testRequest);

        expect(response.status).toEqual(HttpStatus.CREATED);
        expect(response.body.id).toBeTruthy();
    });

    test('GET /schedules/<id>', async () => {
        const response = await request(app.getHttpServer()).get(`/schedules/${testId}`);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.id).toEqual(testId);
    });

    test('GET /schedules?account_id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/schedules?account_id=${testRequest.account_id}`);
        
        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.data).toBeDefined();
        expect(response.body.data[0].account_id).toEqual(testRequest.account_id);
    });

    test('PUT /schedules/<id>', async () => {
        const response = await request(app.getHttpServer())
            .put(`/schedules/${testId}`)
            .send({ agent_id: 303 });
        
        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.agent_id).toEqual(303);
    });

    test('DELETE /schedules/<id>', async () => {
        const response = await request(app.getHttpServer()).delete(`/schedules/${testId}`);

        expect(response.status).toEqual(HttpStatus.OK);
    });
});
