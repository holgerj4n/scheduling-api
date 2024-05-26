import { IsDateString, IsInt } from "class-validator";

export class PutScheduleRequest {
    @IsInt()
    agent_id: number; // TODO make optional

    @IsDateString()
    start_time: string; // TODO make optional

    @IsDateString()
    end_time: string; // TODO make optional
}