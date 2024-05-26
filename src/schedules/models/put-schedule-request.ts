import { PartialType } from "@nestjs/mapped-types";
import { PostScheduleRequest } from "./post-schedule-request";

export class PutScheduleRequest extends PartialType(PostScheduleRequest) {}