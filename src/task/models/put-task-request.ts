import { PartialType } from '@nestjs/mapped-types';
import { PostTaskRequest } from './post-task-request';

export class PutTaskRequest extends PartialType(PostTaskRequest) {}
