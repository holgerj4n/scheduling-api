import { IsDateString, IsIn, IsInt, IsUUID } from "class-validator";

export class PostTaskRequest {
    @IsUUID()
    schedule_id: string;

    @IsDateString()
    start_time: string;

    @IsInt()
    duration: number;

    @IsIn(['break', 'work'])
    type: string;
}
