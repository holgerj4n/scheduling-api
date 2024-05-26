import { IsDateString, IsInt } from "class-validator";

export class PutScheduleRequest {
    @IsInt()
    agent_id: number;

    @IsDateString()
    start_time: string;

    @IsDateString()
    end_time: string;
}