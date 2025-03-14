import { BaseExceptionFilter } from "@nestjs/core";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { request } from "http";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";


type TResponse = {
    statusCode: number;
    timestamp: string;
    path: string;
    response: string | object;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const responseObj: TResponse = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: ''
        }
        
        if (exception instanceof HttpException) { // ! HTTP REQUEST ERROR
            responseObj.statusCode = exception.getStatus();
            responseObj.response = exception.getResponse();
        }
        else if ( exception instanceof PrismaClientValidationError) { // ! PRISMA ERROR
            responseObj.statusCode = 422;
            responseObj.response = exception.message.replaceAll(/\n/g, ' '); // remove line breaks
        }
        else { // ! DEFAULT ERROR
            responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            responseObj.response = 'Internal Server Error';
        }

        response
            .status(responseObj.statusCode)
            .json(responseObj);
        this.logger.error(responseObj.response, AllExceptionsFilter.name);
        super.catch(exception, host);
    }   
}