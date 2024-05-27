import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";
import { NotFoundError } from "rxjs";

@Catch(NotFoundError, PrismaClientKnownRequestError)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundError | PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        res.status(HttpStatus.NOT_FOUND).send("Not found");
    }
}