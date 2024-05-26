import { NotFoundException } from '@nestjs/common';
import { TaskController } from './../../src/task/task.controller';
import { TaskService } from './../../src/task/task.service';

describe('TaskController', () => {
    let taskController: TaskController;
    let taskService: TaskService;

    beforeEach(async () => {
        taskService = new TaskService();
        taskController = new TaskController(taskService);
    });

    const testId = "testId";
    const testTask = {
        id: testId,
        schedule_id: testId,
        start_time: new Date(),
        duration: 24,
        type: "work"
    }

    describe('create', () => {
        it("should create a new task", async () =>{
            const input = {
                schedule_id: testId,
                start_time: "2025-05-01",
                duration: 24,
                type: "work"
            }
            const spy = jest.spyOn(taskService, 'create').mockReturnValueOnce(testTask);
            const result = await taskController.create(input);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(input);
            expect(result).toEqual(testTask);
        });
    });

    describe('findById', () => {
        it("should find a task by ID", async () => {
            const spy = jest.spyOn(taskService, 'findById').mockReturnValueOnce(testTask);
            const result = await taskController.findById(testId);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId);
            expect(result).toEqual(testTask);
        });

        it("should throw an exception if the task is not found", async () => {
            const spy = jest.spyOn(taskService, 'findById');
            const promise = taskController.findById(testId);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId);
            expect(promise).rejects.toThrow(NotFoundException);
        });
    });

    describe('findByQuery', () => {
        it("should find all tasks for a schedule", async () => {
            const spy = jest.spyOn(taskService, 'findBySchedule').mockReturnValueOnce([testTask]);
            const result = await taskController.findByQuery(testId);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenLastCalledWith(testId);
            expect(result).toEqual({ data: [testTask] });
        });
    });

    describe('update', () => {
        const testPutTaskRequest = {
            start_time: "2025-06-01",
            duration: 12
        }

        it("should update an existing task", async () => {
            const spy = jest.spyOn(taskService, 'update').mockReturnValueOnce(testTask);
            const result = await taskController.update(testId, testPutTaskRequest);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId, testPutTaskRequest);
            expect(result).toEqual(testTask);
        });

        it("should throw an exception if the task is not found", async () => {
            const spy = jest.spyOn(taskService, 'update');
            const promise = taskController.update(testId, testPutTaskRequest);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId, testPutTaskRequest);
            expect(promise).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it("should delete a task by ID", async () => {
            const spy = jest.spyOn(taskService, 'remove');
            await taskController.remove(testId);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testId);
        });
    });
});