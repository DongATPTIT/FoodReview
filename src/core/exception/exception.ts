import { HttpException } from '@nestjs/common';

export class GeneralException extends HttpException {
    constructor(message: string, status: number) {
        super(message, status);
    }
}
