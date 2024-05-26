import { IsDateString, IsInt } from "class-validator";

export class PostScheduleRequest {
    @IsInt()
    account_id: number;

    @IsInt()
    agent_id: number;

    @IsDateString()
    start_time: string;

    @IsDateString()
    end_time: string;
}