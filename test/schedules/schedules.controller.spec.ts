import { NotFoundException } from "@nestjs/common";
import { SchedulesController } from "./../../src/schedules/schedules.controller"
import { SchedulesService } from "./../../src/schedules/schedules.service";

describe('SchedulesController', () => {
    let schedulesController: SchedulesController;
    let schedulesService: SchedulesService;

    beforeEach(() => {
        schedulesService = new SchedulesService();
        schedulesController = new SchedulesController(schedulesService);
    });

    const testId = "testId";
    const testSchedule = {
        id: testId,
        account_id: 123,
        agent_id: 456,
        start_time: new Date(),
        end_time: new Date()
    }

    describe('create', () => {
        it("should create a new schedule", async () =>{
            const input = {
                account_id: 123,
                agent_id: 456,
                start_time: "2025-05-01",
                end_time: "2025-06-01"
            }
            const spy = jest.spyOn(schedulesService, 'create').mockReturnValueOnce(testSchedule);
            const result = await schedulesController.create(input);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(input);
            expect(result).toEqual(testSchedule);
        });
    });

    describe('findById', () => {
        it("should find a schedule by ID", async () => {
            const spy = jest.spyOn(schedulesService, 'findById').mockReturnValueOnce(testSchedule);
            const result = await schedulesController.findById(testId);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId);
            expect(result).toEqual(testSchedule);
        });

        it("should throw an exception if the schedule is not found", async () => {
            const spy = jest.spyOn(schedulesService, 'findById');
            const promise = schedulesController.findById(testId);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId);
            expect(promise).rejects.toThrow(NotFoundException);
        });
    });

    describe('findByQuery', () => {
        it("should find all schedules for an account", async () => {
            const accountId = 123;
            const spy = jest.spyOn(schedulesService, 'findByAccount').mockReturnValueOnce([testSchedule]);
            const result = await schedulesController.findByQuery(accountId);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith(accountId);
            expect(result).toEqual({ data: [testSchedule] });
        });
    });

    describe('update', () => {
        const testPutScheduleRequest = {
            agent_id: 456,
            start_time: "2025-06-01",
            end_time: "2025-07-01"
        }

        it("should update an existing schedule", async () => {
            const spy = jest.spyOn(schedulesService, 'update').mockReturnValueOnce(testSchedule);
            const result = await schedulesController.update(testId, testPutScheduleRequest);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId, testPutScheduleRequest);
            expect(result).toEqual(testSchedule);
        });

        it("should throw an exception if the schedule is not found", async () => {
            const spy = jest.spyOn(schedulesService, 'update');
            const promise = schedulesController.update(testId, testPutScheduleRequest);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId, testPutScheduleRequest);
            expect(promise).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it("should delete a schedule by ID", async () => {
            const spy = jest.spyOn(schedulesService, 'remove');
            await schedulesController.remove(testId);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId);
        });
    });
});